/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// This component will normalize the geometry to fix NaN values
const ModelWithErrorHandling = ({ isMobile }) => {
  const { scene } = useGLTF("/desktop_pc/scene.gltf");
  const modelRef = useRef();
  const { gl } = useThree();
  
  // Clone the scene to avoid modifying the original
  const safeScene = scene.clone();
  
  // Function to validate and fix geometry issues
  useEffect(() => {
    if (safeScene) {
      // Fix potential NaN values in geometries
      safeScene.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const geometry = object.geometry;
          
          // Fix NaN positions if they exist
          if (geometry.attributes.position) {
            const positions = geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i++) {
              // Replace NaN or infinity values with 0
              if (isNaN(positions[i]) || !isFinite(positions[i])) {
                positions[i] = 0;
              }
            }
            // Force update of internal buffers
            geometry.attributes.position.needsUpdate = true;
          }
          
          // Recompute bounding sphere with safe values
          geometry.computeBoundingSphere();
          
          // If still NaN, create a safe fallback sphere
          if (isNaN(geometry.boundingSphere.radius)) {
            geometry.boundingSphere.radius = 1.0; // Safe default
          }
        }
      });
    }
    
    // Set up WebGL context loss handling
    const handleContextLost = (event) => {
      event.preventDefault();
      console.log("WebGL context lost. Attempting to restore...");
    };
    
    const handleContextRestored = () => {
      console.log("WebGL context restored!");
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [safeScene, gl]);
  
  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      <primitive
        ref={modelRef}
        object={safeScene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -2.5, -1.8] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// Performance optimization wrapper for the Canvas
const PerformanceOptimizedCanvas = ({ children }) => {
  const [contextLost, setContextLost] = useState(false);
  const canvasRef = useRef();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleContextLost = (e) => {
      e.preventDefault();
      setContextLost(true);
      console.log("Context lost at canvas level");
      
      // Attempt to restore after a delay
      setTimeout(() => {
        if (canvas && canvas.getContext) {
          try {
            // Force a context restoration
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (gl) setContextLost(false);
          } catch (err) {
            console.error("Could not restore WebGL context", err);
          }
        }
      }, 1000);
    };
    
    const handleContextRestored = () => {
      setContextLost(false);
      console.log("Context restored at canvas level");
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);
  
  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  
  useEffect(() => {
    // Check for mobile device
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    
    // Also enable low performance mode on mobile
    setLowPerformanceMode(mediaQuery.matches);
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
      setLowPerformanceMode(event.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  
  return (
    <PerformanceOptimizedCanvas>
      <Canvas
        frameloop={lowPerformanceMode ? "demand" : "always"}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: !lowPerformanceMode,
          stencil: false,
          depth: true,
          // Lower precision on mobile to save memory
          precision: lowPerformanceMode ? "lowp" : "highp",
        }}
        dpr={lowPerformanceMode ? 0.8 : [1, 2]}
        camera={{ position: [20, 3, 5], fov: isMobile ? 30 : 25 }}
        style={{ width: '100%', height: '100%' }}
        onCreated={({ gl }) => {
          // Set clear color
          gl.setClearColor(new THREE.Color('#000000'), 0);
          
          // Turn on memory optimization
          if (lowPerformanceMode) {
            gl.getExtension('WEBGL_lose_context');
          }
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <ModelWithErrorHandling isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </PerformanceOptimizedCanvas>
  );
};

// Preload the model to minimize initial load time
useGLTF.preload("/desktop_pc/scene.gltf");

export default ComputersCanvas;




// /* eslint-disable react/no-unknown-property */
// import { Suspense, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

// import CanvasLoader from "../Loader";

// const Computers = ({ isMobile }) => {
//   const computer = useGLTF("/desktop_pc/scene.gltf");
// // service_e0s4py1
// // template_ugfp0qj
// // nsqd8t - OH_y - Hatsv;

//   return (
//     <mesh>
//       {/* Reduced ambient light intensity */}
//       <ambientLight intensity={0.8} />

//       {/* Reduced main directional light */}
//       <directionalLight position={[10, 10, 5]} intensity={0.7} />

//       {/* Reduced secondary directional light */}
//       <directionalLight position={[-10, 10, -5]} intensity={0.4} />

//       <primitive
//         object={computer.scene}
//         scale={isMobile ? 0.7 : 0.75}
//         position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
//         rotation={[-0.01, -0.2, -0.1]}
//       />
//     </mesh>
//   );
// };

// const ComputersCanvas = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(max-width: 500px)");
//     setIsMobile(mediaQuery.matches);

//     const handleMediaQueryChange = (event) => {
//       setIsMobile(event.matches);
//     };

//     mediaQuery.addEventListener("change", handleMediaQueryChange);

//     return () => {
//       mediaQuery.removeEventListener("change", handleMediaQueryChange);
//     };
//   }, []);

//   return (
//     <Canvas
//       frameloop="demand"
//       shadows
//       dpr={[1, 2]}
//       camera={{ position: [20, 3, 5], fov: 25 }}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls
//           enableZoom={false}
//           maxPolarAngle={Math.PI / 2}
//           minPolarAngle={Math.PI / 2}
//         />
//         <Computers isMobile={isMobile} />
//       </Suspense>
//       <Preload all />
//     </Canvas>
//   );
// };

// export default ComputersCanvas;
