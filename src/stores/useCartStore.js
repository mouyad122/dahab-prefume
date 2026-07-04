import { create } from 'zustand';
import { StorageService } from '../services/StorageService';

const CART_KEY = 'dahab_cart';
const WISHLIST_KEY = 'dahab_wishlist';

function clampCartQuantity(qty, stock) {
  const requested = Math.max(1, parseInt(qty, 10) || 1);
  const maxStock = Number(stock);

  if (Number.isFinite(maxStock) && maxStock > 0) {
    return Math.min(requested, maxStock);
  }

  return requested;
}

export const useCartStore = create((set, get) => ({
  // Initialize as empty arrays — data hydrated on client via useEffect in components
  cartItems: [],
  wishlist: [],
  isCartOpen: false,
  _hydrated: false,

  // Call this once on the client to load persisted data
  hydrate: () => {
    if (get()._hydrated) return;
    set({
      cartItems: StorageService.get(CART_KEY, []),
      wishlist: StorageService.get(WISHLIST_KEY, []),
      _hydrated: true,
    });
  },

  toggleCart: () => set(s => ({ isCartOpen: !s.isCartOpen })),
  setCartOpen: (open) => set({ isCartOpen: open }),

  addToCart: (product, qty = 1) => {
    const items = [...get().cartItems];
    const index = items.findIndex(item => item.id === product.id);

    if (index > -1) {
      items[index].quantity = clampCartQuantity(items[index].quantity + qty, product.stock);
    } else {
      items.push({ ...product, quantity: clampCartQuantity(qty, product.stock) });
    }

    set({ cartItems: items, isCartOpen: true });
    StorageService.set(CART_KEY, items);
  },

  updateQty: (productId, qty, maxStock) => {
    let items = [...get().cartItems];
    const index = items.findIndex(item => item.id === productId);

    if (index > -1) {
      items[index].quantity = clampCartQuantity(qty, maxStock);
      set({ cartItems: items });
      StorageService.set(CART_KEY, items);
    }
  },

  removeFromCart: (productId) => {
    const items = get().cartItems.filter(item => item.id !== productId);
    set({ cartItems: items });
    StorageService.set(CART_KEY, items);
  },

  clearCart: () => {
    set({ cartItems: [] });
    StorageService.remove(CART_KEY);
  },

  // Wishlist
  toggleWishlist: (productId) => {
    let list = [...get().wishlist];
    const index = list.indexOf(productId);

    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(productId);
    }

    set({ wishlist: list });
    StorageService.set(WISHLIST_KEY, list);
  },

  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  }
}));
