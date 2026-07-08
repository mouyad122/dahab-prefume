import { create } from 'zustand';
import { StorageService } from '../services/StorageService';

const AUTH_KEY = 'dahab_admin_auth';

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false, // Default to false for SSR
  adminUser: null,
  _hydrated: false,

  hydrateAuth: () => {
    if (get()._hydrated) return;
    const isAuthed = StorageService.get(AUTH_KEY, false);
    set({
      isAuthenticated: isAuthed,
      adminUser: isAuthed ? { username: 'admin' } : null,
      _hydrated: true
    });
  },

  login: (username, password) => {
    void username;
    void password;
    return false;
  },

  logout: () => {
    StorageService.remove(AUTH_KEY);
    set({ isAuthenticated: false, adminUser: null });
  }
}));
