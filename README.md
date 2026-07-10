# circuit-simulator
26-1_share via AI

## 🛠️ 웹 기반 회로 학습 시뮬레이터 스펙 문서 (목차 기반 라우팅 적용)

### 1. 프레임워크 및 기술 스택
* **Core Framework:** React (Vite 기반)
* **Routing:** React Router DOM (목차 선택 시 새로고침 없는 SPA 방식의 부드러운 화면 전환)
* **Styling:** Tailwind CSS
* **State Management:** Zustand (각 챕터별 독립적인 0과 1의 논리 상태 관리)

---

### 2. 핵심 로직 및 기능 명세
* **목차(Chapter) 기반 네비게이션 기능:** 사용자가 사이드바를 통해 복습하거나 학습하고 싶은 특정 회로 단계를 선택하여 해당 시뮬레이션 페이지로 즉시 이동할 수 있습니다.
* **페이지별 독립 시뮬레이션 환경:** 각 챕터 페이지는 서로 완전히 분리된 독립적인 논리 상태(State)를 가집니다. 특정 페이지의 조작이 다른 챕터에 영향을 주지 않아 모듈형 학습이 가능합니다.
* **입력 및 실시간 데이터 흐름 시각화:** 사용자가 페이지 내의 입력 스위치(0과 1)를 클릭하면, 회로 선의 색상이 실시간으로 변하며(예: 1은 빨간색, 0은 파란색) 논리 게이트를 거쳐 결과값에 도달하는 과정을 시각적으로 추적할 수 있습니다.
* **챕터별 개념 가이드 제공:** 선택한 챕터에 맞춰 해당 회로의 작동 원리와 실습 목표(예: "기본 게이트 조합을 통해 어떻게 상태를 유지하는지 확인해보세요")가 동적으로 화면에 렌더링됩니다.

---

### 3. 사용자 인터페이스 (UI) 레이아웃
* **좌측 사이드바 (Table of Contents):** 교재의 목차처럼 챕터 목록이 리스트 형태로 제공되며, 현재 선택된 챕터가 하이라이트 됩니다.
* **상단 헤더:** 현재 학습 중인 회로의 이름과 학습 진도율을 명확하게 표시합니다.
* **중앙 메인 캔버스:** 선택된 챕터의 독립적인 회로 시뮬레이터 영역입니다. 조작 가능한 입력 스위치, 연산 게이트 블록, 출력 전구가 배치됩니다.
* **우측 패널:** 해당 단계의 회로 개념 설명 텍스트와 실시간 질의응답을 위한 AI 챗봇 버튼이 위치합니다.

---

### 4. 프로젝트 파일 및 디렉토리 구조
```
circuit-simulator/
├── public/                 # 정적 에셋 파일
│   ├── icon/               # 게이트 아이콘, 스위치, 전구 등 SVG 파일
│   └── lottie/             # 경고 및 가이드 애니메이션 파일
├── src/
│   ├── components/         # 재사용 가능한 React 컴포넌트
│   │   ├── circuit/        # 회로 공통 요소 (Switch.jsx, Wire.jsx, LightBulb.jsx)
│   │   ├── layout/         # 전체 레이아웃 (Navbar.jsx, Sidebar.jsx)
│   │   └── ui/             # 공통 UI (Button.jsx, Toast.jsx, ChatBot.jsx)
│   ├── pages/              # ⭐️ 목차 선택 시 라우팅되는 독립 챕터 페이지
│   │   ├── Intro.jsx       # 0단계: 프로젝트 소개 및 튜토리얼
│   │   ├── Stage1_Gates.jsx # 1단계: 기본 논리 게이트 (AND, OR, XOR 등)
│   │   ├── Stage2_Latch.jsx # 2단계: SR Latch (기억 소자의 시작 및 피드백 루프)
│   │   └── Stage3_DFF.jsx   # 3단계: D Flip-Flop (클럭 동기화 및 엣지 트리거링)
│   ├── hooks/              # 커스텀 훅 (useCircuit.js 등)
│   ├── store/              # Zustand 전역 상태 관리 (현재 활성화된 챕터 상태 등)
│   │   └── circuitStore.js
│   ├── utils/              # 비트 논리 연산 헬퍼 함수
│   │   └── logic.js
│   ├── constant/           # 챕터별 설명 데이터 및 상수 정의
│   │   └── chapters.js
│   ├── App.jsx             # React Router 설정 및 라우팅 제어 최상위 파일
│   ├── main.jsx            # 앱 진입점
│   └── index.css           # Tailwind CSS 지시어가 포함된 전역 스타일
├── tailwind.config.js      # Tailwind CSS 커스텀 테마 설정
├── vite.config.js          # Vite 빌드 설정
└── package.json            # 의존성 라이브러리 목록
```
