import { useEffect } from 'react';
import useCircuitStore from '../store/circuitStore';

/**
 * 자동 클럭(Auto Clock) 훅
 * enabled가 true인 동안 intervalMs마다 클럭을 0↔1로 반복 토글한다.
 * 매 상승 엣지(0→1)에서 스토어가 D 값을 Q에 저장한다.
 *
 * @param {boolean} enabled    - 자동 클럭 활성화 여부
 * @param {number}  intervalMs - 토글 주기(ms). 기본 1000ms (= 1초마다 0↔1)
 */
const useClock = (enabled, intervalMs = 1000) => {
  useEffect(() => {
    if (!enabled) return undefined;

    const id = setInterval(() => {
      // 최신 상태를 getState로 직접 읽어 stale closure를 피한다
      useCircuitStore.getState().toggleClk();
    }, intervalMs);

    return () => clearInterval(id); // 언마운트/비활성화 시 타이머 정리
  }, [enabled, intervalMs]);
};

export default useClock;
