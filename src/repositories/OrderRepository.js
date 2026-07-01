import { StorageService } from '../services/StorageService';

const ORDERS_KEY = 'dahab_orders';

export class OrderRepository {
  static getAll() {
    return StorageService.get(ORDERS_KEY, []);
  }

  static getById(id) {
    return this.getAll().find(o => o.id === id);
  }

  static save(order) {
    const list = this.getAll();
    const index = list.findIndex(o => o.id === order.id);
    const timeNow = new Date().toISOString();

    let savedOrder;
    if (index > -1) {
      savedOrder = { ...list[index], ...order, updatedAt: timeNow };
      list[index] = savedOrder;
    } else {
      const shortId = `DH-${Math.floor(1000 + Math.random() * 9000)}`;
      savedOrder = {
        ...order,
        id: order.id || shortId,
        createdAt: timeNow,
        updatedAt: timeNow
      };
      list.push(savedOrder);
    }
    StorageService.set(ORDERS_KEY, list);
    return savedOrder;
  }
}
