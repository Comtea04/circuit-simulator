import SvgIcon from "./SvgIcon";

const ClockButton = ({
  isPressed = false,
  onClick,
  width = 80,
}) => {
  return (
    <button
      onClick={onClick}
      className="transition-transform duration-100 active:scale-95"
    >
      <SvgIcon
        name={isPressed ? "clock_down" : "clock_up"}
        width={width}
      />
    </button>
  );
};

export default ClockButton;
