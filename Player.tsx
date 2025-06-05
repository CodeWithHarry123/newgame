import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PlayerProps {
  position: THREE.Vector3;
}

export default function Player({ position }: PlayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Mesh>(null);
  
  // Try to load the 3D model, fallback to basic geometry if not available
  let gltf;
  try {
    gltf = useGLTF("/models/player_ship.glb");
  } catch (error) {
    console.log("3D model not available, using fallback geometry");
  }

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth movement
      groupRef.current.position.lerp(position, 0.15);
      
      // Add banking rotation for movement feel
      groupRef.current.rotation.z = -position.x * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.03;
      
      // Add subtle bobbing motion
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 3) * 0.02;
    }
    
    // Animate exhaust
    if (exhaustRef.current) {
      exhaustRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 12) * 0.3);
      if (exhaustRef.current.material instanceof THREE.Material) {
        (exhaustRef.current.material as any).opacity = 0.7 + Math.sin(state.clock.elapsedTime * 15) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {gltf ? (
        // Use 3D model if available
        <primitive 
          object={gltf.scene.clone()} 
          scale={[2.5, 2.5, 2.5]}
          rotation={[0, Math.PI, 0]}
          castShadow
          receiveShadow
        />
      ) : (
        // Fallback to enhanced geometric ship
        <group>
          {/* Main ship body - more detailed */}
          <mesh castShadow receiveShadow>
            <coneGeometry args={[0.6, 2.5, 8]} />
            <meshStandardMaterial 
              color="#8B5CF6"
              metalness={0.9}
              roughness={0.1}
              emissive="#4C1D95"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Ship wings - enhanced */}
          <mesh position={[-0.8, 0, 0.3]} castShadow>
            <boxGeometry args={[0.5, 0.15, 1.2]} />
            <meshStandardMaterial 
              color="#6366F1" 
              metalness={0.8}
              roughness={0.2}
              emissive="#1E40AF"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          <mesh position={[0.8, 0, 0.3]} castShadow>
            <boxGeometry args={[0.5, 0.15, 1.2]} />
            <meshStandardMaterial 
              color="#6366F1" 
              metalness={0.8}
              roughness={0.2}
              emissive="#1E40AF"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Cockpit - more detailed */}
          <mesh position={[0, 0.3, -0.2]} castShadow>
            <sphereGeometry args={[0.35, 12, 8]} />
            <meshStandardMaterial 
              color="#1E293B"
              metalness={0.95}
              roughness={0.05}
              transparent
              opacity={0.9}
              emissive="#0F172A"
              emissiveIntensity={0.1}
            />
          </mesh>
          
          {/* Additional hull details */}
          <mesh position={[0, -0.1, 0.8]} castShadow>
            <cylinderGeometry args={[0.15, 0.25, 0.8, 8]} />
            <meshStandardMaterial 
              color="#4338CA"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        </group>
      )}
      
      {/* Enhanced engine exhaust */}
      <mesh ref={exhaustRef} position={[0, 0, 1.4]}>
        <coneGeometry args={[0.25, 0.8, 8]} />
        <meshStandardMaterial 
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Additional exhaust particles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh key={i} position={[0, 0, 1.8 + i * 0.3]}>
          <sphereGeometry args={[0.08 - i * 0.02]} />
          <meshStandardMaterial 
            color="#00BFFF"
            emissive="#00BFFF"
            emissiveIntensity={0.6 - i * 0.2}
            transparent
            opacity={0.5 - i * 0.15}
          />
        </mesh>
      ))}
      
      {/* Enhanced engine glow */}
      <pointLight 
        position={[0, 0, 1.8]} 
        color="#00D9FF" 
        intensity={2} 
        distance={8}
        decay={2}
      />
      
      {/* Navigation lights - enhanced */}
      <pointLight 
        position={[-0.8, 0, 0]} 
        color="#FF0000" 
        intensity={0.8} 
        distance={3}
      />
      <pointLight 
        position={[0.8, 0, 0]} 
        color="#00FF00" 
        intensity={0.8} 
        distance={3}
      />
      
      {/* Forward spotlight */}
      <spotLight
        position={[0, 0, -1]}
        target-position={[0, 0, -10]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={0.5}
        color="#FFFFFF"
        distance={15}
        castShadow
      />
    </group>
  );
}
