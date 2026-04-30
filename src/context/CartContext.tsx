import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ApiProduct } from '../types/api';

export interface CartItem {
  product: ApiProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: ApiProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
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

  const addItem = (product: ApiProduct, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock_quantity) }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) { removeItem(productId); return; }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId
          ? { ...i, quantity: Math.min(quantity, i.product.stock_quantity) }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const getItemCount = () => items.reduce((sum, i) => sum + i.quantity, 0);

  const getTotal = () =>
    items.reduce((sum, i) => sum + parseFloat(i.product.price) * i.quantity, 0);

  const isInCart = (productId: number) => items.some(i => i.product.id === productId);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getItemCount, getTotal, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be within CartProvider');
  return ctx;
}
