import { useGameState } from "../lib/stores/useGameState";
import { useSettings } from "../lib/stores/useSettings";
import { useAudio } from "../lib/stores/useAudio";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function Settings() {
  const { setGamePhase } = useGameState();
  const { 
    settings, 
    updateGraphicsQuality, 
    updateDifficulty, 
    updateControlSensitivity,
    toggleFullscreen,
    toggleVsync
  } = useSettings();
  const { isMuted, toggleMute } = useAudio();

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
            Settings
          </h1>
          <p className="text-xl text-gray-300">
            Customize your cosmic experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Audio Settings */}
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                🔊 Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Master Audio</label>
                  <p className="text-gray-400 text-sm">Enable/disable all game sounds</p>
                </div>
                <Switch
                  checked={!isMuted}
                  onCheckedChange={toggleMute}
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Music Volume</label>
                <Slider
                  value={[settings.musicVolume * 100]}
                  onValueChange={(value) => {
                    // Update music volume in settings
                    console.log("Music volume:", value[0]);
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Sound Effects Volume</label>
                <Slider
                  value={[settings.sfxVolume * 100]}
                  onValueChange={(value) => {
                    // Update SFX volume in settings
                    console.log("SFX volume:", value[0]);
                  }}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Graphics Settings */}
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                🎨 Graphics Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-white font-medium">Graphics Quality</label>
                <Select
                  value={settings.graphicsQuality}
                  onValueChange={updateGraphicsQuality}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="low">Low (Better Performance)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="high">High (Better Quality)</SelectItem>
                    <SelectItem value="ultra">Ultra (Best Quality)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Fullscreen</label>
                  <p className="text-gray-400 text-sm">Play in fullscreen mode</p>
                </div>
                <Switch
                  checked={settings.fullscreen}
                  onCheckedChange={toggleFullscreen}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">V-Sync</label>
                  <p className="text-gray-400 text-sm">Reduce screen tearing</p>
                </div>
                <Switch
                  checked={settings.vsync}
                  onCheckedChange={toggleVsync}
                />
              </div>
            </CardContent>
          </Card>

          {/* Gameplay Settings */}
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                🎮 Gameplay Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-white font-medium">Difficulty Level</label>
                <Select
                  value={settings.difficulty}
                  onValueChange={updateDifficulty}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="easy">Easy (More Lives, Slower)</SelectItem>
                    <SelectItem value="normal">Normal (Balanced)</SelectItem>
                    <SelectItem value="hard">Hard (Fewer Lives, Faster)</SelectItem>
                    <SelectItem value="expert">Expert (Maximum Challenge)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Control Sensitivity</label>
                <Slider
                  value={[settings.controlSensitivity * 100]}
                  onValueChange={(value) => updateControlSensitivity(value[0] / 100)}
                  max={200}
                  min={25}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-medium">Show FPS</label>
                  <p className="text-gray-400 text-sm">Display performance metrics</p>
                </div>
                <Switch
                  checked={settings.showFPS}
                  onCheckedChange={(checked) => {
                    // Update FPS display setting
                    console.log("Show FPS:", checked);
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Controls Settings */}
          <Card className="bg-black/70 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                ⌨️ Control Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-purple-400">Key Bindings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Move Forward</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-white">W, ↑</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Move Backward</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-white">S, ↓</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Move Left</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-white">A, ←</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Move Right</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-white">D, →</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Boost</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-white">SPACE</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Brake</span>
                    <code className="bg-gray-700 px-2 py-1 rounded text-white">SHIFT</code>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full border-purple-400 text-purple-300 hover:bg-purple-500/20"
                disabled
              >
                Customize Keys (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            onClick={handleBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-3 text-lg"
          >
            ← Back to Menu
          </Button>
          
          <Button
            variant="outline"
            className="border-gray-400 text-gray-300 hover:bg-gray-500/20 px-8 py-3 text-lg"
            onClick={() => {
              // Reset to defaults
              console.log("Reset to defaults");
            }}
          >
            Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
