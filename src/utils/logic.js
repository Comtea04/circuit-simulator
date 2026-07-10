// src/utils/logic.js

/**
 * 기본 논리 게이트 연산 함수
 * 입력값(a, b)은 0 또는 1의 정수만 들어온다고 가정합니다.
 */

// AND 연산: 둘 다 1일 때만 1
export const andGate = (a, b) => a & b;

// OR 연산: 하나라도 1이면 1
export const orGate = (a, b) => a | b;

// XOR 연산: 두 값이 다를 때만 1
export const xorGate = (a, b) => a ^ b;

// NOT 연산: 0은 1로, 1은 0으로 반전
export const notGate = (a) => (a === 0 ? 1 : 0);

// NAND 연산 (AND의 반전)
export const nandGate = (a, b) => notGate(andGate(a, b));

// NOR 연산 (OR의 반전)
export const norGate = (a, b) => notGate(orGate(a, b));
