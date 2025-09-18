import React from "react";

const ComingSoonTemplate = ({ className = "" }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-tertiary via-primary to-black-200 rounded-2xl ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#151030" />
            <stop offset="50%" stopColor="#050816" />
            <stop offset="100%" stopColor="#090325" />
          </linearGradient>

          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#56ccf2" />
            <stop offset="25%" stopColor="#2f80ed" />
            <stop offset="50%" stopColor="#ec008c" />
            <stop offset="75%" stopColor="#fc6767" />
            <stop offset="100%" stopColor="#f5af19" />
          </linearGradient>

          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#11998e" />
            <stop offset="50%" stopColor="#38ef7d" />
            <stop offset="100%" stopColor="#f12711" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#bgGradient)" />

        {/* Animated circles */}
        <circle cx="80" cy="80" r="3" fill="#56ccf2" opacity="0.6">
          <animate
            attributeName="r"
            values="3;6;3"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="320" cy="70" r="4" fill="#ec008c" opacity="0.5">
          <animate
            attributeName="r"
            values="4;8;4"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0.8;0.5"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="350" cy="220" r="2" fill="#38ef7d" opacity="0.7">
          <animate
            attributeName="r"
            values="2;5;2"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="60" cy="230" r="3" fill="#f5af19" opacity="0.4">
          <animate
            attributeName="r"
            values="3;7;3"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Geometric shapes */}
        <polygon
          points="200,50 220,90 180,90"
          fill="none"
          stroke="url(#accentGradient)"
          strokeWidth="2"
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 200 70"
            to="360 200 70"
            dur="8s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* Main text */}
        <text
          x="200"
          y="140"
          textAnchor="middle"
          fill="url(#textGradient)"
          fontSize="50"
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
          filter="url(#glow)"
        >
          COMING
        </text>

        <text
          x="200"
          y="180"
          textAnchor="middle"
          fill="url(#textGradient)"
          fontSize="50"
          fontWeight="bold"
          fontFamily="Poppins, sans-serif"
          filter="url(#glow)"
        >
          SOON
        </text>

        {/* Subtitle */}
        <text
          x="200"
          y="210"
          textAnchor="middle"
          fill="#aaa6c3"
          fontSize="14"
          fontFamily="Poppins, sans-serif"
          opacity="0.8"
        >
          Stay tuned for something amazing
        </text>

        {/* Animated dots */}
        <g>
          <circle cx="170" cy="240" r="2" fill="#56ccf2">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.5s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
          <circle cx="185" cy="240" r="2" fill="#56ccf2">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </circle>
          <circle cx="200" cy="240" r="2" fill="#56ccf2">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.5s"
              repeatCount="indefinite"
              begin="1s"
            />
          </circle>
          <circle cx="215" cy="240" r="2" fill="#56ccf2">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </circle>
          <circle cx="230" cy="240" r="2" fill="#56ccf2">
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="1.5s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default ComingSoonTemplate;
