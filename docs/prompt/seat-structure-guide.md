# 🎟️ 좌석 및 구역 시스템 설계 가이드 (`seat-structure-guide.md`)

이 문서는 공연 예매 웹/앱에서  
**구역(Area) → 좌석(Seat) → 상태(Status)** 구조를 설계하고  
React + TypeScript + CSS로 구현하는 전 과정을 CLI 환경에서 참고할 수 있도록 정리합니다.

---

## 1️⃣ 설계 개념 요약

```
공연장 좌석 구조 = 구역(Areas) + 좌석(Seats) + 상태(Status)
```

| 요소 | 예시 | 설명 |
|------|------|------|
| **구역 (Area)** | FLOOR / 1층 / 2층 | 좌석 그룹 단위 |
| **좌석 (Seat)** | 1열 1번, 3열 10번 | 개별 좌석 단위 |
| **상태 (Status)** | available / selected / reserved | 예매 가능 여부 |

---

## 2️⃣ 데이터 구조 예시 (seatData.ts)

```ts
export interface Seat {
  row: number;
  col: number;
  status: "available" | "reserved" | "selected";
}

export interface SeatArea {
  id: string;
  name: string;
  price: number;
  rows: number;
  cols: number;
  seats: Seat[];
}

export const SEAT_AREAS: SeatArea[] = [
  {
    id: "floor",
    name: "FLOOR",
    price: 15000,
    rows: 10,
    cols: 15,
    seats: Array.from({ length: 150 }, (_, i) => ({
      row: Math.floor(i / 15) + 1,
      col: (i % 15) + 1,
      status: Math.random() > 0.85 ? "reserved" : "available",
    })),
  },
  {
    id: "1f",
    name: "1층",
    price: 12000,
    rows: 8,
    cols: 14,
    seats: Array.from({ length: 112 }, (_, i) => ({
      row: Math.floor(i / 14) + 1,
      col: (i % 14) + 1,
      status: Math.random() > 0.8 ? "reserved" : "available",
    })),
  },
  {
    id: "2f",
    name: "2층",
    price: 10000,
    rows: 6,
    cols: 12,
    seats: Array.from({ length: 72 }, (_, i) => ({
      row: Math.floor(i / 12) + 1,
      col: (i % 12) + 1,
      status: Math.random() > 0.75 ? "reserved" : "available",
    })),
  },
];
```

---

## 3️⃣ UI 레이아웃 구조

```plaintext
[좌측] 구역 선택 리스트
[중앙] 좌석 맵 (row × col grid)
[우측] 예매 정보 패널
```

```
┌───────────────────────────────┐
│          좌석 선택            │
├──────────────┬────────────────┬──────────────┤
│ 구역 선택    │  좌석맵       │  예매 정보   │
│ FLOOR        │  ■■■■■■■     │  구역: 1층   │
│ 1층          │  ■■■■■■■     │  좌석: 5개   │
│ 2층          │  ■■■■■■■     │  합계: 60,000원 │
└──────────────┴────────────────┴──────────────┘
```

---

## 4️⃣ 핵심 기능 설계

| 기능 | 설명 |
|------|------|
| 구역 전환 | 구역 버튼 클릭 시 해당 좌석맵 렌더링 |
| 좌석 선택/해제 | 클릭 시 `selected` / `available` 토글 |
| 예약불가 표시 | `reserved` 상태 회색 처리 |
| 금액 자동계산 | `선택좌석수 × price` |
| 선택 초기화 | 구역 변경 시 초기화 |

---

## 5️⃣ 컴포넌트 설계 예시

| 컴포넌트 | 역할 |
|-----------|------|
| `SeatSelection.tsx` | 전체 페이지 (좌/중/우 레이아웃) |
| `SeatAreaList.tsx` | 구역 리스트 버튼 |
| `SeatMap.tsx` | 좌석맵 (grid) |
| `SeatSummary.tsx` | 선택 정보 및 결제 버튼 |
| `seatData.ts` | 좌석 데이터 관리 |

---

## 6️⃣ CSS 스타일 포인트

```css
.seat {
  width: 26px;
  height: 26px;
  border-radius: 4px;
  text-align: center;
  line-height: 26px;
  background-color: #e5e7eb;
  transition: 0.15s;
  cursor: pointer;
}

.seat.available:hover { background-color: #93c5fd; }
.seat.selected { background-color: #2563eb; color: white; }
.seat.reserved { background-color: #d1d5db; cursor: not-allowed; }

.seat-areas button.active { background-color: #2563eb; color: white; }
.btn-confirm { background-color: #22c55e; color: white; }
```

---

## 7️⃣ CLI 활용 예시

```bash
# 프로젝트 구조 생성
mkdir -p src/{pages,styles,data}

# 좌석 관련 파일 생성
touch src/pages/SeatSelection.tsx
touch src/styles/SeatSelection.css
touch src/data/seatData.ts

# 서버 실행
npm run dev
```

---

## 8️⃣ 확장 아이디어

| 기능 | 설명 |
|------|------|
| 🔒 인증 예매 | CAPTCHA / 토큰 인증 후 입장 |
| 💺 실시간 좌석 반영 | WebSocket 기반 좌석 상태 갱신 |
| 💳 결제 연동 | Toss Payments, PortOne 등 |
| 📱 반응형 | 모바일에서 세로 스크롤 전환 |

---

이 문서는 CLI에서 바로 열어 개발자가  
“구역 및 좌석 구조”를 빠르게 설계하고 구현할 수 있도록 하는  
**실전형 구조 가이드**입니다.
