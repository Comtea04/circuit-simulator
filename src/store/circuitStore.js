// src/store/circuitStore.js
import { create } from 'zustand';

const useCircuitStore = create((set) => ({
  // 1. 현재 활성화된 챕터(페이지) 상태 관리
  currentChapter: 'Stage1_Gates',
  setChapter: (chapter) => set({ currentChapter: chapter }),

  // 2. SR Latch의 전역 상태 (Q, Q')
  latchState: {
    q: 0,
    qNot: 1,
    isError: false, // S와 R이 동시에 1일 때 띄울 에러 상태
  },

  // 3. SR Latch 입력 처리 및 피드백 루프 로직
  updateLatch: (s, r) => {
    set((state) => {
      // [예외 처리] S와 R이 모두 1인 경우 (금지된 상태)
      if (s === 1 && r === 1) {
        return {
          latchState: { q: 0, qNot: 0, isError: true }
        };
      }

      // [Set 상태] S=1, R=0 이면 Q를 1로 켬
      if (s === 1 && r === 0) {
        return { latchState: { q: 1, qNot: 0, isError: false } };
      }
      
      // [Reset 상태] S=0, R=1 이면 Q를 0으로 끔
      if (s === 0 && r === 1) {
        return { latchState: { q: 0, qNot: 1, isError: false } };
      }
      
      // [Hold 상태 - 기억 유지] S=0, R=0 인 경우
      // 기존 state.latchState를 그대로 반환하여 이전 상태를 기억함
      return { latchState: { ...state.latchState, isError: false } };
    });
  },
  
  // 4. D Flip-Flop 상태
  dffState: {
    q: 0,
    prevClk: 0,
  },

  // 5. DFF 업데이트 — 클럭 상승 엣지(0→1)일 때만 Q에 D값 저장
  updateDFF: (d, clk) => {
    set((state) => {
      const risingEdge = state.dffState.prevClk === 0 && clk === 1;
      return {
        dffState: {
          q: risingEdge ? d : state.dffState.q,
          prevClk: clk,
        },
      };
    });
  },
}));

export default useCircuitStore;
