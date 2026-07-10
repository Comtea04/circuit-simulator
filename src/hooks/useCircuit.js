import { useState } from 'react';
import { andGate, orGate, xorGate, notGate, nandGate, norGate } from '../utils/logic';

const GATE_FN = {
  AND:  (inputs) => andGate(inputs[0], inputs[1]),
  OR:   (inputs) => orGate(inputs[0], inputs[1]),
  XOR:  (inputs) => xorGate(inputs[0], inputs[1]),
  NOT:  (inputs) => notGate(inputs[0]),
  NAND: (inputs) => nandGate(inputs[0], inputs[1]),
  NOR:  (inputs) => norGate(inputs[0], inputs[1]),
};

/**
 * 단일 게이트의 입력 상태와 출력값을 관리하는 훅
 * @param {string} gateType - 'AND' | 'OR' | 'XOR' | 'NOT' | 'NAND' | 'NOR'
 * @param {number[]} initialInputs - 초기 입력값 배열 (예: [0, 0])
 * @returns {{ inputs, toggleInput, output }}
 */
const useCircuit = (gateType, initialInputs = [0, 0]) => {
  const [inputs, setInputs] = useState(initialInputs);

  const toggleInput = (index) => {
    setInputs((prev) => {
      const next = [...prev];
      next[index] = next[index] === 0 ? 1 : 0;
      return next;
    });
  };

  const fn = GATE_FN[gateType.toUpperCase()];
  const output = fn ? fn(inputs) : 0;

  return { inputs, toggleInput, output };
};

export default useCircuit;
