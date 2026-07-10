import React from "react";

const SvgIcon = ({
  name,
  width = 80,
  height = 80,
  className = "",
}) => {
  return (
    <img
      src={`/icon/${name}.svg`}
      alt={name}
      width={width}
      height={height}
      draggable={false}
      className={`select-none ${className}`}
    />
  );
};

export default SvgIcon;
