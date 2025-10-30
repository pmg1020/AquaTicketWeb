# 🎟️ React 예매 UI 멜론티켓 스타일 피드백 (4차 프로덕션 완성 단계)

> **대상:** React + TypeScript 예매 UI (보안문자 → 좌석 선택)  
> **목표:** 멜론티켓 수준의 시각적 완성도 및 프로덕션급 UX 완성

---

## 🎯 4차 피드백 요약

| 항목 | 현재 상태 | 개선 방향 |
|------|-------------|-------------|
| **모달 배경 Blur 효과** | 잘 구현됨 ✅ | `blur(6px)`로 강화하여 초점 분리 향상 |
| **모달 본체 대비** | 배경색과 경계선 구분이 약함 | `border: 1px solid #f3f4f6` 추가 |
| **보안문자 이미지 영역** | 여백이 살짝 작음 | padding 10~12px으로 확대 |
| **입력 필드 포커스 효과** | 단조로움 | inset 그림자 추가로 깊이감 강화 |
| **입력완료 버튼 컬러톤** | 채도 높음 | `#2dd36f` (밝고 모던한 초록) |
| **좌석 선택 카드 그림자** | 약함 | `box-shadow: 0 4px 12px rgba(0,0,0,0.05)` |
| **결제 버튼 hover 피드백** | 색 변화만 있음 | scale-up + ripple 효과 추가 |
| **폰트톤** | 기본 sans-serif | `Pretendard` weight 통일 |

---

## 🧱 1️⃣ 모달 (Captcha) 최종 디자인

```css
.modal-dim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  z-index: 1000;
}

.modal-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 36px 40px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  width: 380px;
}

.captcha-img {
  display: inline-block;
  background: #f9fafb;
  border-radius: 6px;
  padding: 10px 14px;
  margin: 18px 0;
}

input[type="text"] {
  width: 100%;
  border: 1.5px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 15px;
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
}

input[type="text"]:focus {
  outline: none;
  border-color: #2dd36f;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05),
              0 0 0 3px rgba(45, 211, 111, 0.2);
}

.btn-confirm {
  background: #2dd36f;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  padding: 12px 0;
  margin-top: 18px;
  width: 100%;
  font-size: 15px;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.2s ease;
}

.btn-confirm:hover {
  background: #22c55e;
  transform: scale(1.02);
}
```

📌 **핵심 포인트:** 부드러운 blur, border, 그림자를 통해 밝고 안정된 인상.

---

## 🧩 2️⃣ 좌석 선택 페이지 최종 디테일

```css
.seat-container {
  display: grid;
  grid-template-columns: 2.4fr 1fr;
  gap: 24px;
  align-items: start;
  max-width: 1160px;
  margin: 0 auto;
  padding-top: 24px;
  font-family: Pretendard, 'Noto Sans KR', sans-serif;
}

.stage {
  text-align: center;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.seat-sidebar {
  background: #fff;
  border-radius: 10px;
  padding: 22px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.pay-btn {
  background: #2dd36f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px 0;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.pay-btn:hover {
  background: #22c55e;
  transform: scale(1.02);
}
```

💡 `border-radius` 및 그림자 강도를 높여 멜론티켓 느낌을 완벽히 재현.

---

## 💡 3️⃣ UX 향상 제안

| 효과 | 구현 방식 |
|------|------------|
| **입력 완료 시 fade-out** | `framer-motion` → `<motion.div exit={{ opacity: 0, scale: 0.95 }}>` |
| **입력 오류 시 shake 효과** | CSS `@keyframes shake { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-4px);} 40%,80%{transform:translateX(4px);} }` |
| **결제 버튼 클릭 피드백** | `transform: scale(0.97)` 클릭 시 적용 |
| **자동 포커스 기능** | `useEffect(() => inputRef.current?.focus(), [])` |

---

## ✅ 종합 요약

- 💡 **시각 완성도:** 밝고 고급스러운 멜론티켓 UI 완성  
- 🧱 **레이아웃:** 중앙 모달 + 흐림 배경 + 2단 좌석 구조 확립  
- 🎨 **브랜드 컬러:** 초록 계열 `#2dd36f` ~ `#22c55e` 통일  
- ⚙️ **UX 자연스러움:** focus, hover, animation 모두 부드럽게  
- 🧭 **다음 단계:** 애니메이션 및 컴포넌트 분리 (CaptchaModal.tsx / SeatSelectPage.tsx)

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
