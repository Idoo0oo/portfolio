import { create } from 'zustand'

interface AppState {
  isLoading: boolean;
  isDevMode: boolean;
  setLoading: (loading: boolean) => void;
  toggleDevMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true, // Dimulai dengan loading screen
  isDevMode: false,
  setLoading: (loading) => set({ isLoading: loading }),
  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
}))