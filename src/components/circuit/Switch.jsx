import SvgIcon from "./SvgIcon";

const Switch = ({ value, onToggle }) => {
  return (
    <button onClick={onToggle}>
      <SvgIcon
        name={value ? "switch_on" : "switch_off"}
        width={70}
      />
    </button>
  );
};

export default Switch;
