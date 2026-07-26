import { useLocation } from 'react-router-dom';
import useCircuitStore, { selectProgressPercent } from '../../store/circuitStore';
import { getChapterByPath } from '../../constant/chapters';

// 상단 헤더: 현재 학습 중인 회로 이름 + 학습 진도율.
// 진도율 값(store.progress)은 역할 B(로직)가 제공하고, 여기 바 UI는 역할 A가 자유롭게 다듬으면 됨.
const Header = () => {
  const { pathname } = useLocation();
  const chapter = getChapterByPath(pathname);
  const percent = useCircuitStore(selectProgressPercent);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
      <h2 className="text-lg font-bold text-gray-800">
        {chapter ? chapter.title : '회로 시뮬레이터'}
      </h2>

      <div className="flex items-center gap-3 w-64">
        <span className="text-xs text-gray-500 shrink-0">학습 진도율</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs font-bold text-gray-700 w-9 text-right shrink-0">{percent}%</span>
      </div>
    </header>
  );
};

export default Header;
