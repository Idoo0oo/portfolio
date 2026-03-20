import { create } from 'zustand';

export type AppId = 'terminal' | 'about' | 'projects' | 'experience' | 'contact' | 'settings' | 'preview';

interface OSState {
  isBooted: boolean;
  isLocked: boolean;
  openApps: AppId[];
  focusedApp: AppId | null;
  minimizedApps: AppId[];
  maximizedApps: AppId[];
  isDarkMode: boolean;
  isSoundEnabled: boolean;
  isLaunchpadOpen: boolean;
  isSpotlightOpen: boolean;
  isWidgetsOpen: boolean;
  
  // Actions
  boot: () => void;
  unlock: () => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  toggleDarkMode: () => void;
  toggleSound: () => void;
  toggleLaunchpad: () => void;
  toggleSpotlight: () => void;
  toggleWidgets: () => void;
}

export const useOSStore = create<OSState>((set) => ({
  isBooted: false,
  isLocked: true,
  openApps: [], // Clean startup
  focusedApp: null,
  minimizedApps: [],
  maximizedApps: [],
  isDarkMode: false, // Default to light mode
  isSoundEnabled: true, // Default to sounds on
  isLaunchpadOpen: false,
  isSpotlightOpen: false,
  isWidgetsOpen: false,

  boot: () => set({ isBooted: true }),
  unlock: () => set({ isLocked: false }),
  
  openApp: (id) => set((state) => {
    if (state.openApps.includes(id)) {
      // If already open, just focus and restore if it was minimized
      return { 
        focusedApp: id,
        minimizedApps: state.minimizedApps.filter(a => a !== id),
        isLaunchpadOpen: false // Close launchpad when opening an app
      };
    }
    return { 
      openApps: [...state.openApps, id],
      focusedApp: id,
      isLaunchpadOpen: false // Close launchpad when opening an app
    };
  }),

  // ... (rest of simple functions)
  closeApp: (id) => set((state) => ({
    openApps: state.openApps.filter((a) => a !== id),
    focusedApp: state.focusedApp === id 
      ? (state.openApps.filter((a) => a !== id).slice(-1)[0] || null)
      : state.focusedApp,
    minimizedApps: state.minimizedApps.filter((a) => a !== id),
    maximizedApps: state.maximizedApps.filter((a) => a !== id)
  })),

  focusApp: (id) => set({ focusedApp: id }),

  minimizeApp: (id) => set((state) => ({
    minimizedApps: [...state.minimizedApps, id],
    maximizedApps: state.maximizedApps.filter(a => a !== id),
    focusedApp: state.focusedApp === id 
      ? (state.openApps.filter(a => a !== id && !state.minimizedApps.includes(a)).slice(-1)[0] || null)
      : state.focusedApp
  })),

  maximizeApp: (id) => set((state) => ({
    minimizedApps: state.minimizedApps.filter(a => a !== id),
    focusedApp: id
  })),

  toggleMaximizeApp: (id) => set((state) => ({
    maximizedApps: state.maximizedApps.includes(id)
      ? state.maximizedApps.filter(a => a !== id)
      : [...state.maximizedApps, id],
    minimizedApps: state.minimizedApps.filter(a => a !== id), // Unminimize if maximizing
    focusedApp: id
  })),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  toggleLaunchpad: () => set((state) => ({ isLaunchpadOpen: !state.isLaunchpadOpen })),
  toggleSpotlight: () => set((state) => ({ isSpotlightOpen: !state.isSpotlightOpen })),
  toggleWidgets: () => set((state) => ({ isWidgetsOpen: !state.isWidgetsOpen }))
}));
