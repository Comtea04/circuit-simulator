import SvgIcon from "./SvgIcon";

const LightBulb = ({ isOn }) => {
  return (
    <div className={`transition-all duration-300 ${isOn ? 'drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'drop-shadow-none opacity-50'}`}>
      <SvgIcon
        name={isOn ? "bulb_on" : "bulb_off"}
        width={70}
      />
    </div>
  );
};

export default LightBulb;
