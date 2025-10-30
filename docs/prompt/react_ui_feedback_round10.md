# 🎟️ React 좌석 선택 페이지 — Round 10 (중앙선 정렬 & 비율 보정 최종판)

> **목표:** 좌석맵 중심 정렬, 시각적 밸런스 완성, 멜론티켓형 화면 구성

---

## 🎯 문제 요약 (Round 9 이후 상태)

| 항목 | 상태 | 문제점 |
|------|------|--------|
| **좌석맵 영역** | 표시됨 | ⚠ 화면 기준 왼쪽 치우침 |
| **사이드바** | 완성됨 | ✅ 정렬 문제 없음 |
| **텍스트 위치** | 미세하게 왼쪽으로 붙음 | ⚠ padding 부족 |
| **시각적 중심선** | 불균형 | ⚠ 4:1.2 grid 비율 불균형 |
| **전체 중앙정렬** | 미흡 | ⚠ justify-content 작동 한계 |

---

## ✅ 개선 목표

- 전체 페이지의 시각적 중심선을 정확히 가운데 정렬  
- 좌석맵의 시각적 비중을 확대 (5:1.3 비율)  
- 사이드바 정렬 유지 및 텍스트 여백 보정

---

## 🧩 1️⃣ Grid 비율 조정 (좌우 밸런스 개선)

```css
.seat-container {
  display: grid;
  grid-template-columns: 5fr 1.3fr; /* 좌석맵 : 사이드 = 5:1.3 */
  gap: 60px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 0;
}
```

📌 좌석맵의 비율을 높여 전체 중심선을 시각적으로 중앙에 맞춤.

---

## 🎨 2️⃣ 좌석맵 크기 및 중심 강화

```css
.seat-map {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 40px;
  height: 640px;
  min-width: 1000px; /* 중앙 비중 확보 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
```

📌 좌석맵의 폭과 여백을 키워, 중앙 기준선을 기준으로 정확히 맞춰줌.

---

## 🖌️ 3️⃣ 전체 페이지 Wrapper 추가

```css
.page-wrapper {
  display: flex;
  justify-content: center; /* 화면 중앙 기준선 강제 정렬 */
}
```

```tsx
<div className="page-wrapper">
  <div className="seat-container">
    <div className="seat-map">...</div>
    <div className="seat-sidebar">...</div>
  </div>
</div>
```

📌 모든 grid를 감싸는 상위 flex wrapper로 전체 중앙 기준 확보.

---

## 🎯 4️⃣ 사이드바 여백 보정

```css
.seat-sidebar {
  padding-left: 10px; /* 왼쪽 벽 여백 보정 */
}
```

📌 `"좌석색상안내"` 텍스트의 시각적 여백 확보로 좌우 정렬 안정화.

---

## ⚙️ 5️⃣ 반응형 대응 (모바일 구조 유지)

```css
@media (max-width: 768px) {
  .seat-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  .seat-sidebar {
    order: -1; /* 모바일에서는 상단 이동 */
  }
  .seat-map {
    min-width: auto;
    height: 500px;
  }
}
```

---

## ✅ 최종 구조

| 구역 | 내용 |
|------|------|
| **좌측 (5fr)** | STAGE + 좌석맵 (넓은 비율, 시각 중심 확보) |
| **우측 (1.3fr)** | 사이드바 (범례, 가격, 예매정보) |
| **전체 Wrapper** | 중앙 기준 정렬 (flex 기반) |
| **텍스트 여백** | 균형 조정 완료 |
| **반응형** | 모바일 자동 1열 전환 |

---

📌 **추가 추천**
- 좌석맵 중심에 “무대방향(STAGE)” 기준선 텍스트 고정  
- 좌석 선택 시 `transform: scale(1.05)` 효과로 시각적 피드백 강화  
- Hover 시 Tooltip (예: “A열 3번 — 15,000원”) 표시  

---

**작성일:** 2025-10-30  
**버전:** React UI Feedback Round 10  
**작성자:** ChatGPT (GPT-5)
