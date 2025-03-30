/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Check if device is a mobile based on userAgent
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Detect browser
const getBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") > -1) return "firefox";
  if (userAgent.indexOf("Chrome") > -1) return "chrome";
  if (userAgent.indexOf("Safari") > -1) return "safari";
  return "other";
};

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

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
  const [canShowCanvas, setCanShowCanvas] = useState(true);

  useEffect(() => {
    // Check if we're on mobile
    const mobileDevice = isMobileDevice();
    const browser = getBrowser();
    
    // Set mobile state based on media query
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    // Determine if we should show canvas based on device/browser
    // Firefox and Safari can handle more canvases than Chrome on mobile
    if (mobileDevice && browser === "chrome") {
      // Prioritize showing the computer model (hide less important canvases elsewhere)
      // You can adjust this logic based on which part of your site is most important
      setCanShowCanvas(true);
      
      // Set a global variable that other components can check to determine
      // if they should render their canvas (to stay under the limit)
      window.canvasCount = window.canvasCount || 0;
      window.canvasCount++;
      
      // If we're one of the first 16 canvases, show
      // Otherwise don't render to avoid exceeding Chrome's limit
      if (window.canvasCount > 16) {
        setCanShowCanvas(false);
      }
    }

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      // Decrement canvas count when component unmounts
      if (window.canvasCount) window.canvasCount--;
    };
  }, []);

  // If we can't show canvas due to browser limitations, show nothing or a placeholder
  if (!canShowCanvas) {
    return null; // Or return a placeholder image/div
  }

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
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
