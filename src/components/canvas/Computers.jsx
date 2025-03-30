/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const { gl } = useThree();
  const modelRef = useRef();
  
  // Fix NaN values and handle context loss
  useEffect(() => {
    // Set up context loss handling
    const handleContextLost = (event) => {
      event.preventDefault();
      console.log("WebGL context lost, attempting to restore...");
    };
    
    const handleContextRestored = () => {
      console.log("WebGL context restored!");
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    // Fix NaN values in the model
    if (computer && computer.scene) {
      computer.scene.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const geometry = object.geometry;
          
          // Fix NaN positions
          if (geometry.attributes.position) {
            const positions = geometry.attributes.position.array;
            let hasNaN = false;
            
            for (let i = 0; i < positions.length; i++) {
              if (isNaN(positions[i]) || !isFinite(positions[i])) {
                positions[i] = 0;
                hasNaN = true;
              }
            }
            
            if (hasNaN) {
              geometry.attributes.position.needsUpdate = true;
              
              // Safely compute bounding sphere
              try {
                geometry.computeBoundingSphere();
                
                // If still NaN, create a safe fallback sphere
                if (isNaN(geometry.boundingSphere.radius)) {
                  geometry.boundingSphere.radius = 1.0;
                }
              } catch (e) {
                console.error("Error computing bounding sphere:", e);
                geometry.boundingSphere = {
                  center: new THREE.Vector3(0, 0, 0),
                  radius: 1.0
                };
              }
            }
          }
        }
      });
    }
    
    return () => {
      // Clean up event listeners
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [computer, gl]);

  return (
    <mesh ref={modelRef}>
      {/* Lighting setup */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} />

      {/* The 3D model */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile device
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    // Clear Three.js cache
    if (typeof THREE !== 'undefined' && THREE.Cache) {
      THREE.Cache.clear();
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows={false} // Disable shadows for better performance
      dpr={isMobile ? 0.5 : 1} // Lower resolution on mobile
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        powerPreference: "default",
        alpha: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        precision: isMobile ? "lowp" : "highp", // Lower precision on mobile
        preserveDrawingBuffer: true
      }}
      onCreated={({ gl }) => {
        // Clear to transparent background
        gl.setClearColor(new THREE.Color('#000000'), 0);
      }}
      style={{ touchAction: 'none' }} // Fix for mobile touch events
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={!isMobile} // Disable damping on mobile
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

// Preload the model to improve loading performance
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
