import React from "react";

const GeometricSymbol: React.FC = () => {
  const size = 300;
  const radius = 120;
  const center = size / 2;
  const pointRadius = 3.5;
  const stroke = "#e0e0e0";
  const strokeWidth = 0.25;

  const dots = [
    { cx: center, cy: center - radius },
    { cx: center - radius * Math.cos(Math.PI / 6), cy: center + radius * Math.sin(Math.PI / 6) },
    { cx: center + radius * Math.cos(Math.PI / 6), cy: center + radius * Math.sin(Math.PI / 6) }
  ];

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {dots.map((d, i) => (
          <circle
            key={`dot-${i}`}
            cx={d.cx}
            cy={d.cy}
            r={pointRadius}
            fill="#f0f0f0"
            className="slow-rotate"
          />
        ))}
      </svg>
    </div>
  );
};

export default React.memo(GeometricSymbol);