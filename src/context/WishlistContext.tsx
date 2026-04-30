import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ApiProduct } from '../types/api';

interface WishlistContextType {
  items: ApiProduct[];
  addItem: (product: ApiProduct) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleItem: (product: ApiProduct) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ApiProduct[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('lotfy-wishlist-v2');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lotfy-wishlist-v2', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (product: ApiProduct) => {
    setItems(prev => prev.find(i => i.id === product.id) ? prev : [...prev, product]);
  };

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  };

  const isInWishlist = (productId: number) => items.some(i => i.id === productId);

  const toggleItem = (product: ApiProduct) => {
    isInWishlist(product.id) ? removeItem(product.id) : addItem(product);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleItem }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be within WishlistProvider');
  return ctx;
}
