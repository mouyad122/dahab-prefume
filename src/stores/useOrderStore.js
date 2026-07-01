import { create } from 'zustand';
import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';

export const useOrderStore = create((set, get) => ({
  orders: [],
  isLoading: false,

  fetchOrders: () => {
    set({ isLoading: true });
    const data = OrderRepository.getAll();
    set({ orders: data, isLoading: false });
  },

  createOrder: (orderData) => {
    // 1. Save order
    const saved = OrderRepository.save(orderData);

    // 2. Deduct product stocks
    const products = ProductRepository.getAll();
    orderData.items.forEach(item => {
      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
        ProductRepository.save(prod);
      }
    });

    get().fetchOrders();
    return saved;
  },

  updateOrderStatus: (orderId, status) => {
    const order = OrderRepository.getById(orderId);
    if (order) {
      const oldStatus = order.status;
      order.status = status;
      OrderRepository.save(order);

      // If status changed to cancelled, restore stock once
      if (status === 'cancelled' && oldStatus !== 'cancelled') {
        const products = ProductRepository.getAll();
        order.items.forEach(item => {
          const prod = products.find(p => p.id === item.id);
          if (prod) {
            prod.stock = prod.stock + item.quantity;
            ProductRepository.save(prod);
          }
        });
      }
      // If status changed from cancelled back to active, deduct stock again
      else if (oldStatus === 'cancelled' && status !== 'cancelled') {
        const products = ProductRepository.getAll();
        order.items.forEach(item => {
          const prod = products.find(p => p.id === item.id);
          if (prod) {
            prod.stock = Math.max(0, prod.stock - item.quantity);
            ProductRepository.save(prod);
          }
        });
      }

      get().fetchOrders();
      return true;
    }
    return false;
  }
}));
