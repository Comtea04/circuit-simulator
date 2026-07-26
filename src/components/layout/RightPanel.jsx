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
    <aside className="w-72 shrink-0 bg-white border-l border-gray-200 p-6 flex flex-col gap-5 overflow-y-auto">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">개념 설명</span>
        <h3 className="text-base font-bold text-gray-800 mt-1">{chapter.title}</h3>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{chapter.description}</p>
      </div>

      {chapter.concept && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs font-bold text-gray-500 mb-1">핵심 개념</p>
          <p className="text-sm text-gray-600 leading-relaxed">{chapter.concept}</p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
        <p className="text-xs font-bold text-blue-700 mb-1">🎯 실습 목표</p>
        <p className="text-sm text-blue-700 leading-relaxed">{chapter.goal}</p>
      </div>

      <div className="mt-auto pt-2">
        <ChatBot />
      </div>
    </aside>
  );
};

export default RightPanel;
