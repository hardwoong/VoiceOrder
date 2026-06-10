# 보이스 오더 (Voice Order)

어르신용 음성 주문 키오스크 **발표용 프로토타입**입니다.  
말로 원하는 음료를 말하면 AI(목업)가 후보를 이미지와 쉬운 설명으로 보여주고, 터치로 좁혀 주문을 완성합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 표시된 로컬 주소(보통 `http://localhost:5173`)로 접속합니다.

> **Chrome 권장** — Web Speech API(음성 인식·TTS)는 Chrome에서 가장 안정적으로 동작합니다.  
> 마이크 권한을 허용해 주세요.

## 데모 시연 팁

1. **음성 주문**: 대기 화면에서 `🎙 말하고 주문하기` 버튼을 **누른 채** 말한 뒤 손을 뗍니다.
2. **프리셋 폴백**: 음성이 안 될 때 `시원하고 단 커피` 등 아래 버튼만으로도 전체 흐름을 시연할 수 있습니다.
3. **단골 재주문**: 한 번 주문하면 `지난번 그 음료` 버튼이 나타납니다.
4. **직원 호출**: 어느 화면에서든 우측 상단 `직원 부르기`로 막힘 없이 복귀 가능합니다.

## 기술 스택

- React 18+ / Vite / TypeScript
- Tailwind CSS
- lucide-react, framer-motion
- Web Speech API (음성 인식·합성) — 백엔드 없음, 로컬 목업 데이터

## 프로젝트 구조

```
src/
  data/menu.ts          # 메뉴 목업 + matchMenu 규칙 매칭
  state/orderMachine.ts # 화면 상태 머신 (useReducer)
  hooks/                # 음성 인식·합성 훅
  components/           # 화면별 컴포넌트
```

## 화면 흐름

`idle` → `listening` → `candidates` → `confirm` → `done` → `rating` → `idle`

후보가 맞지 않으면 최대 3라운드까지 다른 메뉴를 제시하고, 그래도 안 되면 `staff` 화면으로 안내합니다.

## 오프라인 데모

- 외부 CDN 이미지·폰트 없이 동작합니다.
- 메뉴 썸네일은 이모지로 표시합니다.

## 빌드

```bash
npm run build
npm run preview
```
