import React from 'react';
import { NavLink } from 'react-router-dom';

// 좌측 목차(Table of Contents). 팀원(역할 B)이 정의한 데이터 구조 100% 유지
const NAV_ITEMS = [
  { to: '/', label: '0. 소개' },
  { to: '/stage1', label: '1. 논리 게이트' },
  { to: '/stage2', label: '2. SR Latch' },
  { to: '/stage3', label: '3. D Flip-Flop' },
];

const Sidebar = () => (
  <aside className="w-60 min-h-screen bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col p-4 gap-2 shrink-0 select-none shadow-lg">
    {/* 헤더 타이틀 */}
    <div className="flex items-center gap-2.5 px-2 py-2 mb-2 border-b border-slate-800">
      <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
        ⚙️
      </div>
      <h1 className="text-base font-bold text-slate-100 tracking-wide">
        회로 시뮬레이터
      </h1>
    </div>

    {/* 목차 리스트 */}
    <nav className="flex flex-col gap-1.5 flex-1">
      <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
        Stages
      </div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `relative flex items-center px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* 활성화 시 좌측 네온 하이라이트 바 */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-r-full shadow-sm shadow-blue-500" />
              )}
              <span className="truncate">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* 하단 시뮬레이터 상태 표시 */}
    <div className="px-3 py-2.5 mt-auto rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span className="text-[11px] font-medium text-slate-400">System Ready</span>
    </div>
  </aside>
);

export default Sidebar;
