import * as THREE from "three";

export interface GameCollision {
  type: 'obstacle' | 'collectible' | 'powerup';
  object: any;
  damage?: number;
  points?: number;
  effect?: string;
}

export interface GameState {
  playerPosition: THREE.Vector3;
  playerBounds: THREE.Box3;
  obstacles: Array<{ id: string; position: THREE.Vector3; bounds: THREE.Box3; type: string }>;
  collectibles: Array<{ id: string; position: THREE.Vector3; bounds: THREE.Box3; type: string }>;
  gameSpeed: number;
  level: number;
}

// Collision detection using AABB (Axis-Aligned Bounding Box)
export function checkCollisions(gameState: GameState): GameCollision[] {
  const collisions: GameCollision[] = [];
  
  // Check obstacle collisions
  gameState.obstacles.forEach(obstacle => {
    if (gameState.playerBounds.intersectsBox(obstacle.bounds)) {
      collisions.push({
        type: 'obstacle',
        object: obstacle,
        damage: obstacle.type === 'asteroid' ? 1 : 1,
      });
    }
  });
  
  // Check collectible collisions
  gameState.collectibles.forEach(collectible => {
    if (gameState.playerBounds.intersectsBox(collectible.bounds)) {
      collisions.push({
        type: collectible.type === 'powerup' ? 'powerup' : 'collectible',
        object: collectible,
        points: collectible.type === 'coin' ? 10 : collectible.type === 'powerup' ? 50 : 0,
        effect: collectible.type === 'powerup' ? 'boost' : undefined,
      });
    }
  });
  
  return collisions;
}

// Update game logic
export function updateGameLogic(deltaTime: number, gameState: GameState) {
  // Update obstacle positions
  gameState.obstacles.forEach(obstacle => {
    obstacle.position.z += gameState.gameSpeed * 60 * deltaTime;
    obstacle.bounds.setFromCenterAndSize(obstacle.position, new THREE.Vector3(2, 2, 2));
  });
  
  // Update collectible positions
  gameState.collectibles.forEach(collectible => {
    collectible.position.z += gameState.gameSpeed * 60 * deltaTime;
    collectible.bounds.setFromCenterAndSize(collectible.position, new THREE.Vector3(1, 1, 1));
  });
  
  // Update player bounds
  gameState.playerBounds.setFromCenterAndSize(gameState.playerPosition, new THREE.Vector3(1, 1, 2));
  
  // Clean up objects that are behind the player
  gameState.obstacles = gameState.obstacles.filter(obstacle => obstacle.position.z < 20);
  gameState.collectibles = gameState.collectibles.filter(collectible => collectible.position.z < 20);
}

// Spawn system
export function shouldSpawnObstacle(lastSpawnTime: number, currentTime: number, level: number): boolean {
  const spawnInterval = Math.max(1.0, 3.0 - (level * 0.2)); // Faster spawning at higher levels
  return (currentTime - lastSpawnTime) > spawnInterval;
}

export function shouldSpawnCollectible(lastSpawnTime: number, currentTime: number, level: number): boolean {
  const spawnInterval = Math.max(2.0, 4.0 - (level * 0.1));
  return (currentTime - lastSpawnTime) > spawnInterval;
}

// Difficulty scaling
export function getDifficultyMultiplier(level: number): number {
  return Math.min(2.0, 1.0 + (level * 0.1));
}

export function getSpawnRate(level: number): number {
  return Math.min(0.5, 0.1 + (level * 0.02));
}

// Power-up effects
export interface PowerUpEffect {
  type: string;
  duration: number;
  multiplier?: number;
  protection?: boolean;
}

export function applyPowerUpEffect(type: string): PowerUpEffect {
  switch (type) {
    case 'speed_boost':
      return { type: 'speed', duration: 5000, multiplier: 1.5 };
    case 'shield':
      return { type: 'protection', duration: 10000, protection: true };
    case 'coin_magnet':
      return { type: 'magnet', duration: 8000, multiplier: 2 };
    case 'slow_time':
      return { type: 'slow', duration: 6000, multiplier: 0.5 };
    default:
      return { type: 'unknown', duration: 0 };
  }
}

// Scoring system
export function calculateScore(baseScore: number, level: number, multiplier: number = 1): number {
  const levelBonus = level * 10;
  const finalScore = (baseScore + levelBonus) * multiplier;
  return Math.floor(finalScore);
}

// Level progression
export function shouldProgressLevel(distanceTraveled: number, currentLevel: number): boolean {
  const distanceThreshold = currentLevel * 1000; // 1000 units per level
  return distanceTraveled >= distanceThreshold;
}

// Generate random positions for spawning
export function getRandomSpawnPosition(type: 'obstacle' | 'collectible'): THREE.Vector3 {
  const x = (Math.random() - 0.5) * (type === 'obstacle' ? 15 : 12);
  const y = Math.random() * (type === 'obstacle' ? 4 : 3);
  const z = -50 - Math.random() * 10;
  
  return new THREE.Vector3(x, y, z);
}

// Boundary checks
export function clampPlayerPosition(position: THREE.Vector3, bounds: { x: number; y: number }): THREE.Vector3 {
  const clampedPosition = position.clone();
  clampedPosition.x = Math.max(-bounds.x, Math.min(bounds.x, clampedPosition.x));
  clampedPosition.y = Math.max(-2, Math.min(bounds.y, clampedPosition.y));
  return clampedPosition;
}
