import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const QuotationV2 = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quotationData, setQuotationData] = useState({
    projectName: '',
    clientName: '',
    items: [],
    totalCost: 0
  });
  const [items] = useState([
    { id: 1, name: 'Website Development', basePrice: 5000, model: 'computer' },
    { id: 2, name: 'Mobile App', basePrice: 8000, model: 'phone' },
    { id: 3, name: 'Consulting', basePrice: 150, model: 'lightbulb' },
    { id: 4, name: 'UI/UX Design', basePrice: 3000, model: 'palette' },
    { id: 5, name: 'Content Writing', basePrice: 500, model: 'pen' }
  ]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.offsetWidth / canvasRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer 
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create 3D models for different items
    const models = {
      computer: createComputerModel(),
      phone: createPhoneModel(),
      lightbulb: createLightbulbModel(),
      palette: createPaletteModel(),
      pen: createPenModel()
    };

    // Floating animation for models
    const animateModels = () => {
      Object.values(models).forEach((model, index) => {
        if (model) {
          model.rotation.y += 0.01;
          model.position.y = Math.sin(Date.now() * 0.001 + index) * 0.1;
        }
      });
      requestAnimationFrame(animateModels);
      renderer.render(scene, camera);
    };
    animateModels();

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.offsetWidth / canvasRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Create 3D Models
  function createComputerModel() {
    const group = new THREE.Group();
    
    // Monitor screen
    const screenGeometry = new THREE.BoxGeometry(2, 1.5, 0.1);
    const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    
    // Screen display
    const displayGeometry = new THREE.PlaneGeometry(1.8, 1.2);
    const displayMaterial = new THREE.MeshLambertMaterial({ color: 0x0088ff });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.06;
    screen.add(display);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(2.2, 0.3, 0.5);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.9;
    
    group.add(screen);
    group.add(base);
    
    group.position.x = -8;
    group.position.z = -5;
    sceneRef.current.add(group);
    
    return group;
  }

  function createPhoneModel() {
    const group = new THREE.Group();
    
    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(1, 2, 0.2);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    
    // Screen
    const screenGeometry = new THREE.PlaneGeometry(0.9, 1.8);
    const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.z = 0.11;
    
    // Display
    const displayGeometry = new THREE.PlaneGeometry(0.8, 1.6);
    const displayMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff88 });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.z = 0.12;
    
    body.add(screen);
    body.add(display);
    group.add(body);
    
    group.position.x = -4;
    group.position.z = -5;
    sceneRef.current.add(group);
    
    return group;
  }

  function createLightbulbModel() {
    const group = new THREE.Group();
    
    // Bulb
    const bulbGeometry = new THREE.SphereGeometry(0.5, 16, 12);
    const bulbMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xffffff,
      emissive: 0xffffcc,
      emissiveIntensity: 0.2 
    });
    const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulb.position.y = 0.5;
    
    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.5);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    
    group.add(bulb);
    group.add(base);
    
    group.position.x = 0;
    group.position.z = -5;
    sceneRef.current.add(group);
    
    return group;
  }

  function createPaletteModel() {
    const group = new THREE.Group();
    
    // Palette base
    const paletteGeometry = new THREE.TorusGeometry(1, 0.2, 8, 16);
    const paletteMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const palette = new THREE.Mesh(paletteGeometry, paletteMaterial);
    
    // Color blobs
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
    colors.forEach((color, index) => {
      const blobGeometry = new THREE.SphereGeometry(0.15, 8, 6);
      const blobMaterial = new THREE.MeshLambertMaterial({ color: color });
      const blob = new THREE.Mesh(blobGeometry, blobMaterial);
      
      const angle = (index / colors.length) * Math.PI * 2;
      blob.position.x = Math.cos(angle) * 1.2;
      blob.position.z = Math.sin(angle) * 1.2;
      blob.position.y = 0.1;
      
      palette.add(blob);
    });
    
    // Paintbrush
    const brushGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5);
    const brushMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const brush = new THREE.Mesh(brushGeometry, brushMaterial);
    brush.position.x = 0;
    brush.position.y = 0.5;
    brush.rotation.z = Math.PI / 4;
    
    group.add(palette);
    group.add(brush);
    
    group.position.x = 4;
    group.position.z = -5;
    sceneRef.current.add(group);
    
    return group;
  }

  function createPenModel() {
    const group = new THREE.Group();
    
    // Pen body
    const bodyGeometry = new THREE.CylinderGeometry(0.05, 0.1, 2);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0066cc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 4;
    
    // Pen cap
    const capGeometry = new THREE.CylinderGeometry(0.06, 0.02, 0.3);
    const capMaterial = new THREE.MeshLambertMaterial({ color: 0x003366 });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.y = 1.15;
    cap.rotation.z = Math.PI / 4;
    
    // Writing tip effect
    const tipGeometry = new THREE.ConeGeometry(0.02, 0.1);
    const tipMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
    const tip = new THREE.Mesh(tipGeometry, tipMaterial);
    tip.position.y = -1.05;
    tip.rotation.z = Math.PI / 4;
    
    group.add(body);
    group.add(cap);
    group.add(tip);
    
    group.position.x = 8;
    group.position.z = -5;
    sceneRef.current.add(group);
    
    return group;
  }

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
    const newItem = {
      ...item,
      quantity: 1,
      subtotal: item.basePrice
    };
    setQuotationData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  // Calculate total cost
  useEffect(() => {
    const total = quotationData.items.reduce((sum, item) => sum + item.subtotal, 0);
    setQuotationData(prev => ({ ...prev, totalCost: total }));
  }, [quotationData.items]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotationData(prev => ({ ...prev, [name]: value }));
  };

  // Generate final quotation
  const generateQuotation = () => {
    console.log('Generating quotation...', quotationData);
    // This would send the data to backend API
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-white shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          3D Interactive Quotation Maker
        </h1>
      </motion.div>

      <div className="flex h-full">
        {/* Left Sidebar - Quotation Form */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-1/3 p-6 bg-white border-r"
        >
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={quotationData.projectName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={quotationData.clientName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-4">Selected Items</h3>
          <div className="space-y-2">
            {quotationData.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>{item.name}</span>
                <span className="font-semibold">${item.subtotal}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Cost:</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${quotationData.totalCost}
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateQuotation}
            className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Generate Quotation
          </motion.button>
        </motion.div>

        {/* Center - 3D Canvas */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 relative"
        >
          <div ref={canvasRef} className="w-full h-full bg-gradient-to-br from-gray-900 to-black"></div>
          
          {/* Floating UI elements */}
          <div className="absolute top-10 left-10 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold text-gray-800">Choose a Service</h3>
            <p className="text-sm text-gray-600">Click on 3D models to add items</p>
          </div>
        </motion.div>

        {/* Right Sidebar - Available Items */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-1/3 p-6 bg-white border-l"
        >
          <h2 className="text-xl font-semibold mb-4">Available Services</h2>
          
          <div className="space-y-4">
            {items.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleItemSelect(item)}
                className="p-4 border rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all"
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Base Price: ${item.basePrice}</p>
                <div className="mt-2 flex items-center">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full inline-block mr-2"></span>
                  <span className="text-sm text-gray-500">{item.model} model</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Pro Tip</h3>
            <p className="text-sm text-gray-600">
              Click on the 3D models in the center to add services to your quotation!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuotationV2;