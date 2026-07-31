import { useLocation } from 'react-router-dom';
import { getChapterByPath } from '../../constant/chapters';
import ChatBot from '../ui/ChatBot';

// 우측 패널: 현재 챕터의 개념 설명(동적 렌더) + AI 챗봇 버튼.
// 소개(/) 페이지에서는 숨긴다.
const RightPanel = () => {
  const { pathname } = useLocation();
  const chapter = getChapterByPath(pathname);

  if (!chapter || chapter.id === 'intro') return null;

  return (
    <aside className="w-72 shrink-0 bg-slate-900/50 backdrop-blur-sm border-l border-slate-800 p-6 flex flex-col gap-5 overflow-y-auto">
      <div>
        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">개념 설명</span>
        <h3 className="text-base font-bold text-slate-100 mt-1">{chapter.title}</h3>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{chapter.description}</p>
      </div>

      {chapter.concept && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-300 mb-1">핵심 개념</p>
          <p className="text-sm text-slate-400 leading-relaxed">{chapter.concept}</p>
        </div>
      )}

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <p className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1">
          <span>🎯</span> 실습 목표
        </p>
        <p className="text-sm text-blue-300/90 leading-relaxed">{chapter.goal}</p>
      </div>

      <div className="mt-auto pt-2">
        <ChatBot />
      </div>
    </aside>
  );
};

export default RightPanel;
