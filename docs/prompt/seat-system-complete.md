# 🎟️ 좌석 시스템 완성 가이드 (`seat-system-complete.md`)

> CLI 환경에서 참고 가능한 공연 예매용 **좌석 + 구역 시스템** 완성 예시

---

## 📁 1️⃣ 폴더 구조

```bash
src/
├─ data/
│  └─ seatData.ts        # 좌석 및 구역 데이터 정의
├─ components/
│  └─ SeatMap.tsx        # 좌석 렌더링 컴포넌트
├─ styles/
│  └─ SeatMap.css        # (선택) 스타일 파일
```

---

## 💡 2️⃣ 설계 개념 요약

```
공연장 좌석 구조 = 구역(Areas) + 좌석(Seats) + 상태(Status)
```

| 요소 | 예시 | 설명 |
|------|------|------|
| **구역 (Area)** | FLOOR / 1층 / 2층 | 좌석 그룹 단위 |
| **좌석 (Seat)** | 1열 1번, 3열 10번 | 개별 좌석 단위 |
| **상태 (Status)** | available / selected / reserved | 예매 가능 여부 |

---

## 🧩 3️⃣ `src/data/seatData.ts`

```ts
// src/data/seatData.ts
export interface Seat {
  row: number;
  col: number;
  status: "available" | "reserved";
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

📌 이 구조는 `SeatMap`에서 자동으로 grid 렌더링됩니다.

---

## 🪑 4️⃣ `src/components/SeatMap.tsx`

```tsx
// src/components/SeatMap.tsx
import React from "react";
import { SeatArea } from "../data/seatData";

interface SeatMapProps {
  area: SeatArea;
  onSeatClick: (seat: any) => void;
}

export default function SeatMap({ area, onSeatClick }: SeatMapProps) {
  if (!area || !area.seats) {
    return <div>좌석 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="seat-map-wrapper">
      <h3>{area.name}</h3>
      <div
        className="seat-map"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${area.cols}, 24px)`,
          gap: "6px",
          justifyContent: "center",
        }}
      >
        {area.seats.map((seat, i) => (
          <div
            key={i}
            className={`seat ${seat.status}`}
            onClick={() => onSeatClick(seat)}
            title={`${seat.row}열 ${seat.col}번`}
          >
            {seat.col}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎨 5️⃣ (선택) `src/styles/SeatMap.css`

```css
.seat {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #e5e7eb;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  transition: background-color 0.2s;
}

.seat.available:hover {
  background-color: #60a5fa;
}

.seat.reserved {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.seat.selected {
  background-color: #2563eb;
  color: white;
}
```

---

## 🧠 6️⃣ 작동 로직 요약

| 기능 | 설명 |
|------|------|
| **자동 생성** | `seatData.ts`에서 `Array.from()`으로 좌석 자동 생성 |
| **구역 전환** | 상위 컴포넌트에서 `setSelectedArea()`로 변경 |
| **좌석 클릭** | 상태 `available ↔ selected` 토글 |
| **예약좌석** | `reserved`는 클릭 불가 (회색 표시) |
| **CSS grid** | `rows × cols`에 따라 동적 좌석 렌더링 |

---

## ⚙️ 7️⃣ 실행 예시 (CLI)

```bash
# 파일 구조 만들기
mkdir -p src/{data,components,styles}

# 파일 작성
nano src/data/seatData.ts
nano src/components/SeatMap.tsx
nano src/styles/SeatMap.css

# 실행 (Vite 환경 예시)
npm run dev
```

---

✅ **결과:**  
CLI 실행 후 `SeatMap` 컴포넌트를 import하여 사용하면  
구역별로 좌석이 자동 생성되고, 예약 좌석은 클릭 불가로 표시됩니다.  

---

**작성일:** 2025-10-31  
**버전:** Seat System Complete (for CLI)  
**작성자:** ChatGPT (GPT-5)
