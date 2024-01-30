import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import './lava.css';

const Box = ({ position, level }) => {
  const boxRef = useRef();

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.005;
  });

  return (
    <mesh position={position} ref={boxRef}>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial color={level % 2 === 0 ? 'green' : 'blue'} />
    </mesh>
  );
};

const Lava = () => {
  return (
    <mesh position={[8, -6, 0]} scale={[1, 12, 12]}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Lavas = () => {
  const levels = 3;
  const rows = 3;

  return (
    <div className="App">
      <Canvas style={{ background: 'lightblue' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {[...Array(levels)].map((_, level) =>
          [...Array(rows)].map((_, row) => (
            <Box
              key={`${level}-${row}`}
              position={[row * 3 - 3, level * 3, 0]}
              level={level + 1}
            />
          ))
        )}

        <Lava />
        <Html>
          <div className="text-white text-center mt-4">
            
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default Lavas;
