import { useState } from 'react';
import useCircuitStore from '../store/circuitStore';
import Switch from '../components/circuit/Switch';
import LightBulb from '../components/circuit/Lightbulb';
import { getChapter } from '../constant/chapters';

const WireH = ({ signal, width = 'w-10' }) => (
  <div
    className={`h-1 ${width} rounded transition-colors duration-200 ${
      signal ? 'bg-red-500' : 'bg-blue-400'
    }`}
  />
);

const Stage3_DFF = () => {
  const chapter = getChapter('stage3');
  const { dffState, updateDFF } = useCircuitStore();
  const [d, setD] = useState(0);
  const [clk, setClk] = useState(0);

  const handleToggleD = () => {
    const next = d === 0 ? 1 : 0;
    setD(next);
    updateDFF(next, clk);
  };

  const handleToggleClk = () => {
    const next = clk === 0 ? 1 : 0;
    setClk(next);
    updateDFF(d, next);
  };

  const { q, prevClk } = dffState;
  const isRisingEdge = prevClk === 0 && clk === 1;

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

      {/* 상승 엣지 감지 배너 */}
      {isRisingEdge && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg px-4 py-3 font-semibold text-sm">
          ⚡ 상승 엣지 감지 (CLK: 0 → 1) — D={d} 값이 Q에 저장되었습니다!
        </div>
      )}

      {/* 회로 다이어그램 */}
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between gap-4">

          {/* 입력 */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-gray-600">D (Data)</span>
              <Switch value={d} onToggle={handleToggleD} />
              <span className={`text-xs font-mono font-bold ${d ? 'text-red-500' : 'text-blue-500'}`}>{d}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-bold text-gray-600">CLK</span>
              <Switch value={clk} onToggle={handleToggleClk} />
              <span className={`text-xs font-mono font-bold ${clk ? 'text-red-500' : 'text-blue-500'}`}>{clk}</span>
            </div>
          </div>

          {/* 입력 와이어 */}
          <div className="flex flex-col gap-10">
            <WireH signal={d} />
            <WireH signal={clk} width="w-10" />
          </div>

          {/* DFF 박스 */}
          <div className="flex flex-col items-center justify-center border-2 border-gray-400 rounded-lg w-28 h-32 bg-gray-50">
            <span className="text-xs text-gray-400 mb-1">D Flip-Flop</span>
            <div className="flex flex-col items-start gap-2 text-xs text-gray-500 px-3">
              <span>D ─────┐</span>
              <span className="ml-2">│ &gt; Q</span>
              <span>CLK ──&gt;┘</span>
            </div>
          </div>

          {/* 출력 와이어 */}
          <WireH signal={q} />

          {/* 출력 */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold text-gray-600">Q</span>
            <LightBulb isOn={q === 1} />
            <span className={`text-xs font-mono font-bold ${q ? 'text-red-500' : 'text-blue-500'}`}>{q}</span>
          </div>
        </div>
      </div>

      {/* 동작 설명 카드 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-sm">
          <p className="font-bold text-gray-700 mb-1">CLK = 0일 때</p>
          <p className="text-gray-500">D 값이 바뀌어도 Q는 변하지 않습니다. 이전 상태를 유지합니다.</p>
        </div>
        <div className={`rounded-xl shadow p-4 text-sm border-2 ${isRisingEdge ? 'border-green-400 bg-green-50' : 'bg-white border-transparent'}`}>
          <p className="font-bold text-gray-700 mb-1">CLK: 0 → 1 (상승 엣지)</p>
          <p className="text-gray-500">이 순간에만 D 값이 Q로 전달됩니다. 엣지 트리거링의 핵심입니다.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-sm">
          <p className="font-bold text-gray-700 mb-1">CLK = 1일 때</p>
          <p className="text-gray-500">상승 엣지 이후 CLK가 1인 동안에도 Q는 바뀌지 않습니다.</p>
        </div>
      </div>

      {/* 진리표 */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h3 className="font-bold text-gray-700 mb-3">D Flip-Flop 동작표</h3>
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">CLK 엣지</th>
              <th className="border border-gray-200 px-4 py-2">D</th>
              <th className="border border-gray-200 px-4 py-2">Q (다음)</th>
            </tr>
          </thead>
          <tbody>
            <tr className={isRisingEdge && d === 0 ? 'bg-yellow-50 font-semibold' : ''}>
              <td className="border border-gray-200 px-4 py-2">↑ 상승 엣지</td>
              <td className="border border-gray-200 px-4 py-2">0</td>
              <td className="border border-gray-200 px-4 py-2">0</td>
            </tr>
            <tr className={isRisingEdge && d === 1 ? 'bg-yellow-50 font-semibold' : ''}>
              <td className="border border-gray-200 px-4 py-2">↑ 상승 엣지</td>
              <td className="border border-gray-200 px-4 py-2">1</td>
              <td className="border border-gray-200 px-4 py-2">1</td>
            </tr>
            <tr className={!isRisingEdge ? 'bg-yellow-50 font-semibold' : ''}>
              <td className="border border-gray-200 px-4 py-2">그 외 (0, 1, 하강)</td>
              <td className="border border-gray-200 px-4 py-2">X</td>
              <td className="border border-gray-200 px-4 py-2">Q 유지</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stage3_DFF;
