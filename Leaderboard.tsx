import { useGameState } from "../lib/stores/useGameState";
import { useLeaderboard } from "../lib/stores/useLeaderboard";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Leaderboard() {
  const { setGamePhase } = useGameState();
  const { scores, addScore } = useLeaderboard();

  const handleBack = () => {
    setGamePhase('menu');
  };

  // Sort scores by different criteria
  const sortedByScore = [...scores].sort((a, b) => b.score - a.score);
  const sortedByLevel = [...scores].sort((a, b) => b.level - a.level);
  const sortedByTime = [...scores].sort((a, b) => b.survivalTime - a.survivalTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const ScoreTable = ({ scores, sortBy }: { scores: any[], sortBy: string }) => (
    <div className="space-y-2">
      {scores.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-4">🚀</div>
          <p>No scores yet. Start playing to see your results here!</p>
        </div>
      ) : (
        scores.slice(0, 10).map((score, index) => (
          <div
            key={score.id}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              index < 3 
                ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30' 
                : 'bg-gray-800/50 border-gray-600/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl w-12 text-center">
                {getRankIcon(index + 1)}
              </span>
              <div>
                <div className="font-bold text-white">{score.playerName}</div>
                <div className="text-sm text-gray-400">
                  {new Date(score.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-purple-400">
                {sortBy === 'score' ? score.score.toLocaleString() : 
                 sortBy === 'level' ? `Level ${score.level}` :
                 formatTime(score.survivalTime)}
              </div>
              <div className="text-sm text-gray-400">
                {sortBy !== 'score' && `${score.score.toLocaleString()} pts`}
                {sortBy !== 'level' && ` • Level ${score.level}`}
                {sortBy !== 'time' && ` • ${formatTime(score.survivalTime)}`}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-y-auto">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-300">
            Hall of Fame - Legendary Cosmic Runners
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-yellow-400">
                {Math.max(...scores.map(s => s.score), 0).toLocaleString()}
              </div>
              <div className="text-gray-300">Highest Score</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-400">
                {Math.max(...scores.map(s => s.level), 0)}
              </div>
              <div className="text-gray-300">Highest Level</div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30 text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-400">
                {formatTime(Math.max(...scores.map(s => s.survivalTime), 0))}
              </div>
              <div className="text-gray-300">Longest Survival</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              🏆 Hall of Fame
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="score" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-black/50 backdrop-blur-sm">
                <TabsTrigger value="score" className="data-[state=active]:bg-yellow-600">
                  🎯 By Score
                </TabsTrigger>
                <TabsTrigger value="level" className="data-[state=active]:bg-purple-600">
                  📈 By Level
                </TabsTrigger>
                <TabsTrigger value="time" className="data-[state=active]:bg-blue-600">
                  ⏱️ By Time
                </TabsTrigger>
              </TabsList>

              <TabsContent value="score" className="mt-6">
                <ScoreTable scores={sortedByScore} sortBy="score" />
              </TabsContent>

              <TabsContent value="level" className="mt-6">
                <ScoreTable scores={sortedByLevel} sortBy="level" />
              </TabsContent>

              <TabsContent value="time" className="mt-6">
                <ScoreTable scores={sortedByTime} sortBy="time" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Achievement Showcase */}
        <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30 mt-6">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              🏅 Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎖️</span>
                  <span className="font-bold text-yellow-400">Score Master</span>
                </div>
                <p className="text-gray-300 text-sm">Reach 50,000 points in a single run</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🚀</span>
                  <span className="font-bold text-purple-400">Level Explorer</span>
                </div>
                <p className="text-gray-300 text-sm">Complete 10 levels without losing a life</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⏰</span>
                  <span className="font-bold text-blue-400">Endurance Runner</span>
                </div>
                <p className="text-gray-300 text-sm">Survive for 10 minutes in endless mode</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💰</span>
                  <span className="font-bold text-green-400">Collector</span>
                </div>
                <p className="text-gray-300 text-sm">Collect 1000 coins across all runs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 text-lg"
          >
            ← Back to Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
