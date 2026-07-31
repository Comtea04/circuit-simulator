import { useLocation } from 'react-router-dom';
import useCircuitStore, { selectProgressPercent } from '../../store/circuitStore';
import { getChapterByPath } from '../../constant/chapters';

// 상단 헤더: 현재 학습 중인 회로 이름 + 학습 진도율.
const Header = () => {
  const { pathname } = useLocation();
  const chapter = getChapterByPath(pathname);
  const percent = useCircuitStore(selectProgressPercent);

  return (
    <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between shrink-0 shadow-md relative z-10">
      {/* 1. 현재 회로 타이틀 (아이콘 + 텍스트) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
          ⚡
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block -mb-0.5">
            Current Stage
          </span>
          <h2 className="text-base font-bold text-slate-100">
            {chapter ? chapter.title : '회로 시뮬레이터'}
          </h2>
        </div>
      </div>

      {/* 2. 진도율 바 UI */}
      <div className="flex items-center gap-3.5 w-72 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
        <span className="text-xs font-medium text-slate-400 shrink-0">학습 진도율</span>
        
        {/* 프로그래스 바 트랙 */}
        <div className="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          {/* 채워지는 바 (percent 연동) */}
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* 수치 표시 */}
        <span className="text-xs font-bold text-emerald-400 w-9 text-right shrink-0">
          {percent}%
        </span>
      </div>
    </header>
  );
};

export default Header;
