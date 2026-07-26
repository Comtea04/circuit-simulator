import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro.jsx';
import Stage1_Gates from './pages/Stage1_Gates.jsx';
import Stage2_Latch from './pages/Stage2_Latch.jsx';
import Stage3_DFF from './pages/Stage3_DFF.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import RightPanel from './components/layout/RightPanel.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        {/* 좌: 목차 */}
        <Sidebar />

        {/* 중: 상단 헤더(진도율) + 메인 캔버스 + 우측 개념 패널 */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <div className="flex-1 flex min-h-0">
            <main className="flex-1 p-8 overflow-auto">
              <Routes>
                <Route path="/" element={<Intro />} />
                <Route path="/stage1" element={<Stage1_Gates />} />
                <Route path="/stage2" element={<Stage2_Latch />} />
                <Route path="/stage3" element={<Stage3_DFF />} />
              </Routes>
            </main>
            <RightPanel />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
