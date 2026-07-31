import SvgIcon from "./SvgIcon";

const LightBulb = ({ isOn }) => {
  return (
    <SvgIcon
      name={isOn ? "bulb_on" : "bulb_off"}
      width={70}
    />
  );
};

export default LightBulb;
