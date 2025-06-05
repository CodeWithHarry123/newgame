import { useGameState } from "../lib/stores/useGameState";
import { useSettings } from "../lib/stores/useSettings";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function GameMenu() {
  const { setGamePhase, resetGame } = useGameState();
  const { settings } = useSettings();

  const handleStartGame = () => {
    setGamePhase('difficulty');
  };

  const handleShowInfo = () => {
    setGamePhase('info');
  };

  const handleShowSettings = () => {
    setGamePhase('settings');
  };

  const handleShowLeaderboard = () => {
    setGamePhase('leaderboard');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4 animate-pulse">
            COSMIC RUNNER
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Professional 3D Space Adventure
          </p>
          <p className="text-lg text-gray-400">
            Navigate through asteroid fields, collect power-ups, and survive the cosmic journey
          </p>
        </div>

        {/* Menu Card */}
        <Card className="bg-black/50 backdrop-blur-sm border-purple-500/30 mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Main Menu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleStartGame}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 text-lg transition-all duration-300 transform hover:scale-105"
            >
              🚀 Start Game
            </Button>

            <Button
              onClick={() => setGamePhase('tutorial')}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-2 transition-all duration-300 transform hover:scale-105"
            >
              🎓 Interactive Tutorial
            </Button>
            
            <Button
              onClick={handleShowInfo}
              variant="outline"
              className="w-full border-purple-400 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all duration-300"
            >
              📚 Game Guide
            </Button>
            
            <Button
              onClick={handleShowLeaderboard}
              variant="outline"
              className="w-full border-blue-400 text-blue-300 hover:bg-blue-500/20 hover:text-white transition-all duration-300"
            >
              🏆 Leaderboard
            </Button>
            
            <Button
              onClick={handleShowSettings}
              variant="outline"
              className="w-full border-gray-400 text-gray-300 hover:bg-gray-500/20 hover:text-white transition-all duration-300"
            >
              ⚙️ Settings
            </Button>
          </CardContent>
        </Card>

        {/* Game Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-3">🌌</div>
            <h3 className="text-lg font-bold text-white mb-2">10+ Levels</h3>
            <p className="text-gray-400 text-xs">
              Asteroid fields, nebula passages, and solar storms
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Power-ups</h3>
            <p className="text-gray-400 text-xs">
              Shields, speed boosts, coin magnets, and time control
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-sm rounded-lg p-4 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-lg font-bold text-white mb-2">Achievements</h3>
            <p className="text-gray-400 text-xs">
              Unlock rewards and climb the global leaderboards
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-lg font-bold text-white mb-2">Easy Controls</h3>
            <p className="text-gray-400 text-xs">
              Simple WASD movement with visual tutorials
            </p>
          </div>
        </div>

        {/* Quick Tutorial */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
          <h3 className="text-xl font-bold text-white text-center mb-4">Quick Start Guide</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-bold text-blue-400 mb-2">Movement Controls</h4>
              <div className="space-y-1 text-gray-300">
                <div className="flex items-center gap-2">
                  <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">W</kbd>
                  <span>Move Forward</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">S</kbd>
                  <span>Move Backward</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">A/D</kbd>
                  <span>Move Left/Right</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-green-400 mb-2">Special Actions</h4>
              <div className="space-y-1 text-gray-300">
                <div className="flex items-center gap-2">
                  <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">SPACE</kbd>
                  <span>Boost (Limited Energy)</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">SHIFT</kbd>
                  <span>Brake (Precise Control)</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">ESC</kbd>
                  <span>Pause Game</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-yellow-400 font-medium">Tip: Collect coins for points, avoid red obstacles, grab power-ups for advantages!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
