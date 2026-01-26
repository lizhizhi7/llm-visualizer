import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import type { Token } from '../../../types';
import { projectTo3D } from '../../../services/simulation';
import { getTokenColor } from '../../../services/tokenizer';
import * as THREE from 'three';

interface EmbeddingSpace3DProps {
  tokens: Token[];
  embeddings: number[][];
}

function TokenPoint({
  position,
  token,
  index,
}: {
  position: [number, number, number];
  token: Token;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = getTokenColor(token.type);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.05;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="bottom"
      >
        {token.text === ' ' ? '␣' : token.text}
      </Text>
    </group>
  );
}

function Connections({ positions }: { positions: [number, number, number][] }) {
  const geometry = useMemo(() => {
    const points = positions.map((p) => new THREE.Vector3(...p));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [positions]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#4f46e5', opacity: 0.3, transparent: true }))} />
  );
}

function Scene({ tokens, embeddings }: EmbeddingSpace3DProps) {
  const positions = useMemo(() => {
    if (embeddings.length === 0) return [];
    const projected = projectTo3D(embeddings);
    const scale = 2;
    return projected.map(
      (p) => [p[0] * scale, p[1] * scale, p[2] * scale] as [number, number, number]
    );
  }, [embeddings]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {positions.length > 1 && <Connections positions={positions} />}

      {tokens.map((token, index) => (
        <TokenPoint
          key={token.id}
          position={positions[index] || [0, 0, 0]}
          token={token}
          index={index}
        />
      ))}

      <gridHelper args={[10, 10, '#334155', '#1e293b']} position={[0, -2, 0]} />
      <axesHelper args={[3]} />

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function EmbeddingSpace3D({ tokens, embeddings }: EmbeddingSpace3DProps) {
  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>
      <Scene tokens={tokens} embeddings={embeddings} />
    </Canvas>
  );
}
