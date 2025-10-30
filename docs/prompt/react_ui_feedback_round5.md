# 🎟️ React 예매 UI 멜론티켓 스타일 피드백 (5차 — 좌석 선택 영역 개선 중심)

> **대상:** React + TypeScript 예매 UI (보안문자 이후 좌석 선택 페이지)  
> **목표:** 좌석 배치 시각 밸런스 강화 및 프로덕션급 마감 완성

---

## 🎯 문제 요약

| 구역 | 현재 상태 | 개선 방향 |
|------|-------------|-------------|
| **전체 레이아웃 중심선** | 좌석 블록(`무대`)이 좌측으로 치우침 | `.seat-container`의 column 비율 조정 |
| **좌석 등급 / 예매 정보 패널** | 좌측 여백이 좁음 | padding, margin-left 보강 |
| **무대 영역 (Stage)** | 높이가 작고 중심감 약함 | padding 확대 + gradient 배경 |
| **좌석 선택 타이틀** | 상단 간격 과도 | margin 조정으로 시선 흐름 자연화 |
| **결제 영역 시각 우선도** | 평면적 | shadow 및 gradient 적용 |

---

## 🧩 구조 및 CSS 개선안

### ✅ 1️⃣ `.seat-container` — 중심 비율 조정

```css
.seat-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 36px;
  align-items: start;
  justify-content: center;
  max-width: 1180px;
  margin: 0 auto;
  padding-top: 32px;
}
```

📌 `gap`을 36px로 확대해 여백 확보 및 중심 정렬 향상.

---

### ✅ 2️⃣ `.stage` — 중심 시각 강조

```css
.stage {
  text-align: center;
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 32px 0;
  font-weight: 700;
  letter-spacing: 0.8px;
  font-size: 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}
```

📌 `padding` 증가와 `gradient` 배경으로 중심감 강화.

---

### ✅ 3️⃣ `.seat-sidebar` — 카드형 구조 확립

```css
.seat-sidebar {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.seat-sidebar h4 {
  font-weight: 700;
  font-size: 16px;
  color: #111827;
}
```

📌 세로 정렬과 `gap`으로 내부 요소 정돈 + 그림자 강화.

---

### ✅ 4️⃣ “좌석 선택” 타이틀 영역

```css
.page-title {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 16px;
}
```

📌 상단 간격 감소로 시선 흐름을 자연스럽게 조정.

---

### ✅ 5️⃣ 결제 버튼 강조

```css
.pay-btn {
  background: linear-gradient(90deg, #2dd36f 0%, #22c55e 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 0;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(34, 197, 94, 0.25);
  transition: all 0.2s ease;
}

.pay-btn:hover {
  background: #22c55e;
  transform: scale(1.03);
  box-shadow: 0 6px 14px rgba(34, 197, 94, 0.35);
}
```

📌 **그라디언트 + hover 확대 효과**로 클릭 유도력 향상.

---

## ✅ 종합 개선 요약

| 구역 | 조정 포인트 | 결과 |
|------|--------------|--------|
| **레이아웃** | grid 간격 36px | 좌석도/사이드 균형 확보 |
| **무대** | padding 확대, gradient 추가 | 중심 강조 |
| **사이드바** | shadow + border | 카드형 안정감 |
| **버튼** | gradient + hover scale | 클릭 유도 향상 |
| **폰트톤** | Pretendard 500–700 | 통일감 강화 |

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
