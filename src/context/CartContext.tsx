import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ApiProduct } from '../types/api';

export interface CartItem {
  product: ApiProduct;
  quantity: number;
  imageId: number | null;
}

interface CartContextType {
  items: CartItem[];
  // Returns how many units were actually added (stock is shared across image rows).
  addItem: (product: ApiProduct, quantity?: number, imageId?: number | null) => number;
  removeItem: (productId: number, imageId: number | null) => void;
  updateQuantity: (productId: number, imageId: number | null, quantity: number) => void;
  getMaxQuantity: (productId: number, imageId: number | null) => number;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lotfy-cart-v2');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lotfy-cart-v2', JSON.stringify(items));
    }
  }, [items]);

  // A cart row is identified by (product, selected image), matching the API.
  const isRow = (i: CartItem, productId: number, imageId: number | null) =>
    i.product.id === productId && (i.imageId ?? null) === (imageId ?? null);

  // Stock is shared by every image row of the same product.
  const maxQuantityFor = (rows: CartItem[], product: ApiProduct, imageId: number | null) => {
    const usedByOtherRows = rows
      .filter(i => i.product.id === product.id && !isRow(i, product.id, imageId))
      .reduce((sum, i) => sum + i.quantity, 0);
    return Math.max(0, product.stock_quantity - usedByOtherRows);
  };

  const addItem = (product: ApiProduct, quantity = 1, imageId: number | null = null) => {
    const existing = items.find(i => isRow(i, product.id, imageId));
    const current = existing?.quantity ?? 0;
    const next = Math.min(current + quantity, maxQuantityFor(items, product, imageId));
    const added = Math.max(0, next - current);
    if (added === 0) return 0;
    setItems(prev =>
      existing
        ? prev.map(i => (isRow(i, product.id, imageId) ? { ...i, quantity: next } : i))
        : [...prev, { product, quantity: next, imageId }]
    );
    return added;
  };

  const removeItem = (productId: number, imageId: number | null) => {
    setItems(prev => prev.filter(i => !isRow(i, productId, imageId)));
  };

  const updateQuantity = (productId: number, imageId: number | null, quantity: number) => {
    if (quantity <= 0) { removeItem(productId, imageId); return; }
    setItems(prev =>
      prev.map(i =>
        isRow(i, productId, imageId)
          ? { ...i, quantity: Math.min(quantity, maxQuantityFor(prev, i.product, imageId)) }
          : i
      )
    );
  };

  const getMaxQuantity = (productId: number, imageId: number | null) => {
    const row = items.find(i => i.product.id === productId);
    return row ? maxQuantityFor(items, row.product, imageId) : 0;
  };

  const clearCart = () => setItems([]);

  const getItemCount = () => items.reduce((sum, i) => sum + i.quantity, 0);

  const getTotal = () =>
    items.reduce((sum, i) => sum + parseFloat(i.product.price) * i.quantity, 0);

  const isInCart = (productId: number) => items.some(i => i.product.id === productId);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, getMaxQuantity, clearCart, getItemCount, getTotal, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be within CartProvider');
  return ctx;
}
