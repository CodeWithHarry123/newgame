import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface Collectible {
  id: string;
  position: THREE.Vector3;
  type: string;
}

interface PowerUpsProps {
  collectibles: Collectible[];
}

export default function PowerUps({ collectibles }: PowerUpsProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Try to load 3D coin model
  let coinGltf: any = null;
  try {
    coinGltf = useGLTF("/models/coin.glb");
  } catch (error) {
    console.log("Coin 3D model not available, using fallback geometry");
  }

  useFrame((state) => {
    // Animate collectibles
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group) {
          // Enhanced floating animation
          child.position.y += Math.sin(state.clock.elapsedTime * 4 + index) * 0.015;
          // Smooth rotation animation
          child.rotation.y += 0.025;
          // Scale pulsing for power-ups
          if (index % 2 === 1) { // Power-ups
            const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.1;
            child.scale.setScalar(scale);
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {collectibles.map((collectible, index) => (
        <group key={collectible.id} position={collectible.position}>
          {collectible.type === 'coin' ? (
            // Enhanced coin collectible with 3D model
            <group>
              {coinGltf ? (
                <primitive 
                  object={coinGltf.scene.clone()} 
                  scale={[3, 3, 3]}
                  castShadow
                  receiveShadow
                />
              ) : (
                <mesh castShadow receiveShadow>
                  <cylinderGeometry args={[0.35, 0.35, 0.12, 12]} />
                  <meshStandardMaterial
                    color="#FFD700"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="#F59E0B"
                    emissiveIntensity={0.4}
                  />
                </mesh>
              )}
              
              {/* Enhanced coin glow */}
              <pointLight 
                color="#FFD700" 
                intensity={1.5} 
                distance={4}
                decay={2}
              />
              
              {/* Coin value indicator */}
              <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  emissive="#FFFFFF"
                  emissiveIntensity={1}
                  transparent
                  opacity={0.9}
                />
              </mesh>
              
              {/* Sparkle particles around coin */}
              {Array.from({ length: 6 }).map((_, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos((i / 6) * Math.PI * 2) * 0.6,
                    Math.sin((i / 6) * Math.PI * 2) * 0.3,
                    Math.sin((i / 6) * Math.PI * 4) * 0.2
                  ]}
                >
                  <sphereGeometry args={[0.02]} />
                  <meshStandardMaterial
                    color="#FFF"
                    emissive="#FFF"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              ))}
            </group>
          ) : (
            // Enhanced power-up collectible
            <group>
              {/* Main power-up crystal */}
              <mesh castShadow receiveShadow>
                <octahedronGeometry args={[0.5]} />
                <meshStandardMaterial
                  color="#8B5CF6"
                  metalness={0.9}
                  roughness={0.1}
                  emissive="#8B5CF6"
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.95}
                />
              </mesh>
              
              {/* Rotating outer ring */}
              <mesh rotation={[0, 0, Math.PI / 4]}>
                <torusGeometry args={[0.7, 0.05, 8, 16]} />
                <meshStandardMaterial
                  color="#C084FC"
                  emissive="#C084FC"
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.7}
                />
              </mesh>
              
              {/* Inner energy field */}
              <mesh>
                <sphereGeometry args={[0.8, 12, 8]} />
                <meshStandardMaterial
                  color="#8B5CF6"
                  transparent
                  opacity={0.15}
                  emissive="#8B5CF6"
                  emissiveIntensity={0.3}
                />
              </mesh>
              
              {/* Enhanced power-up glow */}
              <pointLight 
                color="#8B5CF6" 
                intensity={2} 
                distance={5}
                decay={2}
              />
              
              {/* Orbiting energy particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <mesh
                  key={i}
                  position={[
                    Math.cos((i / 8) * Math.PI * 2) * 1,
                    Math.sin((i / 8) * Math.PI * 2) * 0.3,
                    Math.sin((i / 8) * Math.PI * 4) * 0.5
                  ]}
                >
                  <sphereGeometry args={[0.04]} />
                  <meshStandardMaterial
                    color="#C084FC"
                    emissive="#C084FC"
                    emissiveIntensity={0.9}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              ))}
              
              {/* Power-up type indicator */}
              <mesh position={[0, 0.8, 0]}>
                <sphereGeometry args={[0.1]} />
                <meshStandardMaterial
                  color="#FFFFFF"
                  emissive="#FFFFFF"
                  emissiveIntensity={1}
                  transparent
                  opacity={0.9}
                />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}
