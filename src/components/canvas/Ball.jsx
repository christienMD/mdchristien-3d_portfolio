/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

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

// Fallback image component for when canvas can't be shown
const ImageFallback = ({ icon }) => {
  return (
    <div 
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        background: "#151030",
        overflow: "hidden",
      }}
    >
      <img 
        src={icon} 
        alt="technology" 
        style={{
          width: "60%",
          height: "60%",
          objectFit: "contain"
        }}
      />
    </div>
  );
};

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [canShowCanvas, setCanShowCanvas] = useState(true);

  useEffect(() => {
    // Check if we're on mobile
    const mobileDevice = isMobileDevice();
    const browser = getBrowser();
    
    // If on Chrome mobile, check if we're beyond the canvas limit
    if (mobileDevice && browser === "chrome") {
      // Initialize or increment canvas count
      window.canvasCount = window.canvasCount || 0;
      window.canvasCount++;
      
      // Chrome mobile has ~16 canvas limit
      // For balls, which are less important than main computer model,
      // we'll use image fallbacks after a lower threshold to save resources
      if (window.canvasCount > 8) {
        setCanShowCanvas(false);
      }
    }

    return () => {
      // Decrement canvas count when component unmounts
      if (window.canvasCount) window.canvasCount--;
    };
  }, []);

  // If we need to limit canvas usage, show image fallback instead
  if (!canShowCanvas) {
    return <ImageFallback icon={icon} />;
  }

  // Original canvas rendering
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;

// /* eslint-disable react/no-unknown-property */
// import { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";

// import CanvasLoader from "../Loader";

// const Ball = (props) => {
//   const [decal] = useTexture([props.imgUrl]);

//   return (
//     <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.25} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         <meshStandardMaterial
//           color="#fff8eb"
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[2 * Math.PI, 0, 6.25]}
//           scale={1}
//           map={decal}
//           flatShading
//         />
//       </mesh>
//     </Float>
//   );
// };

// const BallCanvas = ({ icon }) => {
//   return (
//     <Canvas
//       frameloop="demand"
//       dpr={[1, 2]}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls enableZoom={false} />
//         <Ball imgUrl={icon} />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// export default BallCanvas;
