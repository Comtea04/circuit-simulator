import Wire from "./Wire";
import LightBulb from "./Lightbulb";
import NotGate from "./gates/NotGate";
import NandGate from "./gates/NandGate";

const DFF_UI = () => {
  return (
    <div className="relative w-[900px] h-[520px] bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-lg text-slate-300">

      {/* ---------------- Input Labels ---------------- */}
      <div className="absolute left-[10px] top-[40px] font-bold text-slate-100">D</div>
      <div className="absolute left-[10px] top-[230px] font-bold text-slate-100">Clock</div>

      {/* ---------------- Gates ---------------- */}
      {/* NOT Gate */}
      <div className="absolute left-[120px] top-[240px]">
        <NotGate width={80} />
      </div>

      {/* Input NAND 1 (Top) */}
      <div className="absolute left-[260px] top-[30px]">
        <NandGate />
      </div>

      {/* Input NAND 2 (Bot) */}
      <div className="absolute left-[260px] top-[220px]">
        <NandGate />
      </div>

      {/* SR Latch NAND 3 (Top) */}
      <div className="absolute left-[570px] top-[30px]">
        <NandGate />
      </div>

      {/* SR Latch NAND 4 (Bot) */}
      <div className="absolute left-[570px] top-[220px]">
        <NandGate />
      </div>

      {/* ---------------- Input Wires ---------------- */}
      {/* D to NAND 1 */}
      <Wire
        signal={0}
        points={[
          [30, 50],
          [260, 50],
        ]}
      />

      {/* D to NOT */}
      <Wire
        signal={0}
        points={[
          [90, 50],
          [90, 280],
          [120, 280],
        ]}
      />

      {/* Clock to NAND 2 */}
      <Wire
        signal={0}
        points={[
          [30, 240],
          [260, 240],
        ]}
      />

      {/* Clock to NAND 1 */}
      <Wire
        signal={0}
        points={[
          [220, 240],
          [220, 90],
          [260, 90],
        ]}
      />

      {/* NOT output to NAND 2 */}
      <Wire
        signal={0}
        points={[
          [200, 280],
          [260, 280],
        ]}
      />

      {/* ---------------- S / R ---------------- */}
      {/* NAND 1 to NAND 3 (S) */}
      <Wire
        signal={0}
        points={[
          [380, 70],
          [450, 70],
          [450, 50],
          [570, 50],
        ]}
      />

      {/* NAND 2 to NAND 4 (R) */}
      <Wire
        signal={0}
        points={[
          [380, 260],
          [450, 260],
          [450, 280],
          [570, 280],
        ]}
      />

      {/* ---------------- Cross Feedback ---------------- */}
      {/* NAND 4 Output to NAND 3 Bot Input */}
      <Wire
        signal={0}
        points={[
          [690, 260],
          [720, 260],
          [720, 120],
          [550, 120],
          [550, 90],
          [570, 90],
        ]}
      />

      {/* NAND 3 Output to NAND 4 Top Input */}
      <Wire
        signal={0}
        points={[
          [690, 70],
          [740, 70],
          [740, 210],
          [530, 210],
          [530, 240],
          [570, 240],
        ]}
      />

      {/* ---------------- Outputs ---------------- */}
      {/* Q */}
      <Wire
        signal={0}
        points={[
          [690, 70],
          [800, 70],
        ]}
      />

      {/* Q' */}
      <Wire
        signal={0}
        points={[
          [690, 260],
          [800, 260],
        ]}
      />

      <div className="absolute left-[800px] top-[40px] flex items-center gap-2">
        <span className="font-bold text-slate-100">Q</span>
        <LightBulb isOn={false} />
      </div>

      <div className="absolute left-[800px] top-[230px] flex items-center gap-2">
        <span className="font-bold text-slate-100">Q'</span>
        <LightBulb isOn={false} />
      </div>

      {/* ---------------- Labels ---------------- */}
      <div className="absolute left-[500px] top-[40px] text-sm text-slate-400">S</div>
      <div className="absolute left-[500px] top-[270px] text-sm text-slate-400">R</div>

      <div className="absolute left-[625px] top-[155px] text-xs font-bold text-slate-500 uppercase tracking-widest">
        SR Latch
      </div>

    </div>
  );
};

export default DFF_UI;
