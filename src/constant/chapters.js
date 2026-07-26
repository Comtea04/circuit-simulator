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
    concept:
      '논리 게이트는 0과 1을 입력받아 정해진 규칙으로 하나의 출력을 내는 가장 작은 연산 단위입니다. 모든 디지털 회로는 이 게이트들의 조합으로 만들어집니다.',
  },
  {
    id: 'stage2',
    path: '/stage2',
    title: '2. SR Latch',
    description: 'NOR 게이트 두 개로 만드는 가장 단순한 기억 소자입니다.',
    goal: 'S와 R을 조작해 Latch가 상태를 어떻게 기억하는지 확인해보세요. S=R=1은 금지 상태입니다.',
    concept:
      '게이트의 출력을 다시 입력으로 되먹이는(피드백) 순간, 회로는 "이전 상태를 기억"하기 시작합니다. SR Latch는 이 기억(메모리)의 가장 원초적인 형태입니다.',
  },
  {
    id: 'stage3',
    path: '/stage3',
    title: '3. D Flip-Flop',
    description: '클럭(Clock) 신호의 상승 엣지에서만 D 값을 저장하는 동기식 기억 소자입니다.',
    goal: '클럭이 0→1로 바뀌는 순간에만 Q가 업데이트되는 엣지 트리거링을 확인해보세요.',
    concept:
      '언제든 값이 바뀌던 Latch와 달리, Flip-Flop은 클럭이라는 "박자"에 맞춰서만 값을 저장합니다. 이 동기화 덕분에 수많은 소자가 한 박자에 함께 움직이는 CPU가 가능해집니다.',
  },
];

export const getChapter = (id) => CHAPTERS.find((c) => c.id === id);

// 현재 라우트 경로(location.pathname)로 챕터를 찾는다. (헤더/우측 패널이 사용)
export const getChapterByPath = (path) => CHAPTERS.find((c) => c.path === path);
