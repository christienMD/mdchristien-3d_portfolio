/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

// Modified Computer component with error handling
const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  
  // Add error handling for the model
  useEffect(() => {
    if (computer && computer.scene) {
      // Fix NaN values in model geometries
      computer.scene.traverse((object) => {
        if (object.isMesh && object.geometry) {
          const geometry = object.geometry;
          
          // Fix NaN values in positions
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
              
              // Create a valid bounding sphere
              if (!geometry.boundingSphere) {
                geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
              } else {
                if (isNaN(geometry.boundingSphere.radius)) {
                  geometry.boundingSphere.radius = 1;
                }
              }
            }
          }
        }
      });
    }
  }, [computer]);

  return (
    <mesh>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} />
      <directionalLight position={[-10, 10, -5]} intensity={0.4} />

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
    // Patch THREE.BufferGeometry to handle NaN values
    const originalComputeBoundingSphere = THREE.BufferGeometry.prototype.computeBoundingSphere;
    
    THREE.BufferGeometry.prototype.computeBoundingSphere = function() {
      try {
        // Call original method
        originalComputeBoundingSphere.call(this);
        
        // Fix NaN radius after computation
        if (this.boundingSphere && isNaN(this.boundingSphere.radius)) {
          this.boundingSphere.radius = 1;
          console.log("Fixed NaN radius in computeBoundingSphere");
        }
      } catch (e) {
        console.error("Error in computeBoundingSphere:", e);
        
        // Create a fallback bounding sphere
        this.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 1);
      }
      
      return this;
    };
    
    // Check for mobile device
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      
      // Restore original method
      THREE.BufferGeometry.prototype.computeBoundingSphere = originalComputeBoundingSphere;
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows={false} // Disable shadows for better performance
      dpr={isMobile ? 0.75 : [1, 2]} // Lower resolution on mobile
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        powerPreference: "default",
        alpha: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        precision: isMobile ? "lowp" : "highp", // Lower precision on mobile
        preserveDrawingBuffer: true
      }}
      onCreated={({ gl }) => {
        // Set clear color
        gl.setClearColor(new THREE.Color('#000000'), 0);
        
        // Handle WebGL context loss/restore
        const canvas = gl.domElement;
        canvas.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.log("WebGL context lost, attempting to restore...");
        }, false);
        
        canvas.addEventListener('webglcontextrestored', () => {
          console.log("WebGL context restored!");
        }, false);
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
      {/* Remove Preload to avoid NaN errors */}
    </Canvas>
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
