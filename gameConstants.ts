// Game constants and configuration
export const GAME_CONFIG = {
  // Player settings
  PLAYER: {
    INITIAL_LIVES: 3,
    MAX_LIVES: 5,
    MOVEMENT_SPEED: 8,
    BOOST_MULTIPLIER: 2,
    BRAKE_MULTIPLIER: 0.3,
    BOUNDS: {
      X: 8,
      Y: 4,
    },
  },
  
  // Game mechanics
  GAME: {
    INITIAL_SPEED: 0.1,
    MAX_SPEED: 0.8,
    SPEED_INCREASE_PER_LEVEL: 0.05,
    LEVEL_DISTANCE_THRESHOLD: 1000,
    COMBO_TIMEOUT: 2000, // 2 seconds
  },
  
  // Scoring
  SCORING: {
    COIN: 10,
    POWERUP: 50,
    LEVEL_COMPLETE: 500,
    SURVIVAL_PER_SECOND: 1,
    OBSTACLE_AVOIDED: 5,
    COMBO_MULTIPLIER: 1.5,
  },
  
  // Spawn rates (in seconds)
  SPAWN: {
    OBSTACLE_BASE_INTERVAL: 3.0,
    OBSTACLE_MIN_INTERVAL: 0.8,
    OBSTACLE_REDUCTION_PER_LEVEL: 0.2,
    
    COLLECTIBLE_BASE_INTERVAL: 4.0,
    COLLECTIBLE_MIN_INTERVAL: 1.5,
    COLLECTIBLE_REDUCTION_PER_LEVEL: 0.1,
  },
  
  // Power-up configurations
  POWERUPS: {
    SPEED_BOOST: {
      duration: 5000,
      multiplier: 1.5,
      color: '#00FF00',
    },
    SHIELD: {
      duration: 10000,
      color: '#0088FF',
    },
    COIN_MAGNET: {
      duration: 8000,
      range: 5,
      color: '#FFD700',
    },
    SLOW_TIME: {
      duration: 6000,
      multiplier: 0.5,
      color: '#FF6600',
    },
  },
  
  // Visual effects
  EFFECTS: {
    PARTICLE_COUNT: 10,
    PARTICLE_LIFE: 1.0,
    EXPLOSION_FORCE: 10,
    GLOW_INTENSITY: 0.5,
  },
  
  // Audio settings
  AUDIO: {
    MASTER_VOLUME: 0.7,
    MUSIC_VOLUME: 0.5,
    SFX_VOLUME: 0.8,
    FADE_DURATION: 1000,
  },
  
  // Difficulty settings
  DIFFICULTY: {
    EASY: {
      lives: 5,
      speedMultiplier: 0.7,
      spawnRateMultiplier: 0.7,
      scoreMultiplier: 0.8,
    },
    NORMAL: {
      lives: 3,
      speedMultiplier: 1.0,
      spawnRateMultiplier: 1.0,
      scoreMultiplier: 1.0,
    },
    HARD: {
      lives: 2,
      speedMultiplier: 1.3,
      spawnRateMultiplier: 1.3,
      scoreMultiplier: 1.5,
    },
    EXPERT: {
      lives: 1,
      speedMultiplier: 1.5,
      spawnRateMultiplier: 1.5,
      scoreMultiplier: 2.0,
    },
  },
  
  // Level themes and configurations
  LEVELS: {
    1: { theme: 'asteroid_field', color: '#1E293B', danger: 'low' },
    2: { theme: 'asteroid_field', color: '#1E293B', danger: 'low' },
    3: { theme: 'debris_zone', color: '#4C1D95', danger: 'medium' },
    4: { theme: 'debris_zone', color: '#4C1D95', danger: 'medium' },
    5: { theme: 'nebula_passage', color: '#991B1B', danger: 'high' },
    6: { theme: 'nebula_passage', color: '#991B1B', danger: 'high' },
    7: { theme: 'crystal_caverns', color: '#166534', danger: 'very_high' },
    8: { theme: 'crystal_caverns', color: '#166534', danger: 'very_high' },
    9: { theme: 'solar_storms', color: '#92400E', danger: 'extreme' },
    10: { theme: 'solar_storms', color: '#92400E', danger: 'extreme' },
  },
  
  // Achievement thresholds
  ACHIEVEMENTS: {
    SCORE_MASTER: 50000,
    LEVEL_EXPLORER: 10,
    ENDURANCE_RUNNER: 600, // 10 minutes
    COLLECTOR: 1000,
    SPEED_DEMON: 100, // 100 boosts used
    UNTOUCHABLE: 5, // 5 levels without damage
  },
};

// Control key mappings
export const CONTROLS = {
  FORWARD: ['KeyW', 'ArrowUp'],
  BACKWARD: ['KeyS', 'ArrowDown'],
  LEFT: ['KeyA', 'ArrowLeft'],
  RIGHT: ['KeyD', 'ArrowRight'],
  BOOST: ['Space'],
  BRAKE: ['ShiftLeft', 'ShiftRight'],
  PAUSE: ['Escape', 'KeyP'],
};

// Color schemes for different game states
export const COLORS = {
  PRIMARY: '#8B5CF6',
  SECONDARY: '#6366F1',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
  
  // Game-specific colors
  PLAYER: '#8B5CF6',
  OBSTACLE: '#6B7280',
  COIN: '#FCD34D',
  POWERUP: '#8B5CF6',
  PARTICLE: '#FF4500',
  BACKGROUND: '#0B1426',
};

// Asset paths
export const ASSETS = {
  SOUNDS: {
    BACKGROUND: '/sounds/background.mp3',
    HIT: '/sounds/hit.mp3',
    SUCCESS: '/sounds/success.mp3',
  },
  TEXTURES: {
    ASPHALT: '/textures/asphalt.png',
    GRASS: '/textures/grass.png',
    SAND: '/textures/sand.jpg',
    SKY: '/textures/sky.png',
    WOOD: '/textures/wood.jpg',
  },
  MODELS: {
    HEART: '/geometries/heart.gltf',
  },
};

// Performance settings
export const PERFORMANCE = {
  MAX_PARTICLES: 100,
  MAX_OBSTACLES: 20,
  MAX_COLLECTIBLES: 15,
  RENDER_DISTANCE: 100,
  LOD_DISTANCES: [10, 25, 50],
  TARGET_FPS: 60,
};

// UI constants
export const UI = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  FADE_DURATION: 500,
  MENU_TRANSITION: 200,
};
