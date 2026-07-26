import React, { useState } from "react";

// 에셋(public/icon/{name}.svg)이 아직 없거나 로딩 실패했을 때 보여줄 텍스트 라벨.
// 팀원이 실제 SVG를 넣기 전까지도 앱이 깨지지 않고 동작하도록 하는 폴백.
const FALLBACK_LABEL = {
  switch_on: "ON",
  switch_off: "OFF",
  bulb_on: "💡",
  bulb_off: "⚪",
  clock_up: "CLK▲",
  clock_down: "CLK▼",
  and: "AND",
  or: "OR",
  xor: "XOR",
  not: "NOT",
  nand: "NAND",
  nor: "NOR",
};

const SvgIcon = ({
  name,
  width = 80,
  height = 80,
  className = "",
}) => {
  const [failed, setFailed] = useState(false);

  // 에셋이 없으면 라벨 박스로 대체 렌더 (깨진 이미지 아이콘 방지)
  if (failed) {
    return (
      <span
        role="img"
        aria-label={name}
        style={{ width, height }}
        className={`inline-flex items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-[11px] font-bold text-gray-500 select-none ${className}`}
      >
        {FALLBACK_LABEL[name] ?? name}
      </span>
    );
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}icon/${name}.svg`}
      alt={name}
      width={width}
      height={height}
      draggable={false}
      onError={() => setFailed(true)}
      className={`select-none ${className}`}
    />
  );
};

export default SvgIcon;
