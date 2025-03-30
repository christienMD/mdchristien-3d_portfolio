/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// This component fixes NaN values in the model geometry
const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("/desktop_pc/scene.gltf");
  const modelRef = useRef();
  const { gl } = useThree();

  // Fix NaN values in the model geometry and set up context recovery
  useEffect(() => {
    // Handle WebGL context loss
    const handleContextLost = (event) => {
      event.preventDefault(); // This is critical
      console.log("WebGL context lost. Attempting to restore...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored!");
    };

    // Add event listeners for context loss/restoration
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Fix NaN values in model geometry
    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const geometry = object.geometry;
          
          // Fix NaN positions if they exist
          if (geometry.attributes.position) {
            const positions = geometry.attributes.position.array;
            let hasNaN = false;
            
            for (let i = 0; i < positions.length; i++) {
              // Replace NaN or infinity values with 0
              if (isNaN(positions[i]) || !isFinite(positions[i])) {
                positions[i] = 0;
                hasNaN = true;
              }
            }
            
            if (hasNaN) {
              geometry.attributes.position.needsUpdate = true;
              // Recompute bounding sphere with safe values
              geometry.computeBoundingSphere();
              
              // If still NaN, create a safe fallback sphere
              if (isNaN(geometry.boundingSphere.radius)) {
                geometry.boundingSphere.radius = 1.0; // Safe default
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
  }, [scene, gl]);

  return (
    <mesh ref={modelRef}>
      {/* Lighting setup optimized for performance */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} />

      <primitive
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// Preload the model to improve loading performance
useGLTF.preload("/desktop_pc/scene.gltf");

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    // Check for mobile device
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        frameloop="demand"
        shadows={false} // Disable shadows for better performance
        dpr={isMobile ? 1 : [1, 2]} // Lower resolution on mobile
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ 
          powerPreference: "high-performance",
          alpha: true,
          antialias: !isMobile, // Disable antialiasing on mobile
          precision: isMobile ? "lowp" : "highp", // Lower precision on mobile
          preserveDrawingBuffer: true
        }}
        onCreated={({ gl }) => {
          // Set clear color
          gl.setClearColor(new THREE.Color('#000000'), 0);
        }}
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
    </div>
  );
};

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
