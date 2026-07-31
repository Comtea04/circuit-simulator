import { useEffect } from 'react';
import useCircuitStore from '../store/circuitStore';
import Switch from '../components/circuit/Switch';
import LightBulb from '../components/circuit/Lightbulb';
import GateUI from '../components/circuit/GateUI';

const WireH = ({ signal, width = 'w-10' }) => (
  <div className={`h-1 ${width} rounded transition-colors duration-200 ${signal ? 'bg-red-500' : 'bg-blue-400'}`} />
);

const Stage2_Latch = () => {
  // 셀렉터로 필요한 조각만 구독 (전체 store 구독 시 불필요한 리렌더 방지)
  const latchState = useCircuitStore((st) => st.latchState);
  const { s, r } = useCircuitStore((st) => st.latchInput);
  const updateLatch = useCircuitStore((st) => st.updateLatch);
  const resetLatch = useCircuitStore((st) => st.resetLatch);
  const completeStage = useCircuitStore((st) => st.completeStage);

  // 스테이지 진입 시 깨끗한 상태로 시작 → 방문 간 잔상/데스싱크 제거
  useEffect(() => {
    resetLatch();
  }, [resetLatch]);

  const handleToggleS = () => {
    updateLatch(s === 0 ? 1 : 0, r);
    completeStage('stage2');
  };
  const handleToggleR = () => {
    updateLatch(s, r === 0 ? 1 : 0);
    completeStage('stage2');
  };

  const { q, qNot, isError } = latchState;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 에러 배너 */}
      {isError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-3 font-semibold text-sm">
          ⚠️ 금지 상태: S=1, R=1은 허용되지 않습니다. Q와 Q'가 모두 0이 됩니다.
        </div>
      )}

      {/* 회로 다이어그램 */}
      <div className="relative w-full max-w-[700px] h-[360px] mx-auto bg-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* S to NOR 1 Top Input */}
          <path d="M 80 100 L 260 100 L 260 85 L 300 85" stroke={s ? '#ef4444' : '#60a5fa'} strokeWidth="4" fill="none" className="transition-colors duration-200" />
          {/* R to NOR 2 Bottom Input */}
          <path d="M 80 260 L 260 260 L 260 245 L 300 245" stroke={r ? '#ef4444' : '#60a5fa'} strokeWidth="4" fill="none" className="transition-colors duration-200" />
          
          {/* NOR 1 out to Q */}
          <path d="M 390 95 L 610 95" stroke={q===1 ? '#ef4444' : '#60a5fa'} strokeWidth="4" fill="none" className="transition-colors duration-200" />
          {/* NOR 2 out to Q' */}
          <path d="M 390 235 L 610 235" stroke={qNot===1 ? '#ef4444' : '#60a5fa'} strokeWidth="4" fill="none" className="transition-colors duration-200" />

          {/* Feedback Q to NOR 2 Top Input */}
          <path d="M 450 95 L 450 155 L 270 155 L 270 225 L 300 225" stroke={q===1 ? '#ef4444' : '#60a5fa'} strokeWidth="4" fill="none" className="transition-colors duration-200" />
          {/* Feedback Q' to NOR 1 Bottom Input */}
          <path d="M 480 235 L 480 170 L 285 170 L 285 105 L 300 105" stroke={qNot===1 ? '#ef4444' : '#60a5fa'} strokeWidth="4" fill="none" className="transition-colors duration-200" />
          
          {/* Feedback Dots */}
          <circle cx="450" cy="95" r="5" fill={q===1 ? '#ef4444' : '#60a5fa'} className="transition-colors duration-200" />
          <circle cx="480" cy="235" r="5" fill={qNot===1 ? '#ef4444' : '#60a5fa'} className="transition-colors duration-200" />
        </svg>

        {/* S Switch */}
        <div className="absolute left-[30px] top-[60px] flex flex-col items-center gap-1 w-16">
          <span className="text-sm font-bold text-gray-600">S (Set)</span>
          <Switch value={s} onToggle={handleToggleS} />
          <span className={`text-xs font-mono font-bold ${s ? 'text-red-500' : 'text-blue-500'}`}>{s}</span>
        </div>

        {/* R Switch */}
        <div className="absolute left-[30px] top-[220px] flex flex-col items-center gap-1 w-16">
          <span className="text-sm font-bold text-gray-600">R (Reset)</span>
          <Switch value={r} onToggle={handleToggleR} />
          <span className={`text-xs font-mono font-bold ${r ? 'text-red-500' : 'text-blue-500'}`}>{r}</span>
        </div>

        {/* NOR 1 */}
        <div className="absolute left-[300px] top-[60px] flex flex-col items-center">
          <GateUI type="NOR" width={90} height={65} />
          <span className="text-xs text-gray-400 mt-1">NOR 1</span>
        </div>

        {/* NOR 2 */}
        <div className="absolute left-[300px] top-[200px] flex flex-col items-center">
          <GateUI type="NOR" width={90} height={65} />
          <span className="text-xs text-gray-400 mt-1">NOR 2</span>
        </div>

        {/* Q LightBulb */}
        <div className="absolute left-[610px] top-[40px] flex flex-col items-center gap-1 w-12">
          <span className="text-sm font-bold text-gray-600">Q</span>
          <LightBulb isOn={q === 1} />
          <span className={`text-xs font-mono font-bold ${q ? 'text-red-500' : 'text-blue-500'}`}>{q}</span>
        </div>

        {/* Q' LightBulb */}
        <div className="absolute left-[610px] top-[180px] flex flex-col items-center gap-1 w-12">
          <span className="text-sm font-bold text-gray-600">Q'</span>
          <LightBulb isOn={qNot === 1} />
          <span className={`text-xs font-mono font-bold ${qNot ? 'text-red-500' : 'text-blue-500'}`}>{qNot}</span>
        </div>
      </div>

      {/* 상태 테이블 */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h3 className="font-bold text-gray-700 mb-3">SR Latch 진리표</h3>
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-[#363636]">S</th>
              <th className="border border-gray-200 px-4 py-2 text-[#363636]">R</th>
              <th className="border border-gray-200 px-4 py-2 text-[#363636]">Q</th>
              <th className="border border-gray-200 px-4 py-2 text-[#363636]">Q'</th>
              <th className="border border-gray-200 px-4 py-2 text-[#363636]">상태</th>
            </tr>
          </thead>
          <tbody>
            {[
              { s: 0, r: 0, q: '유지', qn: '유지', label: '기억 (Hold)', highlight: s === 0 && r === 0 },
              { s: 1, r: 0, q: 1,    qn: 0,      label: 'Set',          highlight: s === 1 && r === 0 },
              { s: 0, r: 1, q: 0,    qn: 1,      label: 'Reset',        highlight: s === 0 && r === 1 },
              { s: 1, r: 1, q: '?',  qn: '?',    label: '⚠️ 금지',      highlight: s === 1 && r === 1 },
            ].map((row, i) => (
              <tr key={i} className={row.highlight ? 'bg-yellow-50 font-semibold' : ''}>
                <td className="border border-gray-200 px-4 py-2 text-[#363636]">{row.s}</td>
                <td className="border border-gray-200 px-4 py-2 text-[#363636]">{row.r}</td>
                <td className="border border-gray-200 px-4 py-2 text-[#363636]">{String(row.q)}</td>
                <td className="border border-gray-200 px-4 py-2 text-[#363636]">{String(row.qn)}</td>
                <td className="border border-gray-200 px-4 py-2 text-[#363636]">{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stage2_Latch;
