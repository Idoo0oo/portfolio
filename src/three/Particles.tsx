import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fungsi untuk membuat koordinat acak di ruang 3D untuk ribuan partikel
const generateParticles = (count: number) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // Menyebar partikel di area tertentu
  }
  return positions;
};

// Kita buat 3000 partikel
const particlePositions = generateParticles(3000);

export default function Particles() {
  const ref = useRef<THREE.Points>(null);

  // useFrame dipanggil di setiap frame animasi (mirip requestAnimationFrame)
  // Kita gunakan ini untuk memutar partikel secara perlahan
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Komponen Points dari Drei untuk me-render banyak partikel sekaligus */}
      <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="var(--color-neon)" // Warna hijau neon dari CSS kita
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}