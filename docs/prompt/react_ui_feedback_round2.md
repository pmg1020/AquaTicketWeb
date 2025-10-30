# 🎟️ React 예매 UI 멜론티켓 스타일 피드백 (2차 개선안)

> **대상:** React + TypeScript 예매 UI (보안문자 → 좌석 선택)  
> **목표:** 멜론티켓 수준의 시각적 완성도 및 UX 개선

---

## 🎯 전체 피드백 요약

| 항목 | 현재 상태 | 개선 방향 |
|------|-------------|-------------|
| **모달 위치** | 화면 우측 하단 고정 | 중앙 정렬 + 배경 dim 처리 |
| **배경** | 완전 검정색 (`#000`) | 반투명 블러 처리 (`rgba(0,0,0,0.6)`) |
| **입력창 정렬** | 간격 불균형 | 여백 통일 및 중심 정렬 |
| **버튼 컬러** | 채도 높은 초록색 | 멜론톤 그린 (`#22c55e`) |
| **모달 그림자** | 거의 없음 | `0 6px 20px rgba(0,0,0,0.25)` 추가 |
| **폰트 크기** | 약간 작음 | h3: 18px, p: 14px, input: 15px |
| **좌석 페이지** | 단일 카드 구조 | 좌우 grid 분리 (좌석도 / 사이드패널) |

---

## 🧱 1️⃣ 보안문자 모달 구조 개선

### ✅ 개선 CSS

```css
.modal-dim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(2px);
  z-index: 1000;
}

.modal-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  padding: 32px 36px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  width: 360px;
}

.captcha-img {
  margin: 16px auto;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 8px 12px;
}

input[type="text"] {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 15px;
  margin-top: 10px;
}

.btn-confirm {
  background: #22c55e;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  margin-top: 16px;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-confirm:hover {
  background: #16a34a;
}
```

➡️ 중앙 정렬, 반투명 배경, 그림자까지 적용되어 멜론티켓과 거의 동일한 느낌 구현 가능.

---

## 🧩 2️⃣ 좌석 선택 페이지 구조 개선

### ✅ 개선 CSS

```css
.seat-container {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 24px;
  align-items: start;
  max-width: 1160px;
  margin: 0 auto;
}

.seat-map {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 24px;
}

.seat-sidebar {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
```

### ✅ 컴포넌트 구조 예시

```tsx
<div className="seat-container">
  <div className="seat-map">
    <div className="stage">무대</div>
    {/* 좌석도 SVG or Seat Blocks */}
  </div>

  <div className="seat-sidebar">
    <h4>좌석 등급별 가격</h4>
    <ul>
      <li>VIP석 15,000원</li>
      <li>일반석 12,000원</li>
    </ul>
    <hr />
    <div className="reservation-info">
      <p>선택 좌석: 없음</p>
      <p>총 결제 금액: 0원</p>
      <button className="pay-btn">결제하기</button>
    </div>
  </div>
</div>
```

---

## 💡 3️⃣ 인터랙션 개선 (UX 관점)

| 항목 | 설명 |
|------|------|
| **모달 등장/닫힘** | `opacity + scale` 애니메이션으로 fade 효과 |
| **인증 성공 알림** | `toast.success("보안문자 인증 성공!")` |
| **입력 오류 시** | 빨간 테두리 + `@keyframes shake` |
| **배경 클릭 방지** | 인증 완료 전까지 닫기 불가 설정 |

---

## 🧭 4️⃣ 결과 구조 요약

```
SeatSelectPage
 ├─ <SeatContainer>
 │    ├─ <SeatMap />
 │    └─ <SeatSidebar />
 └─ <CaptchaModal /> (모달 오버레이)
```

- 보안문자 모달은 중앙 정렬로 표시  
- 인증 성공 시 fade-out 애니메이션으로 자연스럽게 닫힘  
- 좌석도는 Grid 기반으로 안정된 구조  

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
