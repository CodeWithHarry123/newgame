import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  level: number;
  survivalTime: number;
  date: number;
  achievements: string[];
}

interface LeaderboardState {
  scores: LeaderboardEntry[];
  addScore: (entry: Omit<LeaderboardEntry, "id" | "date">) => void;
  clearScores: () => void;
  getTopScores: (limit?: number) => LeaderboardEntry[];
  getPersonalBest: (playerName: string) => LeaderboardEntry | null;
}

export const useLeaderboard = create<LeaderboardState>()(
  persist(
    (set, get) => ({
      scores: [],
      
      addScore: (entry) => {
        const newEntry: LeaderboardEntry = {
          ...entry,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: Date.now(),
        };
        
        set((state) => ({
          scores: [...state.scores, newEntry].sort((a, b) => b.score - a.score).slice(0, 100) // Keep top 100
        }));
      },
      
      clearScores: () => set({ scores: [] }),
      
      getTopScores: (limit = 10) => {
        return get().scores.slice(0, limit);
      },
      
      getPersonalBest: (playerName) => {
        const playerScores = get().scores.filter(score => score.playerName === playerName);
        return playerScores.length > 0 ? playerScores[0] : null;
      },
    }),
    {
      name: "cosmic-runner-leaderboard",
    }
  )
);
