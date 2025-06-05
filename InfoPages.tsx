import { useState } from "react";
import { useGameState } from "../lib/stores/useGameState";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function InfoPages() {
  const { setGamePhase } = useGameState();

  const handleBack = () => {
    setGamePhase('menu');
  };

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
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Game Guide
          </h1>
          <p className="text-xl text-gray-300">
            Master the cosmos with these professional tips
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="howto" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-sm">
            <TabsTrigger value="howto" className="data-[state=active]:bg-purple-600">
              🎮 How to Play
            </TabsTrigger>
            <TabsTrigger value="controls" className="data-[state=active]:bg-purple-600">
              ⌨️ Controls
            </TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-purple-600">
              🧠 Strategy
            </TabsTrigger>
            <TabsTrigger value="story" className="data-[state=active]:bg-purple-600">
              📖 Story
            </TabsTrigger>
          </TabsList>

          {/* How to Play */}
          <TabsContent value="howto" className="mt-6">
            <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  🎮 How to Play Cosmic Runner
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Objective</h3>
                    <ul className="space-y-2">
                      <li>• Navigate through asteroid fields</li>
                      <li>• Collect coins and power-ups</li>
                      <li>• Avoid obstacles and debris</li>
                      <li>• Survive as long as possible</li>
                      <li>• Progress through multiple levels</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-3">Scoring System</h3>
                    <ul className="space-y-2">
                      <li>• Coins: +10 points</li>
                      <li>• Power-ups: +50 points</li>
                      <li>• Level completion: +500 points</li>
                      <li>• Survival bonus: +1 point per second</li>
                      <li>• Combo multipliers for consecutive collections</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4 mt-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Pro Tips</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li>• Use boost sparingly - it drains quickly</li>
                      <li>• Brake before tight corners</li>
                      <li>• Collect power-ups for temporary advantages</li>
                    </ul>
                    <ul className="space-y-2">
                      <li>• Plan your route ahead of obstacles</li>
                      <li>• Higher levels = better rewards</li>
                      <li>• Practice makes perfect!</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Controls */}
          <TabsContent value="controls" className="mt-6">
            <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  ⌨️ Control Scheme
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-4">Movement Controls</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Move Forward</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">W ↑</code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Move Backward</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">S ↓</code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Move Left</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">A ←</code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Move Right</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">D →</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Action Controls</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Boost</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">SPACE</code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Brake</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">SHIFT</code>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded">
                        <span>Pause</span>
                        <code className="bg-gray-700 px-2 py-1 rounded">ESC P</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-900/30 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Control Tips</h3>
                  <ul className="space-y-2">
                    <li>• Hold keys for continuous movement</li>
                    <li>• Combine directional keys for diagonal movement</li>
                    <li>• Boost consumes energy - use strategically</li>
                    <li>• Brake helps with precise maneuvering</li>
                    <li>• All controls are customizable in settings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Strategy */}
          <TabsContent value="strategy" className="mt-6">
            <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  🧠 Advanced Strategy Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/30 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-green-400 mb-3">Beginner Strategies</h3>
                    <ul className="space-y-2">
                      <li>• Focus on survival over score</li>
                      <li>• Learn obstacle patterns</li>
                      <li>• Practice smooth movements</li>
                      <li>• Don't rush - patience is key</li>
                      <li>• Collect coins consistently</li>
                    </ul>
                  </div>

                  <div className="bg-orange-900/30 rounded-lg p-4">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">Advanced Techniques</h3>
                    <ul className="space-y-2">
                      <li>• Master boost timing</li>
                      <li>• Use brake for tight corners</li>
                      <li>• Memorize level layouts</li>
                      <li>• Chain power-up collections</li>
                      <li>• Optimize scoring routes</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-900/30 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Power-Up Strategy</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-bold text-yellow-400">⚡ Speed Boost</h4>
                      <p className="text-sm">Temporary speed increase. Use in open areas.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-400">🛡️ Shield</h4>
                      <p className="text-sm">Protects from one collision. Invaluable for risky maneuvers.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-400">💰 Coin Magnet</h4>
                      <p className="text-sm">Attracts nearby coins. Maximize collection efficiency.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-900/30 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-red-400 mb-3">Level-Specific Tips</h3>
                  <div className="space-y-3">
                    <div>
                      <strong>Level 1-2:</strong> Focus on learning controls and basic patterns
                    </div>
                    <div>
                      <strong>Level 3-5:</strong> Asteroid fields require precise navigation
                    </div>
                    <div>
                      <strong>Level 6+:</strong> Debris fields with multiple obstacle types
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Story */}
          <TabsContent value="story" className="mt-6">
            <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  📖 The Cosmic Runner Saga
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6">
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-bold text-cyan-400">The Beginning</h3>
                  <p>
                    In the year 2387, humanity has spread across the galaxy, establishing trade routes 
                    through the most dangerous regions of space. You are a Cosmic Runner - an elite pilot 
                    who navigates treacherous asteroid fields and debris zones to deliver vital supplies 
                    to remote colonies.
                  </p>

                  <h3 className="text-xl font-bold text-cyan-400">The Mission</h3>
                  <p>
                    The Galactic Trade Federation has assigned you to traverse the Nebula Passage, 
                    a newly discovered route through a collapsed star system. Ancient cosmic phenomena 
                    have created a maze of asteroids, space debris, and energy fields that challenge 
                    even the most skilled pilots.
                  </p>

                  <h3 className="text-xl font-bold text-cyan-400">The Challenge</h3>
                  <p>
                    Each sector of the Nebula Passage presents unique dangers. From the ice asteroid 
                    fields of Sector Alpha to the metal debris clouds of the old mining stations, 
                    every level tests your piloting skills and reflexes.
                  </p>

                  <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-3">Your Ship: The Stellar Phoenix</h3>
                    <p>
                      Equipped with advanced maneuvering thrusters, emergency boost systems, and 
                      energy shields, the Stellar Phoenix is humanity's finest courier vessel. 
                      Its sleek design and powerful engines make it perfect for high-speed navigation 
                      through dangerous space.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-cyan-400">The Legend</h3>
                  <p>
                    Only the greatest pilots become legendary Cosmic Runners, their names spoken with 
                    reverence across the galaxy. Will you join their ranks, or become another casualty 
                    of the endless void?
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
