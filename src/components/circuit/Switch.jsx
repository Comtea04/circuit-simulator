import SvgIcon from "./SvgIcon";

const Switch = ({ value, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className={`transition-all duration-300 hover:scale-110 active:scale-95 ${value ? 'drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'drop-shadow-none opacity-80'}`}
    >
      <SvgIcon
        name={value ? "switch_on" : "switch_off"}
        width={70}
      />
    </button>
  );
};

export default Switch;
