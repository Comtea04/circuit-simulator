import { NavLink } from 'react-router-dom';

// 좌측 목차(Table of Contents). App.jsx에서 분리 — 스타일링은 역할 A가 다듬기 편하게.
const NAV_ITEMS = [
  { to: '/', label: '0. 소개' },
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

export default Sidebar;
