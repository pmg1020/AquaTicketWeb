# 🎟️ React 좌석 선택 페이지 — 8차 개선안 (좌석맵 균형 + 중앙정렬 완성)

> **목표:** 멜론티켓과 같은 균형 잡힌 2단 구조 유지하면서, 좌석맵 영역을 시각적으로 완성

---

## 🎯 현재 상태 진단

| 항목 | 상태 | 원인 |
|------|------|------|
| **사이드바 위치** | 정상 (오른쪽 고정) | ✅ 완성 |
| **좌석맵 비율** | 화면 좌측으로 치우침 | ⚠ 좌석맵 내부가 비어 있음 |
| **전체 밸런스** | 비대칭 | ⚠ `seat-map` 내부 콘텐츠 없음 → collapse |
| **좌석맵 높이** | 없음 | 🚧 `min-width` 및 `min-height` 필요 |

---

## ✅ 개선 목표

- 좌석맵이 존재하지 않아도 화면이 중앙 정렬로 보이게 구성
- STAGE 및 좌석 영역의 최소 크기 확보
- 사이드바와 균형 맞춤

---

## 🧩 1️⃣ React 구조 (SeatSelectPage)

```tsx
<div className="seat-container">
  {/* 좌석맵 */}
  <div className="seat-map">
    <div className="stage">STAGE</div>
    <div className="seat-placeholder">
      좌석 맵이 여기에 표시됩니다.
    </div>
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

## 🎨 2️⃣ CSS — 중앙정렬 및 밸런스 유지

```css
.seat-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
}
```

📌 `justify-content: center`와 `max-width` 조합으로 화면 중앙 정렬.

---

## 🖌️ 3️⃣ 좌석맵 시각적 영역 확보

```css
.seat-map {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 24px;
  height: 600px;
  min-width: 800px; /* 👈 중요: 좌석맵 가로 확보 */
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

## 🧱 4️⃣ 좌석맵 Placeholder (임시 시각화용)

```css
.seat-placeholder {
  flex: 1;
  width: 100%;
  background: repeating-linear-gradient(
    45deg,
    #f9fafb,
    #f9fafb 10px,
    #f3f4f6 10px,
    #f3f4f6 20px
  );
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-weight: 500;
  font-size: 14px;
}
```

📌 이 영역은 추후 실제 SVG 좌석맵으로 대체 가능.

---

## ⚙️ 5️⃣ 반응형 처리 (모바일 대응)

```css
@media (max-width: 768px) {
  .seat-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  .seat-sidebar {
    order: -1;
  }
  .seat-map {
    min-width: auto;
    height: 500px;
  }
}
```

---

## ✅ 최종 결과 예상

| 구역 | 설명 |
|------|------|
| **좌측 (3fr)** | STAGE + 좌석 Placeholder (중앙 배치, 고정 높이) |
| **우측 (1fr)** | 색상 안내 + 가격표 + 예매정보 |
| **전체** | 멜론티켓과 같은 안정적 비율, 중앙 정렬 |
| **모바일** | 단일 Column으로 자동 전환 |

---

📌 **다음 단계 제안**  
- `seat-placeholder`를 SVG 또는 Canvas 기반 좌석맵으로 교체  
- 선택 좌석에 hover / active / booked 색상 반영  
- “좌석 선택 완료” 버튼 추가 후 결제 페이지 연동

---

**작성일:** 2025-10-30  
**버전:** React UI Feedback Round 8  
**작성자:** ChatGPT (GPT-5)
