/**
 * ====================================================================
 * LEGACY MOCK DATA ONLY.
 * Do not use as the product source of truth.
 * Official product source is the database through ProductDbService and /api/products routes.
 * Frontend must use docs/backend-product-contract.md and /api/products endpoints.
 * ====================================================================
 */

import { StorageService } from '../services/StorageService';
import { initialProducts } from '../data/initialProducts';

const PRODUCTS_KEY = 'dahab_products';

export class ProductRepository {
  static getAll() {
    let data = StorageService.get(PRODUCTS_KEY);
    if (!data || data.length === 0) {
      StorageService.set(PRODUCTS_KEY, initialProducts);
      data = initialProducts;
    }
    return data.filter(p => !p.archived);
  }

  static getById(id) {
    return this.getAll().find(p => p.id === id);
  }

  static getBySlug(slug) {
    return this.getAll().find(p => p.slug === slug);
  }

  static save(product) {
    const list = StorageService.get(PRODUCTS_KEY) || [];
    const index = list.findIndex(p => p.id === product.id);
    const timeNow = new Date().toISOString();

    let savedProduct;
    if (index > -1) {
      savedProduct = { ...list[index], ...product, updatedAt: timeNow };
      list[index] = savedProduct;
    } else {
      savedProduct = {
        ...product,
        id: product.id || crypto.randomUUID(),
        createdAt: timeNow,
        updatedAt: timeNow,
        archived: false,
        hidden: false
      };
      list.push(savedProduct);
    }
    StorageService.set(PRODUCTS_KEY, list);
    return savedProduct;
  }

  static delete(id) {
    const list = StorageService.get(PRODUCTS_KEY) || [];
    const index = list.findIndex(p => p.id === id);
    if (index > -1) {
      list[index].archived = true; // Soft delete
      StorageService.set(PRODUCTS_KEY, list);
      return true;
    }
    return false;
  }

  static restoreDefaults() {
    StorageService.set(PRODUCTS_KEY, initialProducts);
    return initialProducts;
  }
}
