# 🎟️ React 좌석 선택 페이지 — 7차 완성형 개선안

> **대상:** AquaTicket 공연 예매 UI  
> **목표:** 멜론티켓과 유사한 균형 잡힌 2단 구조 (좌석맵 + 사이드바) 완성

---

## 🎯 현재 상태 요약

| 항목 | 상태 | 평가 |
|------|------|------|
| **사이드바 구성** | 범례 + 가격표 + 예매정보 완성 | ✅ 완성 |
| **좌석맵 (STAGE 영역)** | 미구현 | 🚧 추가 필요 |
| **전체 정렬** | 왼쪽으로 치우침 | ⚠ 중앙 정렬 필요 |
| **화면 균형감** | 좌측 집중형 | ⚠ 2단 균형 필요 |

---

## 🧱 개선 목표 구조

```
SeatSelectPage.tsx
├── SeatLayout (좌우 2단 Grid)
│   ├── SeatMap (좌석 SVG / Stage 포함)
│   └── SeatSidebar (좌석 색상 안내 + 가격표 + 예매정보)
└── Header (공연명, 날짜, 시간)
```

---

## 🎨 1️⃣ Grid 레이아웃 (중앙 정렬)

```css
.seat-container {
  display: grid;
  grid-template-columns: 3fr 1fr; /* 좌석맵 : 사이드 = 3:1 */
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
}
```

📌 이 설정으로 사이드바가 오른쪽에, 좌석맵이 왼쪽에 배치되며 전체 화면이 중앙에 고정됨.

---

## 🎨 2️⃣ 좌석맵 (무대 포함 SVG 구조)

```tsx
<div className="seat-container">
  {/* 좌석맵 */}
  <div className="seat-map">
    <div className="stage">STAGE</div>
    <svg viewBox="0 0 600 400" className="seat-svg">
      {/* VIP 구역 */}
      <g fill="#d4b48c">
        <rect x="250" y="80" width="100" height="30" rx="4" />
      </g>

      {/* 일반석 구역 */}
      <g fill="#b4b9ff">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={150 + i * 30} y={160} width="20" height="20" rx="4" />
        ))}
      </g>
    </svg>
  </div>

  {/* 사이드바 */}
  <div className="seat-sidebar">
    <SeatLegend />
    <SeatPriceTable />
    <SeatSummary />
  </div>
</div>
```

---

## 🖌️ 3️⃣ 스타일 (좌석맵 + Stage)

```css
.seat-map {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 24px;
  height: 600px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.stage {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  text-align: center;
  font-weight: 700;
  color: #111827;
  width: 240px;
  padding: 12px 0;
  margin-bottom: 20px;
}
```

---

## 🎨 4️⃣ 좌석 색상 코드 (Legend)

| 구분 | 색상 코드 | 의미 |
|------|------------|------|
| VIP석 | `#d4b48c` | 고급석 |
| 일반석 | `#b4b9ff` | 일반 구역 |
| 시야제한석 | `#f7c4d4` | 제한 구역 |
| 선택석 | `#2dd36f` | 사용자가 선택 |
| 예매 완료 | `#e5e7eb` | 선택 불가 |

---

## ⚙️ 5️⃣ 반응형 (768px 이하)

```css
@media (max-width: 768px) {
  .seat-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  .seat-sidebar {
    order: -1; /* 모바일에서는 상단으로 */
  }
}
```

---

## ✅ 결과 예상

| 구역 | 설명 |
|------|------|
| **좌측 (3fr)** | STAGE + SVG 좌석맵, 시각적 중심 |
| **우측 (1fr)** | 색상 안내 + 가격표 + 예매정보 고정 |
| **전체 화면** | 중앙 정렬, 멜론티켓 유사 레이아웃 완성 |
| **모바일 대응** | 단일 Column으로 전환 |

---

📌 **추가 제안:**  
- 좌석 클릭 시 색상 전환 (useState 기반)
- Hover 시 Tooltip: “A열 3번 / 15,000원” 표시
- `좌석 선택 완료` 버튼 활성화 시 결제창 이동

---

**작성일:** 2025-10-30  
**버전:** React UI Feedback Round 7  
**작성자:** ChatGPT (GPT-5)
