// Enhanced PCScene.jsx with color support
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const PCScene = ({ color = '#1a1a1a' }) => {
  const groupRef = useRef();
  const caseRef = useRef();
  const fanRef = useRef();
  const rgbRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
    
    if (fanRef.current) {
      fanRef.current.rotation.z += 0.1;
    }
    
    if (rgbRef.current) {
      const hue = (state.clock.elapsedTime * 0.1) % 1;
      rgbRef.current.material.emissive.setHSL(hue, 0.8, 0.5);
    }
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* Main case with dynamic color */}
      <Box ref={caseRef} args={[1.5, 2.5, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={color} 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={0.5}
        />
      </Box>
      
      {/* Improved glass side panel with reflections */}
      <Box args={[0.05, 2.4, 1.4]} position={[0.75, 0, 0]} castShadow>
        <MeshTransmissionMaterial
          transmission={0.95}
          roughness={0.05}
          thickness={0.05}
          color="#ffffff"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          chromaticAberration={0.1}
          backside
        />
      </Box>
      
      {/* Front panel with metallic finish */}
      <Box args={[1.4, 2.4, 0.05]} position={[0, 0, 0.77]}>
        <meshStandardMaterial 
          color="#080808" 
          metalness={0.9} 
          roughness={0.05} 
          envMapIntensity={0.5}
        />
      </Box>
      
      {/* Animated fan assembly */}
      <group ref={fanRef} position={[0, 0.8, 0.77]}>
        <Cylinder args={[0.35, 0.35, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </Cylinder>
        {[...Array(6)].map((_, i) => (
          <Box 
            key={i} 
            args={[0.05, 0.35, 0.02]} 
            position={[0, 0, 0]}
            rotation={[0, 0, (Math.PI * 2 / 6) * i]}
          >
            <meshStandardMaterial 
              color="#333333" 
              metalness={0.9} 
              emissive="#0066ff"
              emissiveIntensity={0.2}
            />
          </Box>
        ))}
      </group>
      
      {/* Animated RGB lighting */}
      <Box 
        ref={rgbRef}
        args={[1.45, 0.03, 0.03]} 
        position={[0, -1.2, 0.78]}
      >
        <meshStandardMaterial 
          emissive="#3b82f6" 
          emissiveIntensity={3} 
          color="#000000"
        />
      </Box>
      
      {/* Secondary RGB lighting strips */}
      <Box args={[0.03, 2.4, 0.03]} position={[0.73, 0, 0]}>
        <meshStandardMaterial 
          emissive="#ff00ff" 
          emissiveIntensity={2} 
          color="#000000"
        />
      </Box>
      
      {/* CPU cooler with RGB */}
      <group position={[0, 0, 0]}>
        <Cylinder args={[0.7, 0.7, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            color="#333333" 
            metalness={0.9} 
            roughness={0.1}
          />
        </Cylinder>
        <Cylinder args={[0.4, 0.4, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial 
            emissive="#00ffff" 
            emissiveIntensity={2} 
            color="#000000"
          />
        </Cylinder>
      </group>
      
      {/* Power LED indicators */}
      {[...Array(8)].map((_, i) => (
        <Sphere 
          key={i} 
          args={[0.02]} 
          position={[-0.6 + i * 0.17, 1.15, 0.78]}
        >
          <meshStandardMaterial 
            emissive="#00ffff" 
            emissiveIntensity={3} 
          />
        </Sphere>
      ))}
      
      {/* Power button with glow animation */}
      <Sphere args={[0.03]} position={[0.65, 1.1, 0.78]}>
        <meshStandardMaterial 
          emissive="#00ff00" 
          emissiveIntensity={4} 
        />
      </Sphere>
      
      {/* I/O ports with realistic depth */}
      <Box args={[0.3, 0.1, 0.05]} position={[0, -1.15, 0.78]}>
        <meshStandardMaterial 
          color="#222222" 
          metalness={0.9} 
          roughness={0.1}
        />
      </Box>
      
      {/* DisplayPort/HDMI ports */}
      <Box args={[0.05, 0.08, 0.05]} position={[-0.15, -1.15, 0.78]}>
        <meshStandardMaterial color="#444444" metalness={0.8} />
      </Box>
      <Box args={[0.05, 0.08, 0.05]} position={[0, -1.15, 0.78]}>
        <meshStandardMaterial color="#444444" metalness={0.8} />
      </Box>
      <Box args={[0.05, 0.08, 0.05]} position={[0.15, -1.15, 0.78]}>
        <meshStandardMaterial color="#444444" metalness={0.8} />
      </Box>
      
      {/* USB ports */}
      <Cylinder args={[0.02, 0.02, 0.05]} position={[-0.35, -1.15, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#222222" metalness={0.9} />
      </Cylinder>
      <Cylinder args={[0.02, 0.02, 0.05]} position={[0.35, -1.15, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#222222" metalness={0.9} />
      </Cylinder>
      
      {/* Mesh pattern on top */}
      {[...Array(12)].map((_, i) => (
        <Box 
          key={i} 
          args={[0.05, 0.05, 1.3]} 
          position={[-0.55 + i * 0.1, 1.26, 0]}
        >
          <meshStandardMaterial color="#111111" metalness={0.8} />
        </Box>
      ))}
      
      {/* Ventilation panels on sides */}
      {[...Array(8)].map((_, i) => (
        <Box 
          key={i} 
          args={[0.05, 0.4, 0.05]} 
          position={[-0.76, 0.8 - i * 0.3, 0.5 - i * 0.1]} 
          rotation={[0, Math.PI / 4, 0]}
        >
          <meshStandardMaterial color="#050505" metalness={0.9} />
        </Box>
      ))}
      
      {/* Base with LED underglow */}
      <Box args={[1.6, 0.1, 1.6]} position={[0, -1.3, 0]}>
        <meshStandardMaterial 
          color="#000000" 
          metalness={0.9} 
          roughness={0.1} 
        />
      </Box>
      
      {/* Underglow effect */}
      <Cylinder args={[0.8, 0.8, 0.02]} position={[0, -1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial 
          emissive="#3b82f6"
          emissiveIntensity={2}
          color="#000000"
        />
      </Cylinder>
      
      {/* Cable management */}
      <Cylinder args={[0.05, 0.05, 0.3]} position={[0.7, -1.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#222222" roughness={0.5} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.3]} position={[-0.7, -1.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#222222" roughness={0.5} />
      </Cylinder>
    </group>
  );
};

export default PCScene;
