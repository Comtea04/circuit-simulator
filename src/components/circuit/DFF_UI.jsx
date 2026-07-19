import Wire from "./Wire";
import LightBulb from "./LightBulb";
import NotGate from "./gates/NotGate";
import NandGate from "./gates/NandGate";

const DFF_UI = () => {
  return (
    <div className="relative w-[900px] h-[520px] bg-white border rounded-lg">

      {/* ---------------- Input Labels ---------------- */}

      <div className="absolute left-[10px] top-[55px] font-bold">D</div>
      <div className="absolute left-[10px] top-[245px] font-bold">Clock</div>

      {/* ---------------- Gates ---------------- */}

      {/* NOT */}
      <div className="absolute left-[120px] top-[220px]">
        <NotGate width={80} />
      </div>

      {/* Input NAND */}
      <div className="absolute left-[260px] top-[30px]">
        <NandGate />
      </div>

      {/* Input NAND */}
      <div className="absolute left-[260px] top-[220px]">
        <NandGate />
      </div>

      {/* SR Latch */}
      <div className="absolute left-[570px] top-[30px]">
        <NandGate />
      </div>

      <div className="absolute left-[570px] top-[220px]">
        <NandGate />
      </div>

      {/* ---------------- Input Wires ---------------- */}

      <Wire
        signal={0}
        points={[
          [30, 65],
          [260, 65],
        ]}
      />

      <Wire
        signal={0}
        points={[
          [30, 65],
          [90, 65],
          [90, 260],
          [120, 260],
        ]}
      />

      <Wire
        signal={0}
        points={[
          [30, 255],
          [260, 255],
          [260, 120],
        ]}
      />

      <Wire
        signal={0}
        points={[
          [30, 255],
          [260, 255],
        ]}
      />

      {/* NOT → NAND */}
      <Wire
        signal={0}
        points={[
          [200, 260],
          [260, 260],
        ]}
      />

      {/* ---------------- S / R ---------------- */}

      <Wire
        signal={0}
        points={[
          [380, 90],
          [570, 90],
        ]}
      />

      <Wire
        signal={0}
        points={[
          [380, 280],
          [570, 280],
        ]}
      />

      {/* ---------------- Cross Feedback ---------------- */}

      <Wire
        signal={0}
        points={[
          [690, 90],
          [730, 90],
          [730, 310],
          [570, 310],
        ]}
      />

      <Wire
        signal={0}
        points={[
          [690, 280],
          [710, 280],
          [710, 120],
          [570, 120],
        ]}
      />

      {/* ---------------- Outputs ---------------- */}

      <Wire
        signal={0}
        points={[
          [690, 90],
          [800, 90],
        ]}
      />

      <Wire
        signal={0}
        points={[
          [690, 280],
          [800, 280],
        ]}
      />

      <div className="absolute left-[800px] top-[55px] flex items-center gap-2">
        <span>Q</span>
        <LightBulb isOn={false} />
      </div>

      <div className="absolute left-[800px] top-[245px] flex items-center gap-2">
        <span>Q'</span>
        <LightBulb isOn={false} />
      </div>

      {/* ---------------- Labels ---------------- */}

      <div className="absolute left-[520px] top-[70px] text-sm">S</div>

      <div className="absolute left-[520px] top-[260px] text-sm">R</div>

      <div className="absolute left-[610px] top-[175px] text-xs text-gray-400">
        SR Latch
      </div>

    </div>
  );
};

export default DFF_UI;
