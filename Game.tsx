import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useGameState } from "../lib/stores/useGameState";
import { useSettings } from "../lib/stores/useSettings";
import { useAudio } from "../lib/stores/useAudio";
import Player from "./Player";
import Environment from "./Environment";
import Obstacles from "./Obstacles";
import PowerUps from "./PowerUps";
import ParticleEffects from "./ParticleEffects";
import { checkCollisions, updateGameLogic } from "../lib/gameLogic";

enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  boost = 'boost',
  brake = 'brake',
  pause = 'pause',
}

export default function Game() {
  const { 
    gamePhase, 
    score, 
    level, 
    lives, 
    speed,
    updateScore, 
    updateLevel, 
    updateLives,
    updateSpeed,
    setGamePhase,
    addPowerUp,
    powerUps 
  } = useGameState();
  
  const { settings } = useSettings();
  const { playHit, playSuccess } = useAudio();
  const [subscribe, get] = useKeyboardControls<Controls>();
  
  // Get difficulty multipliers
  const getDifficultySettings = () => {
    switch (settings.difficulty) {
      case 'easy':
        return { 
          lives: 5, 
          speedMultiplier: 0.7, 
          spawnRateMultiplier: 0.6, 
          scoreMultiplier: 0.8,
          collisionTolerance: 1.3
        };
      case 'normal':
        return { 
          lives: 3, 
          speedMultiplier: 1.0, 
          spawnRateMultiplier: 1.0, 
          scoreMultiplier: 1.0,
          collisionTolerance: 1.0
        };
      case 'hard':
        return { 
          lives: 2, 
          speedMultiplier: 1.3, 
          spawnRateMultiplier: 1.4, 
          scoreMultiplier: 1.5,
          collisionTolerance: 0.8
        };
      case 'expert':
        return { 
          lives: 1, 
          speedMultiplier: 1.6, 
          spawnRateMultiplier: 1.8, 
          scoreMultiplier: 2.0,
          collisionTolerance: 0.7
        };
      default:
        return { 
          lives: 3, 
          speedMultiplier: 1.0, 
          spawnRateMultiplier: 1.0, 
          scoreMultiplier: 1.0,
          collisionTolerance: 1.0
        };
    }
  };
  
  const difficultySettings = getDifficultySettings();
  
  // Game state
  const [playerPosition, setPlayerPosition] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const [obstacles, setObstacles] = useState<Array<{ id: string; position: THREE.Vector3; type: string }>>([]);
  const [collectibles, setCollectibles] = useState<Array<{ id: string; position: THREE.Vector3; type: string }>>([]);
  const [particles, setParticles] = useState<Array<{ id: string; position: THREE.Vector3; velocity: THREE.Vector3; life: number }>>([]);
  
  const gameStateRef = useRef({
    lastObstacleSpawn: 0,
    lastCollectibleSpawn: 0,
    gameSpeed: 0.1,
    distanceTraveled: 0,
  });

  // Pause game on escape
  useEffect(() => {
    const unsubscribe = subscribe(
      (state) => state.pause,
      (value) => {
        if (value && gamePhase === 'playing') {
          setGamePhase('paused');
        } else if (value && gamePhase === 'paused') {
          setGamePhase('playing');
        }
      }
    );
    return unsubscribe;
  }, [subscribe, gamePhase, setGamePhase]);

  // Main game loop
  useFrame((state, delta) => {
    if (gamePhase !== 'playing') return;

    const controls = get();
    const gameState = gameStateRef.current;
    
    // Update player movement
    const playerVelocity = new THREE.Vector3();
    
    if (controls.forward) playerVelocity.z -= 1;
    if (controls.backward) playerVelocity.z += 0.5;
    if (controls.left) playerVelocity.x -= 1;
    if (controls.right) playerVelocity.x += 1;
    
    // Apply boost
    const speedMultiplier = controls.boost ? 2 : 1;
    const currentSpeed = controls.brake ? gameState.gameSpeed * 0.3 : gameState.gameSpeed * speedMultiplier;
    
    playerVelocity.normalize().multiplyScalar(currentSpeed * 60 * delta);
    
    // Update player position with boundary checks
    const newPlayerPos = playerPosition.clone().add(playerVelocity);
    newPlayerPos.x = Math.max(-8, Math.min(8, newPlayerPos.x)); // Side boundaries
    newPlayerPos.y = Math.max(-2, Math.min(4, newPlayerPos.y)); // Vertical boundaries
    setPlayerPosition(newPlayerPos);

    // Update game speed based on level
    gameState.gameSpeed = Math.min(0.5, 0.1 + (level * 0.05));
    updateSpeed(gameState.gameSpeed);
    
    // Track distance traveled
    gameState.distanceTraveled += gameState.gameSpeed * 60 * delta;
    
    // Spawn obstacles with difficulty adjustment
    const obstacleSpawnRate = (2.5 - level * 0.1) / difficultySettings.spawnRateMultiplier;
    if (state.clock.elapsedTime - gameState.lastObstacleSpawn > obstacleSpawnRate) {
      const newObstacle = {
        id: `obstacle-${Date.now()}-${Math.random()}`,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          Math.random() * 3,
          -50
        ),
        type: Math.random() > 0.7 ? 'asteroid' : 'debris'
      };
      setObstacles(prev => [...prev, newObstacle]);
      gameState.lastObstacleSpawn = state.clock.elapsedTime;
    }
    
    // Spawn collectibles with difficulty adjustment
    const collectibleSpawnRate = (3.5 - level * 0.1) / difficultySettings.spawnRateMultiplier;
    if (state.clock.elapsedTime - gameState.lastCollectibleSpawn > collectibleSpawnRate) {
      const newCollectible = {
        id: `collectible-${Date.now()}-${Math.random()}`,
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          Math.random() * 2 + 0.5,
          -45
        ),
        type: Math.random() > 0.8 ? 'powerup' : 'coin'
      };
      setCollectibles(prev => [...prev, newCollectible]);
      gameState.lastCollectibleSpawn = state.clock.elapsedTime;
    }
    
    // Update obstacles
    setObstacles(prev => prev.map(obstacle => ({
      ...obstacle,
      position: obstacle.position.clone().add(new THREE.Vector3(0, 0, gameState.gameSpeed * 60 * delta))
    })).filter(obstacle => obstacle.position.z < 20));
    
    // Update collectibles
    setCollectibles(prev => prev.map(collectible => ({
      ...collectible,
      position: collectible.position.clone().add(new THREE.Vector3(0, 0, gameState.gameSpeed * 60 * delta))
    })).filter(collectible => collectible.position.z < 20));
    
    // Check collisions with difficulty-based tolerance
    const playerBoundingBox = new THREE.Box3().setFromCenterAndSize(
      playerPosition,
      new THREE.Vector3(1 * difficultySettings.collisionTolerance, 1 * difficultySettings.collisionTolerance, 2)
    );
    
    // Obstacle collisions
    obstacles.forEach(obstacle => {
      const obstacleSize = obstacle.type === 'asteroid' ? 2.2 : 1.5;
      const obstacleBoundingBox = new THREE.Box3().setFromCenterAndSize(
        obstacle.position,
        new THREE.Vector3(obstacleSize, obstacleSize, obstacleSize)
      );
      
      if (playerBoundingBox.intersectsBox(obstacleBoundingBox)) {
        playHit();
        updateLives(lives - 1);
        setObstacles(prev => prev.filter(o => o.id !== obstacle.id));
        
        // Add enhanced explosion particles
        for (let i = 0; i < 15; i++) {
          const particle = {
            id: `particle-${Date.now()}-${i}`,
            position: obstacle.position.clone(),
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 12
            ),
            life: 1.5
          };
          setParticles(prev => [...prev, particle]);
        }
        
        if (lives <= 1) {
          setGamePhase('gameOver');
        }
      }
    });
    
    // Collectible collisions
    collectibles.forEach(collectible => {
      const collectibleBoundingBox = new THREE.Box3().setFromCenterAndSize(
        collectible.position,
        new THREE.Vector3(1, 1, 1)
      );
      
      if (playerBoundingBox.intersectsBox(collectibleBoundingBox)) {
        playSuccess();
        
        if (collectible.type === 'coin') {
          const coinScore = Math.floor(10 * difficultySettings.scoreMultiplier);
          updateScore(score + coinScore);
        } else if (collectible.type === 'powerup') {
          addPowerUp(collectible.type);
          const powerupScore = Math.floor(50 * difficultySettings.scoreMultiplier);
          updateScore(score + powerupScore);
        }
        
        setCollectibles(prev => prev.filter(c => c.id !== collectible.id));
        
        // Add collection particles
        for (let i = 0; i < 8; i++) {
          const particle = {
            id: `collect-particle-${Date.now()}-${i}`,
            position: collectible.position.clone(),
            velocity: new THREE.Vector3(
              (Math.random() - 0.5) * 8,
              Math.random() * 8,
              (Math.random() - 0.5) * 8
            ),
            life: 1.2
          };
          setParticles(prev => [...prev, particle]);
        }
      }
    });
    
    // Update particles
    setParticles(prev => prev.map(particle => ({
      ...particle,
      position: particle.position.clone().add(particle.velocity.clone().multiplyScalar(delta)),
      life: particle.life - delta
    })).filter(particle => particle.life > 0));
    
    // Level progression
    if (gameState.distanceTraveled > level * 1000) {
      updateLevel(level + 1);
      setGamePhase('levelComplete');
      playSuccess();
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#8B5CF6" />
      
      {/* Game Objects */}
      <Player position={playerPosition} />
      <Environment level={level} />
      <Obstacles obstacles={obstacles} />
      <PowerUps collectibles={collectibles} />
      <ParticleEffects particles={particles} />
    </>
  );
}
