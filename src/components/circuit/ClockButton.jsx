import SvgIcon from "./SvgIcon";

const ClockButton = ({
  isPressed = false,
  onClick,
  width = 80,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        transition-all duration-150
        ${isPressed ? "scale-95" : "scale-100 hover:scale-105"}
      `}
    >
      <SvgIcon
        name="clock_button"
        width={width}
        className={`
          transition-all duration-150
          ${isPressed ? "brightness-75" : ""}
        `}
      />
    </button>
  );
};

export default ClockButton;
