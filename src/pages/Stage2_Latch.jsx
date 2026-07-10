import { useState } from 'react';
import useCircuitStore from '../store/circuitStore';
import Switch from '../components/circuit/Switch';
import LightBulb from '../components/circuit/Lightbulb';
import GateUI from '../components/circuit/GateUI';
import { getChapter } from '../constant/chapters';

const WireH = ({ signal, width = 'w-10' }) => (
  <div className={`h-1 ${width} rounded transition-colors duration-200 ${signal ? 'bg-red-500' : 'bg-blue-400'}`} />
);

const Stage2_Latch = () => {
  const chapter = getChapter('stage2');
  const { latchState, updateLatch } = useCircuitStore();
  const [s, setS] = useState(0);
  const [r, setR] = useState(0);

  const handleToggleS = () => {
    const next = s === 0 ? 1 : 0;
    setS(next);
    updateLatch(next, r);
  };

  const handleToggleR = () => {
    const next = r === 0 ? 1 : 0;
    setR(next);
    updateLatch(s, next);
  };

  const { q, qNot, isError } = latchState;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{chapter.title}</h1>
        <p className="text-gray-500 mt-1">{chapter.description}</p>
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-700 text-sm">
          {chapter.goal}
        </div>
      </div>

      {/* 에러 배너 */}
      {isError && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-3 font-semibold text-sm">
          ⚠️ 금지 상태: S=1, R=1은 허용되지 않습니다. Q와 Q'가 모두 0이 됩니다.
        </div>
      )}

      {/* 회로 다이어그램 */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between gap-4">

          {/* 입력 스위치 */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-gray-600">S (Set)</span>
              <Switch value={s} onToggle={handleToggleS} />
              <span className={`text-xs font-mono font-bold ${s ? 'text-red-500' : 'text-blue-500'}`}>{s}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-gray-600">R (Reset)</span>
              <Switch value={r} onToggle={handleToggleR} />
              <span className={`text-xs font-mono font-bold ${r ? 'text-red-500' : 'text-blue-500'}`}>{r}</span>
            </div>
          </div>

          {/* 입력 → 게이트 와이어 */}
          <div className="flex flex-col gap-12">
            <WireH signal={s} />
            <WireH signal={r} />
          </div>

          {/* NOR 게이트 2개 */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1">
              <GateUI type="NOR" width={90} height={65} />
              <span className="text-xs text-gray-400">NOR 1</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <GateUI type="NOR" width={90} height={65} />
              <span className="text-xs text-gray-400">NOR 2</span>
            </div>
          </div>

          {/* 피드백 표시 */}
          <div className="flex flex-col items-center gap-2 text-xs text-gray-400">
            <div className="border-l-2 border-dashed border-gray-300 h-16" />
            <span>피드백</span>
            <div className="border-l-2 border-dashed border-gray-300 h-16" />
          </div>

          {/* 게이트 → 출력 와이어 */}
          <div className="flex flex-col gap-12">
            <WireH signal={q} />
            <WireH signal={qNot} />
          </div>

          {/* 출력 전구 */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-gray-600">Q</span>
              <LightBulb isOn={q === 1} />
              <span className={`text-xs font-mono font-bold ${q ? 'text-red-500' : 'text-blue-500'}`}>{q}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-gray-600">Q'</span>
              <LightBulb isOn={qNot === 1} />
              <span className={`text-xs font-mono font-bold ${qNot ? 'text-red-500' : 'text-blue-500'}`}>{qNot}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 상태 테이블 */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h3 className="font-bold text-gray-700 mb-3">SR Latch 진리표</h3>
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">S</th>
              <th className="border border-gray-200 px-4 py-2">R</th>
              <th className="border border-gray-200 px-4 py-2">Q</th>
              <th className="border border-gray-200 px-4 py-2">Q'</th>
              <th className="border border-gray-200 px-4 py-2">상태</th>
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
                <td className="border border-gray-200 px-4 py-2">{row.s}</td>
                <td className="border border-gray-200 px-4 py-2">{row.r}</td>
                <td className="border border-gray-200 px-4 py-2">{String(row.q)}</td>
                <td className="border border-gray-200 px-4 py-2">{String(row.qn)}</td>
                <td className="border border-gray-200 px-4 py-2 text-gray-500">{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stage2_Latch;
