import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Particle {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
}

interface ParticleEffectsProps {
  particles: Particle[];
}

export default function ParticleEffects({ particles }: ParticleEffectsProps) {
  const meshRef = useRef<THREE.Points>(null);
  
  // Create particle system geometry
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    const colors = new Float32Array(particles.length * 3);
    const sizes = new Float32Array(particles.length);
    
    particles.forEach((particle, i) => {
      positions[i * 3] = particle.position.x;
      positions[i * 3 + 1] = particle.position.y;
      positions[i * 3 + 2] = particle.position.z;
      
      // Color based on life (fade from orange to red)
      const lifeFactor = particle.life;
      colors[i * 3] = 1; // Red
      colors[i * 3 + 1] = lifeFactor * 0.5; // Green
      colors[i * 3 + 2] = 0; // Blue
      
      sizes[i] = lifeFactor * 2;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geometry;
  }, [particles]);

  useFrame(() => {
    if (meshRef.current && particles.length > 0) {
      const positions = meshRef.current.geometry.attributes.position;
      const colors = meshRef.current.geometry.attributes.color;
      const sizes = meshRef.current.geometry.attributes.size;
      
      particles.forEach((particle, i) => {
        if (i < positions.count) {
          positions.setXYZ(i, particle.position.x, particle.position.y, particle.position.z);
          
          const lifeFactor = particle.life;
          colors.setXYZ(i, 1, lifeFactor * 0.5, 0);
          sizes.setX(i, lifeFactor * 2);
        }
      });
      
      positions.needsUpdate = true;
      colors.needsUpdate = true;
      sizes.needsUpdate = true;
    }
  });

  if (particles.length === 0) {
    return null;
  }

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry" {...particleGeometry} />
      <pointsMaterial
        size={1}
        transparent
        opacity={0.8}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
