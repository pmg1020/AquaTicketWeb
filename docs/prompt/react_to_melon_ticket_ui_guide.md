# 🎟️ React 예매 UI → 멜론티켓 스타일 전환 가이드 (CLI용)

> **목표:**  
> 현재 React + TypeScript 기반 좌석 선택 UI를 멜론티켓 예매 UI처럼 개선하는 구조/디자인 가이드

---

## 🎯 목표 구조 요약

현재 구조:
- `Captcha → 인증 성공 시 → SeatSelect 화면 이동`

변경 후 구조 (멜론티켓 스타일):
- `Popup(좌석선택)` 내에서 **Modal 형태의 Captcha**가 뜸  
- 인증 성공 시 모달이 닫히고, 같은 페이지의 좌석도가 활성화됨

---

## 🧱 구조 비교

| 구분 | 현재 UI | 멜론티켓 스타일 |
|------|-----------|----------------|
| **전환 방식** | 페이지 이동 | 동일 페이지 내 모달 |
| **보안문자 위치** | 전체 검은 배경 | 좌석도 위 오버레이 |
| **좌석도 표시 시점** | 인증 후 렌더링 | 항상 렌더링, 단 인증 전 비활성화 |
| **UI 구성** | 단일 카드 | 좌석도 + 사이드 패널 + 모달 오버레이 |

---

## 🛠️ 수정 포인트

### 1️⃣ 페이지 이동 제거 → 모달 오버레이 표시

```tsx
// SeatSelectPage.tsx
export default function SeatSelectPage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="seat-select-page">
      <SeatMap disabled={!isVerified} />
      <Sidebar />
      {!isVerified && <CaptchaModal onSuccess={() => setIsVerified(true)} />}
    </div>
  );
}
```

---

### 2️⃣ 모달 배경(dim) 및 본체 스타일

```css
.modal-dim {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 1000;
}

.modal-box {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
```

---

### 3️⃣ 보안문자 입력 UI 개선

```tsx
<div className="captcha-modal">
  <h3>인증예매</h3>
  <p>부정예매 방지를 위해 보안문자를 입력해주세요.</p>
  <img src={captchaImageUrl} alt="보안문자" className="captcha-img" />
  <input type="text" placeholder="보안문자 입력" />
  <button className="btn-confirm">입력완료</button>
</div>
```

```css
.captcha-modal h3 {
  font-weight: 600;
  margin-bottom: 8px;
}
.captcha-img {
  display: block;
  margin: 12px auto;
  padding: 6px 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
.btn-confirm {
  background: #22c55e;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
```

---

### 4️⃣ 좌석도 + 사이드 패널 2단 레이아웃

```tsx
<div className="seat-layout">
  <div className="seat-map">{/* SVG 좌석도 */}</div>
  <div className="seat-sidebar">{/* 등급/가격/버튼 */}</div>
</div>
```

```css
.seat-layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  align-items: start;
}
```

---

### 5️⃣ 인증 성공 시 애니메이션 (Toast)

```tsx
import { toast } from "react-hot-toast";

function handleSuccess() {
  toast.success("보안문자 인증 성공!");
  setIsVerified(true);
}
```

---

### 6️⃣ 색상 및 폰트 정리

| 요소 | 현재 | 변경 권장 |
|-------|--------|------------|
| 메인 버튼 | 파랑 (`#2563eb`) | 초록 (`#22c55e`) |
| 입력 박스 | 흰색 | 연회색 (`#f5f5f5`) |
| 폰트 | 기본 sans-serif | `Pretendard`, `Noto Sans KR` |
| 그림자 | 없음 | `0 4px 20px rgba(0,0,0,0.2)` |

---

## ✅ 최종 구조 요약

```
SeatSelectPage
 ├─ <SeatLayout>
 │    ├─ <SeatMap />
 │    └─ <SeatSidebar />
 └─ { !isVerified && <CaptchaModal onSuccess={setIsVerified(true)} /> }
```

- **전환 없이 한 페이지 안에서 보안문자 모달이 닫히고**
- **좌석도 인터랙션이 활성화됨**
- **멜론티켓과 동일한 UX 구조 완성**

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
