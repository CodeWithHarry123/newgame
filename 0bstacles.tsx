import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface Obstacle {
  id: string;
  position: THREE.Vector3;
  type: string;
}

interface ObstaclesProps {
  obstacles: Obstacle[];
}

export default function Obstacles({ obstacles }: ObstaclesProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Try to load 3D models
  let asteroidGltf;
  try {
    asteroidGltf = useGLTF("/models/asteroid.glb");
  } catch (error) {
    console.log("Asteroid 3D model not available, using fallback geometry");
  }

  useFrame((state) => {
    // Animate obstacles
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Group || child instanceof THREE.Mesh) {
          // Dynamic rotation based on obstacle type
          child.rotation.x += 0.008 + index * 0.002;
          child.rotation.y += 0.012 + index * 0.003;
          child.rotation.z += 0.004 + index * 0.001;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {obstacles.map((obstacle, index) => (
        <group key={obstacle.id} position={obstacle.position}>
          {obstacle.type === 'asteroid' ? (
            // Enhanced asteroid with 3D model or fallback
            <group>
              {asteroidGltf ? (
                <primitive 
                  object={asteroidGltf.scene.clone()} 
                  scale={[2.2, 2.2, 2.2]}
                  castShadow
                  receiveShadow
                />
              ) : (
                <mesh castShadow receiveShadow>
                  <dodecahedronGeometry args={[1.8]} />
                  <meshStandardMaterial
                    color="#4A5568"
                    roughness={0.95}
                    metalness={0.05}
                    emissive="#2D3748"
                    emissiveIntensity={0.1}
                  />
                </mesh>
              )}
              
              {/* Danger glow */}
              <pointLight 
                color="#DC2626" 
                intensity={0.3} 
                distance={5}
              />
            </group>
          ) : (
            // Enhanced space debris
            <group>
              {/* Main debris body */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.6, 2.2]} />
                <meshStandardMaterial
                  color="#374151"
                  metalness={0.9}
                  roughness={0.2}
                  emissive="#DC2626"
                  emissiveIntensity={0.2}
                />
              </mesh>
              
              {/* Additional debris pieces */}
              <mesh position={[0.3, 0.2, -0.5]} castShadow>
                <boxGeometry args={[0.4, 0.3, 0.8]} />
                <meshStandardMaterial
                  color="#4B5563"
                  metalness={0.7}
                  roughness={0.4}
                />
              </mesh>
              
              <mesh position={[-0.4, -0.1, 0.3]} castShadow>
                <cylinderGeometry args={[0.15, 0.2, 0.6]} />
                <meshStandardMaterial
                  color="#6B7280"
                  metalness={0.8}
                  roughness={0.3}
                />
              </mesh>
              
              {/* Danger sparks */}
              <pointLight 
                color="#FF4500" 
                intensity={0.8} 
                distance={4}
              />
              
              {/* Pulsing warning lights */}
              {Array.from({ length: 2 }).map((_, i) => (
                <mesh key={i} position={[i === 0 ? 0.3 : -0.3, 0.5, 0]}>
                  <sphereGeometry args={[0.12]} />
                  <meshStandardMaterial
                    color="#DC2626"
                    emissive="#DC2626"
                    emissiveIntensity={0.9}
                  />
                </mesh>
              ))}
              
              {/* Additional warning glow */}
              <pointLight 
                color="#EF4444" 
                intensity={1.2} 
                distance={6}
              />
            </group>
          )}
        </group>
      ))}
    </group>
  );
}
