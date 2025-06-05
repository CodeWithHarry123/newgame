import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "menu" | "difficulty" | "tutorial" | "playing" | "paused" | "gameOver" | "levelComplete" | "info" | "settings" | "leaderboard";

interface GameState {
  // Game state
  gamePhase: GamePhase;
  score: number;
  level: number;
  lives: number;
  speed: number;
  powerUps: string[];
  
  // Game stats
  totalDistance: number;
  coinsCollected: number;
  obstaclesAvoided: number;
  gameStartTime: number;
  
  // Actions
  setGamePhase: (phase: GamePhase) => void;
  updateScore: (score: number) => void;
  updateLevel: (level: number) => void;
  updateLives: (lives: number) => void;
  updateSpeed: (speed: number) => void;
  addPowerUp: (powerUp: string) => void;
  removePowerUp: (powerUp: string) => void;
  resetGame: () => void;
  
  // Stats actions
  updateDistance: (distance: number) => void;
  incrementCoins: () => void;
  incrementObstaclesAvoided: () => void;
}

const initialState = {
  gamePhase: "menu" as GamePhase,
  score: 0,
  level: 1,
  lives: 3,
  speed: 0.1,
  powerUps: [],
  totalDistance: 0,
  coinsCollected: 0,
  obstaclesAvoided: 0,
  gameStartTime: 0,
};

export const useGameState = create<GameState>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,
    
    setGamePhase: (phase) => set({ gamePhase: phase }),
    
    updateScore: (score) => set({ score }),
    
    updateLevel: (level) => set({ level }),
    
    updateLives: (lives) => set({ lives }),
    
    updateSpeed: (speed) => set({ speed }),
    
    addPowerUp: (powerUp) => set((state) => ({
      powerUps: [...state.powerUps, powerUp]
    })),
    
    removePowerUp: (powerUp) => set((state) => ({
      powerUps: state.powerUps.filter(p => p !== powerUp)
    })),
    
    resetGame: () => set({
      ...initialState,
      gamePhase: "playing",
      gameStartTime: Date.now(),
    }),
    
    updateDistance: (distance) => set({ totalDistance: distance }),
    
    incrementCoins: () => set((state) => ({
      coinsCollected: state.coinsCollected + 1
    })),
    
    incrementObstaclesAvoided: () => set((state) => ({
      obstaclesAvoided: state.obstaclesAvoided + 1
    })),
  }))
);
