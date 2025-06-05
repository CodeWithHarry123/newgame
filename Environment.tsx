import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";

interface EnvironmentProps {
  level: number;
}

export default function Environment({ level }: EnvironmentProps) {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Mesh>(null);
  
  // Generate random star field positions
  const starPositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  // Animate environment
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.x += 0.0002;
    }
    
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z += 0.001;
      nebulaRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Level-based environment colors
  const getLevelColor = (level: number) => {
    const colors = [
      "#1E293B", // Dark blue-gray
      "#4C1D95", // Purple
      "#991B1B", // Dark red
      "#166534", // Dark green
      "#92400E", // Orange
    ];
    return colors[Math.min(level - 1, colors.length - 1)] || colors[0];
  };

  return (
    <group>
      {/* Animated star field */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade
        speed={1}
      />
      
      {/* Custom moving stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={starPositions}
            count={starPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          color="#FFFFFF"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      {/* Distant nebula */}
      <mesh ref={nebulaRef} position={[0, 0, -100]}>
        <planeGeometry args={[200, 200]} />
        <meshBasicMaterial
          color={getLevelColor(level)}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Atmospheric lighting based on level */}
      <ambientLight intensity={0.2} color={getLevelColor(level)} />
      
      {/* Directional light for depth */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Level-specific environmental elements */}
      {level > 2 && (
        <group>
          {/* Asteroid belt */}
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={`env-asteroid-${i}`}
              position={[
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                -50 - Math.random() * 100
              ]}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ]}
            >
              <dodecahedronGeometry args={[Math.random() * 2 + 0.5]} />
              <meshStandardMaterial
                color="#4A5568"
                roughness={0.8}
                metalness={0.2}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {level > 4 && (
        <group>
          {/* Distant planets */}
          <mesh position={[-80, 30, -150]}>
            <sphereGeometry args={[15, 32, 32]} />
            <meshStandardMaterial
              color="#DC2626"
              emissive="#7F1D1D"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          <mesh position={[60, -20, -120]}>
            <sphereGeometry args={[8, 32, 32]} />
            <meshStandardMaterial
              color="#2563EB"
              emissive="#1E3A8A"
              emissiveIntensity={0.1}
            />
          </mesh>
        </group>
      )}
      
      {/* Level indicator lights */}
      <group>
        {Array.from({ length: level }).map((_, i) => (
          <pointLight
            key={`level-light-${i}`}
            position={[
              (i - level / 2) * 10,
              5,
              -20
            ]}
            color={getLevelColor(level)}
            intensity={0.3}
            distance={10}
          />
        ))}
      </group>
    </group>
  );
}
