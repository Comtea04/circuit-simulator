import SvgIcon from "../SvgIcon";

const SvgGate = ({
  icon,
  width = 120,
  height = 80,
}) => {
  return (
    <SvgIcon
      name={icon}
      width={width}
      height={height}
    />
  );
};

export default SvgGate;
