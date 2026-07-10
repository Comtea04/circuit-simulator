export const CHAPTERS = [
  {
    id: 'intro',
    path: '/',
    title: '0. 프로젝트 소개',
    description: '회로 시뮬레이터의 사용 방법과 학습 목표를 확인하세요.',
    goal: '스위치를 클릭해 0과 1이 어떻게 흐르는지 감을 잡아보세요.',
  },
  {
    id: 'stage1',
    path: '/stage1',
    title: '1. 논리 게이트',
    description: 'AND, OR, XOR, NOT 등 기본 논리 게이트의 동작을 직접 실험해보세요.',
    goal: '입력 스위치를 바꿔가며 각 게이트의 진리표를 직접 확인해보세요.',
  },
  {
    id: 'stage2',
    path: '/stage2',
    title: '2. SR Latch',
    description: 'NOR 게이트 두 개로 만드는 가장 단순한 기억 소자입니다.',
    goal: 'S와 R을 조작해 Latch가 상태를 어떻게 기억하는지 확인해보세요. S=R=1은 금지 상태입니다.',
  },
  {
    id: 'stage3',
    path: '/stage3',
    title: '3. D Flip-Flop',
    description: '클럭(Clock) 신호의 상승 엣지에서만 D 값을 저장하는 동기식 기억 소자입니다.',
    goal: '클럭이 0→1로 바뀌는 순간에만 Q가 업데이트되는 엣지 트리거링을 확인해보세요.',
  },
];

export const getChapter = (id) => CHAPTERS.find((c) => c.id === id);
