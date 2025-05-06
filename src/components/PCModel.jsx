// client/src/components/PCModel.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const PCModel = () => {
  const groupRef = useRef();
                      
  // Animate the PC
  useFrame((state) => {
    if (groupRef.current) {
      // Slight hover animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  // Create a simple PC case model
  return (
    <group ref={groupRef} scale={0.8}>
      {/* Main case */}
      <Box args={[1.5, 2.5, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#202020" 
          metalness={0.8} 
          roughness={0.2} 
        />
      </Box>
      
      {/* Front panel */}
      <Box args={[1.4, 2.4, 0.1]} position={[0, 0, 0.75]}>
        <meshStandardMaterial 
          color="#101010" 
          metalness={0.5} 
          roughness={0.1} 
        />
      </Box>
      
      {/* Fan circles */}
      <Cylinder args={[0.3, 0.3, 0.05]} position={[0, 0.8, 0.755]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#060606" metalness={0.7} />
      </Cylinder>
      <Cylinder args={[0.3, 0.3, 0.05]} position={[0, -0.8, 0.755]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#060606" metalness={0.7} />
      </Cylinder>
      
      {/* Power button */}
      <Sphere args={[0.05]} position={[0.6, 1.1, 0.755]}>
        <meshStandardMaterial 
          emissive="#00ff00" 
          emissiveIntensity={2} 
          color="#00ff00" 
        />
      </Sphere>
      
      {/* Ports */}
      <Box args={[0.2, 0.15, 0.05]} position={[0.4, -1, 0.755]}>
        <meshStandardMaterial color="#333333" metalness={0.9} />
      </Box>
      <Box args={[0.1, 0.08, 0.05]} position={[0.1, -1, 0.755]}>
        <meshStandardMaterial color="#333333" metalness={0.9} />
      </Box>
      
      {/* Side ventilation */}
      {[...Array(6)].map((_, i) => (
        <Box 
          key={i} 
          args={[0.05, 0.4, 0.05]} 
          position={[0.755, -0.8 + i * 0.3, 0]} 
          rotation={[0, Math.PI / 2, 0]}
        >
          <meshStandardMaterial color="#050505" metalness={0.9} />
        </Box>
      ))}
      
      {/* RGB lighting effect */}
      <Box args={[1.42, 0.05, 0.05]} position={[0, -1.2, 0.755]}>
        <meshStandardMaterial 
          emissive="#3b82f6" 
          emissiveIntensity={1.5} 
          color="#3b82f6" 
        />
      </Box>
    </group>
  );
};

export default PCModel;