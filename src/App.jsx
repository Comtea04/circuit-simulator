import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Intro from './pages/Intro.jsx';
import Stage1_Gates from './pages/Stage1_Gates.jsx';
import Stage2_Latch from './pages/Stage2_Latch.jsx';
import Stage3_DFF from './pages/Stage3_DFF.jsx';

const NAV_ITEMS = [
  { to: '/',       label: '0. 소개' },
  { to: '/stage1', label: '1. 논리 게이트' },
  { to: '/stage2', label: '2. SR Latch' },
  { to: '/stage3', label: '3. D Flip-Flop' },
];

const Sidebar = () => (
  <nav className="w-56 min-h-screen bg-gray-900 text-white flex flex-col p-4 gap-2 shrink-0">
    <h1 className="text-lg font-bold mb-4">회로 시뮬레이터</h1>
    {NAV_ITEMS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.to === '/'}
        className={({ isActive }) =>
          `px-3 py-2 rounded text-sm transition-colors ${
            isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-gray-700'
          }`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/"       element={<Intro />} />
            <Route path="/stage1" element={<Stage1_Gates />} />
            <Route path="/stage2" element={<Stage2_Latch />} />
            <Route path="/stage3" element={<Stage3_DFF />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
