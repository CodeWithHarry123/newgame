import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Settings {
  // Audio settings
  musicVolume: number;
  sfxVolume: number;
  
  // Graphics settings
  graphicsQuality: "low" | "medium" | "high" | "ultra";
  fullscreen: boolean;
  vsync: boolean;
  showFPS: boolean;
  
  // Gameplay settings
  difficulty: "easy" | "normal" | "hard" | "expert";
  controlSensitivity: number;
  
  // UI settings
  showHints: boolean;
  showMinimap: boolean;
}

interface SettingsState {
  settings: Settings;
  updateMusicVolume: (volume: number) => void;
  updateSfxVolume: (volume: number) => void;
  updateGraphicsQuality: (quality: Settings["graphicsQuality"]) => void;
  updateDifficulty: (difficulty: Settings["difficulty"]) => void;
  updateControlSensitivity: (sensitivity: number) => void;
  toggleFullscreen: () => void;
  toggleVsync: () => void;
  toggleShowFPS: () => void;
  toggleShowHints: () => void;
  toggleShowMinimap: () => void;
  resetToDefaults: () => void;
}

const defaultSettings: Settings = {
  musicVolume: 0.7,
  sfxVolume: 0.8,
  graphicsQuality: "high",
  fullscreen: false,
  vsync: true,
  showFPS: false,
  difficulty: "normal",
  controlSensitivity: 1.0,
  showHints: true,
  showMinimap: true,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      
      updateMusicVolume: (volume) => set((state) => ({
        settings: { ...state.settings, musicVolume: volume }
      })),
      
      updateSfxVolume: (volume) => set((state) => ({
        settings: { ...state.settings, sfxVolume: volume }
      })),
      
      updateGraphicsQuality: (quality) => set((state) => ({
        settings: { ...state.settings, graphicsQuality: quality }
      })),
      
      updateDifficulty: (difficulty) => set((state) => ({
        settings: { ...state.settings, difficulty }
      })),
      
      updateControlSensitivity: (sensitivity) => set((state) => ({
        settings: { ...state.settings, controlSensitivity: sensitivity }
      })),
      
      toggleFullscreen: () => set((state) => ({
        settings: { ...state.settings, fullscreen: !state.settings.fullscreen }
      })),
      
      toggleVsync: () => set((state) => ({
        settings: { ...state.settings, vsync: !state.settings.vsync }
      })),
      
      toggleShowFPS: () => set((state) => ({
        settings: { ...state.settings, showFPS: !state.settings.showFPS }
      })),
      
      toggleShowHints: () => set((state) => ({
        settings: { ...state.settings, showHints: !state.settings.showHints }
      })),
      
      toggleShowMinimap: () => set((state) => ({
        settings: { ...state.settings, showMinimap: !state.settings.showMinimap }
      })),
      
      resetToDefaults: () => set({ settings: defaultSettings }),
    }),
    {
      name: "cosmic-runner-settings",
    }
  )
);
