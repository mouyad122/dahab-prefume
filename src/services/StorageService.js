export class StorageService {
  static get(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`StorageService: Error reading key "${key}"`, e);
      return defaultValue;
    }
  }

  static set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`StorageService: Error writing key "${key}"`, e);
      return false;
    }
  }

  static remove(key) {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`StorageService: Error removing key "${key}"`, e);
      return false;
    }
  }
}
