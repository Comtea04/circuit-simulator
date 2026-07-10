import React from "react";

const Wire = ({
  signal = 0,
  points = [
    [0, 0],
    [100, 0],
  ],
  strokeWidth = 4,
}) => {
  // [[0,0],[100,0]] -> "0,0 100,0"
  const pointString = points
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
    >
      <polyline
        points={pointString}
        fill="none"
        stroke={signal ? "#ef4444" : "#3b82f6"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Wire;
