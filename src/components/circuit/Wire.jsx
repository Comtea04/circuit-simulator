import React from "react";

const Wire = ({
  signal = 0,
  points = [
    [0, 0],
    [100, 0],
  ],
}) => {
  // [[0,0],[100,0]] -> "0,0 100,0"
  const pointString = points
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  const isHigh = Boolean(signal);

  return (
    <>
      {/* 1. 글로벌 키프레임 스타일 (CSS 파일에 따로 안 넣어도 바로 동작하게 포함) */}
      <style>{`
        @keyframes wire-flow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-wire-flow {
          animation: wire-flow 0.6s linear infinite;
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {/* 바탕 기본 와이어 (0=파랑, 1=빨강 바탕) */}
        <polyline
          points={pointString}
          fill="none"
          stroke={isHigh ? "#ef4444" : "#3b82f6"}
          strokeWidth={isHigh ? 4 : 2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-200"
        />

        {/* 신호 1 (HIGH)일 때 위에 겹쳐서 흐르는 점선 애니메이션 효과 */}
        {isHigh && (
          <polyline
            points={pointString}
            fill="none"
            stroke="#fef08a" /* 연한 노란색/하얀색 빛으로 전류 느낌 전달 */
            strokeWidth={2}
            strokeDasharray="6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-wire-flow opacity-90"
          />
        )}
      </svg>
    </>
  );
};

export default Wire;
