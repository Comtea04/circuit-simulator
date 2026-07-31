import { Link } from 'react-router-dom';
import { CHAPTERS } from '../constant/chapters';

const STAGE_COLORS = [
  'bg-slate-800 text-slate-400',
  'bg-blue-900/30 text-blue-300 border border-blue-500/30',
  'bg-purple-900/30 text-purple-300 border border-purple-500/30',
  'bg-emerald-900/30 text-emerald-300 border border-emerald-500/30',
];

const Intro = () => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* 타이틀 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100">웹 기반 회로 학습 시뮬레이터</h1>
        <p className="text-slate-400 mt-2">
          논리 게이트부터 D Flip-Flop까지, 클릭 한 번으로 0과 1의 흐름을 직접 확인해보세요.
        </p>
      </div>

      {/* 사용 방법 */}
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-200 mb-4">사용 방법</h2>
        <ol className="flex flex-col gap-3 text-sm text-slate-400">
          <li className="flex items-start gap-3">
            <span className="bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">1</span>
            <span className="pt-0.5">왼쪽 사이드바에서 학습할 챕터를 선택합니다.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">2</span>
            <span className="pt-0.5">화면의 <strong className="text-slate-200">스위치</strong>를 클릭해 입력값(0 또는 1)을 바꿉니다.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">3</span>
            <span className="pt-0.5">
              와이어 색이 실시간으로 변합니다.{' '}
              <span className="text-red-400 font-semibold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">빨간색 = 1 (High)</span>,{' '}
              <span className="text-blue-400 font-semibold drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">파란색 = 0 (Low)</span>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0 text-xs font-bold">4</span>
            <span className="pt-0.5">전구가 켜지면 출력이 1, 꺼지면 출력이 0입니다.</span>
          </li>
        </ol>
      </div>

      {/* 챕터 목록 */}
      <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
        <h2 className="text-lg font-bold text-slate-200 mb-4">학습 챕터</h2>
        <div className="flex flex-col gap-3">
          {CHAPTERS.filter((c) => c.id !== 'intro').map((chapter, i) => (
            <Link
              key={chapter.id}
              to={chapter.path}
              className={`rounded-lg px-4 py-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${STAGE_COLORS[i + 1]}`}
            >
              <p className="font-bold text-sm">{chapter.title}</p>
              <p className="text-xs mt-1 opacity-75">{chapter.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Intro;
