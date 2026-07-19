// src/store/circuitStore.js
import { create } from 'zustand';

const useCircuitStore = create((set, get) => ({
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
  
  // 4. D Flip-Flop 상태 — 스토어가 D/CLK/Q를 모두 소유하는 '엣지 감지 두뇌'
  dffState: {
    d: 0,         // 데이터 입력
    clk: 0,       // 현재 클럭 신호
    q: 0,         // 저장된 출력
    prevClk: 0,   // 직전 클럭 (상승 엣지 감지용)
    edgeCount: 0, // 상승 엣지가 발생한 누적 횟수 (UI 애니메이션 트리거용)
  },

  // 5-1. D 입력 변경 — 클럭 엣지가 아니므로 Q는 절대 바뀌지 않는다 (상태 잠금 Lock)
  //  → 클럭이 0이든 1이든, D를 아무리 조작해도 여기서는 Q를 건드리지 않는다.
  setDFFInput: (d) =>
    set((state) => ({
      dffState: { ...state.dffState, d },
    })),

  // 5-2. 클럭 신호 설정 — 상승 엣지(0→1)인 '그 찰나'에만 D를 Q에 덮어쓴다
  setClk: (clk) =>
    set((state) => {
      const risingEdge = state.dffState.prevClk === 0 && clk === 1;
      return {
        dffState: {
          ...state.dffState,
          clk,
          prevClk: clk, // 다음 비교를 위해 현재 값을 직전 값으로 기록
          // 상승 엣지일 때만 D를 저장, 그 외(유지·하강 엣지)에는 기존 Q 유지 → Lock
          q: risingEdge ? state.dffState.d : state.dffState.q,
          edgeCount: risingEdge
            ? state.dffState.edgeCount + 1
            : state.dffState.edgeCount,
        },
      };
    }),

  // 5-3. 클럭 토글 — 자동 클럭(useClock)과 토글 버튼에서 현재 clk를 뒤집어 setClk 실행
  toggleClk: () => {
    const { clk } = get().dffState;
    get().setClk(clk === 0 ? 1 : 0);
  },

  // 5-4. DFF 초기화 — Q와 클럭 상태를 0으로 되돌린다 (D 입력값은 유지)
  resetDFF: () =>
    set((state) => ({
      dffState: { ...state.dffState, clk: 0, q: 0, prevClk: 0, edgeCount: 0 },
    })),
}));

export default useCircuitStore;
