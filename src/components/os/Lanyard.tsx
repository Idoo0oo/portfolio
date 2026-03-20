import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment, Float, ContactShadows, PerspectiveCamera, PerformanceMonitor, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import { MathUtils, SRGBColorSpace, LinearMipmapLinearFilter, LinearFilter, Group } from 'three';

import lanyardCardImage from '/lanyard-card.webp';

interface HyperCardProps {
  position?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 15],
  fov = 25,
  transparent = true
}: HyperCardProps) {
  const [dpr, setDpr] = useState(1.5);
  
  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center cursor-default">
      <Canvas
        gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance" }}
        shadows
        dpr={dpr}
      >
        <Suspense fallback={null}>
          <Preload all />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Card />
          </Float>
        </Suspense>

        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        
        <PerspectiveCamera makeDefault position={position} fov={fov} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} />

        <ContactShadows 
          position={[0, -4, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2.5} 
          far={4.5} 
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function Card() {
  const meshRef = useRef<Group>(null);
  const texture = useTexture(lanyardCardImage);
  
  useEffect(() => {
    if (texture) {
      // eslint-disable-next-line react-hooks/immutability
      texture.anisotropy = 16;
      texture.colorSpace = SRGBColorSpace;
      texture.minFilter = LinearMipmapLinearFilter;
      texture.magFilter = LinearFilter;
      texture.flipY = true;
      texture.needsUpdate = true;
    }
  }, [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smoothly rotate the card based on mouse position
    // negative pointer Y for tilt X, positive pointer X for tilt Y
    const targetRotationX = (-state.pointer.y * Math.PI) / 8;
    const targetRotationY = (state.pointer.x * Math.PI) / 6;
    
    meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
  });

  return (
    <group ref={meshRef}>
      {/* Main Card Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 5.6, 0.15]} />
        <meshStandardMaterial 
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.1}
          roughness={0.4} 
          metalness={0.1}
        />
      </mesh>

      {/* Glare Layer (Subtle overlay for glass effect) */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[3.9, 5.5]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.1}
          color="white"
          roughness={0.2}
        />
      </mesh>

      {/* Back of Card */}
      <mesh position={[0, 0, -0.08]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4, 5.6]} />
        <meshPhysicalMaterial 
          color="#111111"
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}
