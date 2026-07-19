import { useEffect, useState } from 'react';
import useCircuitStore from '../store/circuitStore';
import useClock from '../hooks/useClock';
import Switch from '../components/circuit/Switch';
import LightBulb from '../components/circuit/Lightbulb';
import ClockButton from '../components/circuit/ClockButton';
import DFF_UI from '../components/circuit/DFF_UI';
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

  // 스토어(두뇌)에서 DFF 상태와 액션을 가져온다
  const { d, clk, q, edgeCount } = useCircuitStore((s) => s.dffState);
  const setDFFInput = useCircuitStore((s) => s.setDFFInput);
  const setClk = useCircuitStore((s) => s.setClk);
  const resetDFF = useCircuitStore((s) => s.resetDFF);

  // 자동 클럭 on/off
  const [auto, setAuto] = useState(false);
  useClock(auto, 1000);

  // 상승 엣지 애니메이션: edgeCount가 늘어날 때마다 잠깐 번쩍인다
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (edgeCount === 0) return undefined;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 500);
    return () => clearTimeout(t);
  }, [edgeCount]);

  // D는 클럭 엣지가 아니면 Q를 못 바꾼다(잠금). 스토어가 이를 보장한다.
  const handleToggleD = () => setDFFInput(d === 0 ? 1 : 0);

  // 수동 클럭 펄스: 누를 때 1(상승 엣지 → 저장), 뗄 때 0. 자동 클럭 중엔 무시.
  const pressClk = () => !auto && setClk(1);
  const releaseClk = () => !auto && clk === 1 && setClk(0);

  // 잠금 시각화: 클럭 유지 상태에서 D와 Q가 다르면 "값이 잠겨 대기 중"
  const isLocked = d !== q;

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
      {flash && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 rounded-lg px-4 py-3 font-semibold text-sm animate-pulse">
          ⚡ 상승 엣지 감지 (CLK: 0 → 1) — D={d} 값이 Q에 저장되었습니다!
        </div>
      )}

      {/* 인터랙티브 회로 다이어그램 */}
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
              {/* ClockButton은 onClick만 노출하므로, 래퍼 div의 마우스 이벤트로
                  누를 때 1 / 뗄 때 0 펄스를 만든다 (이벤트 버블링 활용) */}
              <div
                className={`inline-block ${auto ? 'opacity-40 pointer-events-none' : 'cursor-pointer'}`}
                onMouseDown={pressClk}
                onMouseUp={releaseClk}
                onMouseLeave={releaseClk}
              >
                <ClockButton isPressed={clk === 1} width={70} />
              </div>
              <span className={`text-xs font-mono font-bold ${clk ? 'text-red-500' : 'text-blue-500'}`}>{clk}</span>
            </div>
          </div>

          {/* 입력 와이어 */}
          <div className="flex flex-col gap-10">
            <WireH signal={d} />
            <WireH signal={clk} width="w-10" />
          </div>

          {/* DFF 박스 (엣지 순간 강조) */}
          <div
            className={`flex flex-col items-center justify-center border-2 rounded-lg w-28 h-32 transition-colors duration-200 ${
              flash ? 'border-green-500 bg-green-50 shadow-lg shadow-green-200' : 'border-gray-400 bg-gray-50'
            }`}
          >
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

        {/* 컨트롤 바: 자동 클럭 토글 + 초기화 */}
        <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
          <label className="flex items-center gap-3 select-none cursor-pointer">
            <span className="font-bold text-gray-600">자동 클럭 (Auto Clock)</span>
            <button
              type="button"
              onClick={() => setAuto((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${auto ? 'bg-green-500' : 'bg-gray-300'}`}
              aria-pressed={auto}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${auto ? 'translate-x-5' : ''}`}
              />
            </button>
            <span className={`text-xs ${auto ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
              {auto ? '1초마다 0↔1 반복 중' : '수동 버튼 모드 (누를 때 1, 뗄 때 0)'}
            </span>
          </label>

          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono ${isLocked ? 'text-amber-600' : 'text-gray-400'}`}>
              {isLocked ? '🔒 D≠Q : 다음 상승 엣지에서 저장 대기' : '✅ D=Q : 저장 완료'}
            </span>
            <button
              type="button"
              onClick={resetDFF}
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold"
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 동작 설명 카드 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-sm">
          <p className="font-bold text-gray-700 mb-1">CLK = 0일 때</p>
          <p className="text-gray-500">D 값이 바뀌어도 Q는 변하지 않습니다. 이전 상태를 유지합니다.</p>
        </div>
        <div className={`rounded-xl shadow p-4 text-sm border-2 ${flash ? 'border-green-400 bg-green-50' : 'bg-white border-transparent'}`}>
          <p className="font-bold text-gray-700 mb-1">CLK: 0 → 1 (상승 엣지)</p>
          <p className="text-gray-500">이 순간에만 D 값이 Q로 전달됩니다. 엣지 트리거링의 핵심입니다.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-sm">
          <p className="font-bold text-gray-700 mb-1">CLK = 1일 때</p>
          <p className="text-gray-500">상승 엣지 이후 CLK가 1인 동안에도 Q는 바뀌지 않습니다.</p>
        </div>
      </div>

      {/* DFF 내부 구조도 (동료의 DFF_UI — NAND 게이트 6개로 구성) */}
      <div className="mt-6 bg-white rounded-xl shadow p-5">
        <h3 className="font-bold text-gray-700 mb-3">DFF 내부 구조 (NAND 게이트 구성)</h3>
        <p className="text-gray-500 text-sm mb-4">
          위의 &quot;D Flip-Flop&quot; 블록 하나는 사실 아래처럼 NAND 게이트들로 만들어집니다.
        </p>
        <div className="overflow-x-auto">
          <div
            className={`inline-block rounded-lg transition-shadow duration-200 ${
              flash ? 'ring-4 ring-green-400 shadow-lg shadow-green-200' : 'ring-1 ring-gray-100'
            }`}
          >
            <DFF_UI />
          </div>
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
            <tr className={flash && d === 0 ? 'bg-yellow-50 font-semibold' : ''}>
              <td className="border border-gray-200 px-4 py-2">↑ 상승 엣지</td>
              <td className="border border-gray-200 px-4 py-2">0</td>
              <td className="border border-gray-200 px-4 py-2">0</td>
            </tr>
            <tr className={flash && d === 1 ? 'bg-yellow-50 font-semibold' : ''}>
              <td className="border border-gray-200 px-4 py-2">↑ 상승 엣지</td>
              <td className="border border-gray-200 px-4 py-2">1</td>
              <td className="border border-gray-200 px-4 py-2">1</td>
            </tr>
            <tr className={!flash ? 'bg-yellow-50 font-semibold' : ''}>
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
