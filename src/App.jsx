import { HashRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro.jsx';
import Stage1_Gates from './pages/Stage1_Gates.jsx';
import Stage2_Latch from './pages/Stage2_Latch.jsx';
import Stage3_DFF from './pages/Stage3_DFF.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import RightPanel from './components/layout/RightPanel.jsx';

export default function App() {
  return (
    <HashRouter>
      {/* h-screen overflow-hidden으로 전체 창 크기 고정 & 고급스러운 다크 배경 적용 */}
      <div className="flex h-screen w-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 select-none">
        {/* 좌: 목차 (사이드바) */}
        <Sidebar />

        {/* 중: 상단 헤더(진도율) + 메인 캔버스 + 우측 개념 패널 */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <Header />
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* 메인 회로 시뮬레이션 캔버스 (영역 내부만 스크롤) */}
            <main className="flex-1 p-8 overflow-auto relative z-0">
              <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/stage1" element={<Stage1_Gates />} />
                <Route path="/stage2" element={<Stage2_Latch />} />
                <Route path="/stage3" element={<Stage3_DFF />} />
              </Routes>
            </main>

            {/* 우측 개념 가이드 및 챗봇 영역 */}
            <RightPanel />
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
