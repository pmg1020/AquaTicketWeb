# 🎟️ React 좌석 선택 페이지 — 9차 개선안 (최종 완성형: 중앙정렬 + 비율 보정)

> **목표:** 멜론티켓 수준의 좌석맵 중심 정렬, 비율 균형, 시각적 안정성 완성

---

## 🎯 문제 요약 (8차 이후 상태)

| 항목 | 상태 | 문제점 |
|------|------|--------|
| **사이드바** | 정상 | ✅ 완성됨 |
| **좌석맵 영역** | 있음 | ⚠ 시각적 비율 불균형 (왼쪽 치우침) |
| **전체 정렬** | 중앙 정렬 미흡 | ⚠ `grid` 비율 문제 |
| **무대 중심선 (STAGE)** | 있음 | ✅ 기준점 활용 가능 |
| **좌석맵 비중** | 약함 | ⚠ `min-width` 부족 및 여백 과소 |

---

## ✅ 개선 목표

- 좌석맵이 시각적으로 페이지의 중심에 위치하도록 조정  
- 사이드바보다 좌석맵의 비중을 확대 (4:1.2 비율)  
- STAGE 및 좌석 Placeholder 시각 개선

---

## 🧩 1️⃣ Grid 비율 재조정 (좌우 밸런스)

```css
.seat-container {
  display: grid;
  grid-template-columns: 4fr 1.2fr; /* 좌석맵 : 사이드 = 4:1.2 */
  gap: 60px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0;
}
```

📌 기존 `3fr 1fr`보다 좌석맵에 더 많은 공간을 배정해 균형 개선.

---

## 🎨 2️⃣ 좌석맵 영역 강화

```css
.seat-map {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 40px 24px;
  height: 640px;
  min-width: 900px; /* 시각적 중심 확보 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
```

📌 좌석맵 영역을 실제 중심 비율로 확대 → 페이지가 왼쪽으로 치우치지 않음.

---

## 🖌️ 3️⃣ 무대 (STAGE) 스타일링

```css
.stage {
  background: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  color: #111827;
  width: 280px;
  padding: 12px 0;
  margin-bottom: 30px;
  font-size: 18px;
  letter-spacing: 1px;
}
```

📌 STAGE를 중심선으로 두어 좌석의 기준점 역할 수행.

---

## 🎨 4️⃣ 좌석 Placeholder (시각적 밸런스용)

```css
.seat-placeholder {
  flex: 1;
  width: 100%;
  background: linear-gradient(135deg, #f3f4f6 25%, #f9fafb 25%, #f9fafb 50%, #f3f4f6 50%, #f3f4f6 75%, #f9fafb 75%, #f9fafb 100%);
  background-size: 40px 40px;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-weight: 500;
  font-size: 15px;
}
```

📌 좌석맵이 비어있더라도 전체 밸런스를 유지.  
후에 SVG / Canvas 좌석맵으로 교체 가능.

---

## ⚙️ 5️⃣ 반응형 대응 (모바일)

```css
@media (max-width: 768px) {
  .seat-container {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 20px;
  }
  .seat-sidebar {
    order: -1; /* 모바일에서는 상단으로 이동 */
  }
  .seat-map {
    min-width: auto;
    height: 500px;
  }
}
```

---

## ✅ 결과 요약

| 구역 | 설명 |
|------|------|
| **좌측 (4fr)** | STAGE + 좌석맵 (중앙 배치, 넓은 영역) |
| **우측 (1.2fr)** | 범례, 가격표, 예매정보 |
| **전체 화면** | 완벽한 중앙 정렬 및 비율 안정 |
| **모바일** | 1열 전환으로 반응형 최적화 |

---

📌 **추가 제안**
- `좌석 클릭 시 → 선택색 (#2dd36f)` 적용  
- `좌석 Hover 시 Tooltip (A열 3번, 15,000원)` 추가  
- `좌석 선택 완료` 버튼 활성화 시 결제 단계 연동  

---

**작성일:** 2025-10-30  
**버전:** React UI Feedback Round 9  
**작성자:** ChatGPT (GPT-5)
