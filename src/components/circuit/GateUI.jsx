import React from "react";

import AndGate from "./gates/AndGate";
import OrGate from "./gates/OrGate";
import XorGate from "./gates/XorGate";
import NorGate from "./gates/Nor";
import NandGate from "./gates/NandGate";
import NotGate from "./gates/NotGate";

const GateUI = ({ type, ...props }) => {
  switch (type.toUpperCase()) {
    case "AND":
      return <AndGate {...props} />;

    case "OR":
      return <OrGate {...props} />;

    case "XOR":
      return <XorGate {...props} />;

    case "NOR":
      return <NorGate {...props} />;

    case "NAND":
      return <NandGate {...props} />;

    case "NOT":
      return <NotGate {...props} />;

    default:
      return (
        <div className="text-red-500 font-semibold">
          Unknown Gate: {type}
        </div>
      );
  }
};

export default GateUI;
