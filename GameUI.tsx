import { useGameState } from "../lib/stores/useGameState";
import { useSettings } from "../lib/stores/useSettings";
import { useAudio } from "../lib/stores/useAudio";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

export default function GameUI() {
  const { 
    gamePhase, 
    score, 
    level, 
    lives, 
    speed, 
    powerUps,
    setGamePhase,
    resetGame 
  } = useGameState();
  
  const { isMuted, toggleMute } = useAudio();

  const handlePause = () => {
    if (gamePhase === 'playing') {
      setGamePhase('paused');
    } else if (gamePhase === 'paused') {
      setGamePhase('playing');
    }
  };

  const handleMainMenu = () => {
    setGamePhase('menu');
  };

  const handleRestart = () => {
    resetGame();
    setGamePhase('playing');
  };

  const handleNextLevel = () => {
    setGamePhase('playing');
  };

  // Game Over Screen
  if (gamePhase === 'gameOver') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="bg-red-900/90 border-red-500 max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">💥</div>
            <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
            <p className="text-red-200 mb-4">Your cosmic journey has ended</p>
            
            <div className="bg-black/50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                  <div className="text-sm text-gray-300">Final Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{level}</div>
                  <div className="text-sm text-gray-300">Level Reached</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleRestart}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                🔄 Try Again
              </Button>
              <Button
                onClick={handleMainMenu}
                variant="outline"
                className="w-full border-gray-400 text-gray-300 hover:bg-gray-500/20"
              >
                🏠 Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Level Complete Screen
  if (gamePhase === 'levelComplete') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="bg-green-900/90 border-green-500 max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-2">Level Complete!</h2>
            <p className="text-green-200 mb-4">Excellent piloting skills!</p>
            
            <div className="bg-black/50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{score}</div>
                  <div className="text-sm text-gray-300">Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">{level}</div>
                  <div className="text-sm text-gray-300">Next Level</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleNextLevel}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                🚀 Continue
              </Button>
              <Button
                onClick={handleMainMenu}
                variant="outline"
                className="w-full border-gray-400 text-gray-300 hover:bg-gray-500/20"
              >
                🏠 Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pause Screen
  if (gamePhase === 'paused') {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="bg-blue-900/90 border-blue-500 max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">⏸️</div>
            <h2 className="text-3xl font-bold text-white mb-4">Game Paused</h2>
            
            <div className="space-y-3">
              <Button
                onClick={handlePause}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                ▶️ Resume
              </Button>
              <Button
                onClick={handleMainMenu}
                variant="outline"
                className="w-full border-gray-400 text-gray-300 hover:bg-gray-500/20"
              >
                🏠 Main Menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // In-game HUD
  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
        {/* Left Stats */}
        <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center min-w-[200px]">
              <div>
                <div className="text-2xl font-bold text-yellow-400">{score.toLocaleString()}</div>
                <div className="text-xs text-gray-300">SCORE</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{level}</div>
                <div className="text-xs text-gray-300">LEVEL</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Controls */}
        <div className="flex gap-2">
          <Button
            onClick={toggleMute}
            variant="outline"
            size="sm"
            className="bg-black/70 backdrop-blur-sm border-gray-500/30 text-white hover:bg-gray-500/20"
          >
            {isMuted ? '🔇' : '🔊'}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            size="sm"
            className="bg-black/70 backdrop-blur-sm border-gray-500/30 text-white hover:bg-gray-500/20"
          >
            ⏸️
          </Button>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                {/* Lives */}
                <div className="flex items-center gap-1">
                  <span className="text-red-400 text-sm">❤️</span>
                  <span className="text-white font-bold">{lives}</span>
                </div>
                
                {/* Speed */}
                <div className="flex items-center gap-1">
                  <span className="text-blue-400 text-sm">⚡</span>
                  <span className="text-white font-bold">{Math.round(speed * 100)}%</span>
                </div>
              </div>

              {/* Power-ups */}
              {powerUps.length > 0 && (
                <div className="flex gap-1">
                  {powerUps.map((powerUp, index) => (
                    <div key={index} className="bg-yellow-500/20 rounded px-2 py-1 text-xs text-yellow-300">
                      ⚡ {powerUp}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Health Bar */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-300">HULL INTEGRITY</span>
                <span className="text-xs text-white">{lives}/3</span>
              </div>
              <Progress 
                value={(lives / 3) * 100} 
                className="h-2 bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Center crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 border-2 border-purple-400/50 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
