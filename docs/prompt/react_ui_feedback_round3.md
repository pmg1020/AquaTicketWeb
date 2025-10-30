# 🎟️ React 예매 UI 멜론티켓 스타일 피드백 (3차 최종 개선안)

> **대상:** React + TypeScript 예매 UI (보안문자 → 좌석 선택)  
> **목표:** 멜론티켓 수준의 시각적 완성도 및 사용자 경험(UX) 완성

---

## 🎯 3차 피드백 요약 (최종 디테일링 단계)

| 항목 | 현재 상태 | 개선 방향 |
|------|-------------|-------------|
| **모달 배경 흐림 정도** | 배경이 약간 어두움 (`rgba(0,0,0,0.65)`) | 약간 밝게 (`rgba(0,0,0,0.45)`) 조정 |
| **모달 폰트 계층** | 본문과 제목의 구분이 약함 | 제목 Bold / 설명 회색톤 구분 |
| **입력칸 포커스 효과** | 기본 파랑(border) | 브랜드 컬러(`border: 2px solid #22c55e`) |
| **입력완료 버튼 hover** | 색 변화만 있음 | hover 시 **scale-up (transform: scale(1.02))** |
| **좌석 선택 레이아웃** | 기본 grid 안정적 | 무대 영역 상단 배치, 간격 균등화 |
| **결제 버튼 여백** | 불균형 | 위아래 여백 동일(16px) 정렬 |
| **폰트톤** | 기본 sans-serif | `Pretendard`, `Noto Sans KR` 추천 |

---

## 🧱 1️⃣ 모달 시각적 완성도 향상

```css
.modal-dim {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  width: 360px;
}

.modal-box h3 {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 8px;
}

.modal-box p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 16px;
}

input[type="text"] {
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 15px;
  margin-top: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input[type="text"]:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
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
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-confirm:hover {
  background: #16a34a;
  transform: scale(1.02);
}
```

➡️ 중앙 정렬 + 부드러운 흐림 배경 + 포커스 효과가 더해져 시각적으로 완성도 향상.

---

## 🧩 2️⃣ 좌석 선택 페이지 마감 디테일

```css
.seat-container {
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  gap: 24px;
  align-items: start;
  max-width: 1160px;
  margin: 0 auto;
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
}

.seat-sidebar {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pay-btn {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.2s ease, transform 0.1s ease;
}

.pay-btn:hover {
  background: #16a34a;
  transform: scale(1.02);
}
```

---

## 💡 3️⃣ 인터랙션 및 UX 흐름

```
1️⃣ 페이지 진입 시
   → 배경 좌석도 흐리게 표시
   → 중앙에 보안문자 모달 등장

2️⃣ 인증 입력 완료 시
   → "보안문자 인증 성공!" 토스트 노출
   → 모달 fade-out / 좌석도 활성화

3️⃣ 좌석 선택 완료 시
   → 우측 결제 정보 자동 업데이트
   → "결제하기" 버튼 활성화
```

---

## ✅ 최종 결과 요약

- 중앙 정렬된 보안문자 모달  
- 흐림 배경 및 포커스 강조 효과  
- 좌석 선택 화면은 grid 기반의 안정적 2단 구성  
- Pretendard/Noto Sans KR 폰트로 세련된 느낌 유지  
- Hover 시 버튼 scale 애니메이션으로 인터랙션 강화  

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
