// Update client/src/pages/LandingPage.jsx to include final components
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import PCScene from '../components/PCScene';
import ProductInfo from '../components/ProductInfo';
import LoadingScreen from '../components/LoadingScreen';
import ColorPicker from '../components/ColorPicker';
import SpecsPanel from '../components/SpecsPanel';
import ScrollExperience from '../components/ScrollExperience';
import ConfiguratorPanel from '../components/ConfiguratorPanel';
import PriceUpdater from '../components/PriceUpdater';
import PerformanceMetrics from '../components/PerformanceMetrics';
import ProductShowcase from '../components/ProductShowcase';
import InteractiveUI from '../components/InteractiveUI';
import Footer from '../components/Footer';
import gsap from 'gsap';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([3, 2, 5]);
  const [selectedView, setSelectedView] = useState('overview');
  const [modelColor, setModelColor] = useState('#1a1a1a');
  const [basePrice, setBasePrice] = useState(2999);
  const [priceModifiers, setPriceModifiers] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add entrance animation for the main scene
      gsap.from('.main-canvas', {
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut'
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (view) => {
    setSelectedView(view);
    
    const positions = {
      front: [0, 0, 3],
      side: [4, 0, 2],
      top: [0, 5, 1],
      overview: [3, 2, 5],
      closeup: [0.5, 0.5, 1.5]
    };

    gsap.to({}, {
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: function() {
        setCameraPosition(positions[view]);
      }
    });
  };

  const handleConfigurationChange = (component, option) => {
    setPriceModifiers(prev => ({
      ...prev,
      [component]: option.price
    }));
  };

  return (<>
  <Navbar />
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <ProductInfo onViewChange={handleViewChange} />
      <SpecsPanel />
      <ColorPicker onColorChange={setModelColor} />
      <ScrollExperience onScroll={handleViewChange} />
      <ConfiguratorPanel onConfigurationChange={handleConfigurationChange} />
      <PriceUpdater basePrice={basePrice} priceModifiers={priceModifiers} />
      <PerformanceMetrics />
      <ProductShowcase />
      <InteractiveUI />
      <Footer />
      
      <div className="absolute inset-0 w-2/3 main-canvas">
        <Canvas shadows camera={{ position: cameraPosition, fov: 50 }}>
          <Suspense fallback={null}>
            {/* Enhanced lighting setup */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
            <spotLight
              position={[0, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            
            <Float
              speed={1.5}
              rotationIntensity={0.1}
              floatIntensity={0.05}
            >
              <PCScene color={modelColor} />
            </Float>
            
            <Environment preset="studio" background={false} />
            <fog attach="fog" args={['#000000', 5, 20]} />
            
            <OrbitControls 
              enableZoom={true}
              enablePan={false}
              minDistance={1.5}
              maxDistance={8}
              rotateSpeed={0.3}
              dampingFactor={0.05}
              autoRotate={selectedView === 'overview'}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Additional ambient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" />
        
        {/* Animated particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.5, 0.8],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default LandingPage;