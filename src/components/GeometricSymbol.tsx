import React from "react";

const GeometricSymbol: React.FC = () => {
  const size = 300;
  const radius = 120;
  const center = size / 2;
  const pointRadius = 3.5;
  const stroke = "#e0e0e0";
  const strokeWidth = 0.25;

  const baseAngles = [270, 150, 30]; // degrees
  const trailLength = 10;
  const trailSpacing = 1.5;
  const animationDuration = 45;

  const getCoordinates = (angleDeg: number, r = radius) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      cx: center + r * Math.cos(rad),
      cy: center + r * Math.sin(rad),
    };
  };

  const getCurveThroughCenter = (startDeg: number, endDeg: number) => {
    const start = getCoordinates(startDeg);
    const end = getCoordinates(endDeg);

    return `M ${start.cx} ${start.cy} Q ${center} ${center} ${end.cx} ${end.cy}`;
  };

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer circle */}
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <circle
          cx={center}
          cy={center}
          r={2.5}
          fill="#f0f0f0"
        />

        {[...Array(trailLength)].map((_, i) => {
          const offset = i * trailSpacing;
          const opacity = (1 - i / trailLength) * 0.25;

          return (
            <g
              key={`trail-${i}`}
              className="tail-rotate"
              style={{
                animationDuration: `${animationDuration}s`,
                animationDelay: `${(offset / 360) * animationDuration}s`,
                opacity,
              }}
            >
              {baseAngles.map((angle, j) => {
                const { cx, cy } = getCoordinates(angle);
                return (
                  <circle
                    key={`trail-dot-${i}-${j}`}
                    cx={cx}
                    cy={cy}
                    r={pointRadius}
                    fill="#f0f0f0"
                  />
                );
              })}
            </g>
          );
        })}

        <g
          className="main-rotate"
          style={{ animationDuration: `${animationDuration}s` }}
        >
          {[
            [270, 150],
            [150, 30],
            [30, 270],
          ].map(([start, end], i) => (
            <path
              key={`arc-${i}`}
              d={getCurveThroughCenter(start, end)}
              stroke="#f0f0f0"
              strokeWidth={0.3}
              fill="none"
            />
          ))}

          {baseAngles.map((angle, i) => {
            const { cx, cy } = getCoordinates(angle);
            return (
              <circle
                key={`dot-${i}`}
                cx={cx}
                cy={cy}
                r={pointRadius}
                fill="#f0f0f0"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default React.memo(GeometricSymbol);