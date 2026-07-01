import { create } from 'zustand';
import { ProductRepository } from '../repositories/ProductRepository';

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,

  fetchProducts: () => {
    set({ isLoading: true });
    const data = ProductRepository.getAll();
    set({ products: data, isLoading: false });
  },

  saveProduct: (product) => {
    const saved = ProductRepository.save(product);
    get().fetchProducts();
    return saved;
  },

  deleteProduct: (id) => {
    const deleted = ProductRepository.delete(id);
    get().fetchProducts();
    return deleted;
  },

  restoreDefaults: () => {
    ProductRepository.restoreDefaults();
    get().fetchProducts();
  }
}));
