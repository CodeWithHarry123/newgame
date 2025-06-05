import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { KeyboardControls } from "@react-three/drei";
import { useAudio } from "./lib/stores/useAudio";
import { useGameState } from "./lib/stores/useGameState";
import "@fontsource/inter";

// Import game components
import Game from "./components/Game";
import GameMenu from "./components/GameMenu";
import GameUI from "./components/GameUI";
import InfoPages from "./components/InfoPages";
import Settings from "./components/Settings";
import Leaderboard from "./components/Leaderboard";
import Tutorial from "./components/Tutorial";
import DifficultySelector from "./components/DifficultySelector";
import VisualHints from "./components/VisualHints";
import AchievementSystem from "./components/AchievementSystem";
import SoundManager from "./components/SoundManager";

// Define control keys for the game
enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  boost = 'boost',
  brake = 'brake',
  pause = 'pause',
}

const controls = [
  { name: Controls.forward, keys: ["KeyW", "ArrowUp"] },
  { name: Controls.backward, keys: ["KeyS", "ArrowDown"] },
  { name: Controls.left, keys: ["KeyA", "ArrowLeft"] },
  { name: Controls.right, keys: ["KeyD", "ArrowRight"] },
  { name: Controls.boost, keys: ["Space"] },
  { name: Controls.brake, keys: ["ShiftLeft", "ShiftRight"] },
  { name: Controls.pause, keys: ["Escape", "KeyP"] },
];

// Main App component
function App() {
  const { gamePhase } = useGameState();
  const [showCanvas, setShowCanvas] = useState(false);

  // Show the canvas once everything is loaded
  useEffect(() => {
    setShowCanvas(true);
  }, []);

  // Loading screen component
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-bold text-foreground">Loading Cosmic Runner...</h2>
        <p className="text-muted-foreground mt-2">Preparing your space adventure</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-background overflow-hidden">
      {!showCanvas && <LoadingScreen />}
      
      {showCanvas && (
        <KeyboardControls map={controls}>
          {/* Menu Phase */}
          {gamePhase === 'menu' && <GameMenu />}

          {/* Difficulty Selection Phase */}
          {gamePhase === 'difficulty' && <DifficultySelector />}

          {/* Tutorial Phase */}
          {gamePhase === 'tutorial' && <Tutorial />}

          {/* Info Pages Phase */}
          {gamePhase === 'info' && <InfoPages />}

          {/* Settings Phase */}
          {gamePhase === 'settings' && <Settings />}

          {/* Leaderboard Phase */}
          {gamePhase === 'leaderboard' && <Leaderboard />}

          {/* Game Phases */}
          {(gamePhase === 'playing' || gamePhase === 'paused' || gamePhase === 'gameOver' || gamePhase === 'levelComplete') && (
            <>
              <Canvas
                shadows
                camera={{
                  position: [0, 5, 10],
                  fov: 75,
                  near: 0.1,
                  far: 1000
                }}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance",
                  alpha: false,
                }}
                style={{ background: 'linear-gradient(to bottom, #0B1426, #1a0033)' }}
              >
                <Suspense fallback={null}>
                  <Game />
                </Suspense>
              </Canvas>
              <GameUI />
              <VisualHints />
            </>
          )}

          <SoundManager />
          <AchievementSystem />
        </KeyboardControls>
      )}
    </div>
  );
}

export default App;
