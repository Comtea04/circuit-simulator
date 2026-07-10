import useCircuit from '../hooks/useCircuit';
import Switch from '../components/circuit/Switch';
import LightBulb from '../components/circuit/Lightbulb';
import GateUI from '../components/circuit/GateUI';
import { getChapter } from '../constant/chapters';

const GATES = ['AND', 'OR', 'XOR', 'NOT', 'NAND', 'NOR'];

const WireSegment = ({ signal }) => (
  <div
    className={`h-1 w-10 rounded transition-colors duration-200 ${
      signal ? 'bg-red-500' : 'bg-blue-400'
    }`}
  />
);

const GateCard = ({ type }) => {
  const inputCount = type === 'NOT' ? 1 : 2;
  const { inputs, toggleInput, output } = useCircuit(type, Array(inputCount).fill(0));

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-4">
      <h2 className="text-base font-bold text-gray-700">{type} 게이트</h2>

      <div className="flex items-center gap-2">
        {/* 입력 스위치 + 와이어 */}
        <div className="flex flex-col gap-3">
          {inputs.map((val, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-xs text-gray-400 w-3">{String.fromCharCode(65 + i)}</span>
              <Switch value={val} onToggle={() => toggleInput(i)} />
              <WireSegment signal={val} />
            </div>
          ))}
        </div>

        {/* 게이트 아이콘 */}
        <GateUI type={type} width={90} height={65} />

        {/* 출력 와이어 + 전구 */}
        <WireSegment signal={output} />
        <LightBulb isOn={output === 1} />
      </div>

      <p className="text-sm text-gray-400">
        입력 [{inputs.join(', ')}] →{' '}
        <span className={`font-bold ${output ? 'text-red-500' : 'text-blue-500'}`}>
          출력 {output}
        </span>
      </p>
    </div>
  );
};

const Stage1_Gates = () => {
  const chapter = getChapter('stage1');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{chapter.title}</h1>
        <p className="text-gray-500 mt-1">{chapter.description}</p>
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-700 text-sm">
          {chapter.goal}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {GATES.map((type) => (
          <GateCard key={type} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Stage1_Gates;
