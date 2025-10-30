# 🎟️ 멜론티켓 예매 페이지 구조 (예매하기 클릭 시)

> **페이지 경로:**  
> https://ticket.melon.com/reservation/popup/onestop.htm  
>  
> **구성 개요:**  
> 예매하기 버튼 클릭 → 새 창(`popup`) 열림 → 좌석 선택 페이지 표시 →  
> 그 위에 보안문자 입력 모달(`layer popup`) 등장

---

## 🧱 전체 흐름 요약

```
공연 상세 페이지
    ↓ (예매하기 버튼 클릭)
[새 팝업창 onestop.htm]
    ↓
좌석 선택 페이지
    ├─ 좌석도(SVG/Canvas)
    ├─ 우측 가격표/등급
    ├─ 하단 안내 영역
    └─ [보안문자 입력 모달]
```

---

## 1️⃣ 공연 상세 페이지

- URL: `https://ticket.melon.com/performance/index.htm?prodId=...`
- 주요 기능:
  - 공연명, 일정, 장소 확인
  - "예매하기" 버튼 클릭 시 팝업창 오픈

```js
window.open('https://ticket.melon.com/reservation/popup/onestop.htm', '_blank', 'width=1200,height=800');
```

---

## 2️⃣ 좌석 선택 페이지 (onestop.htm)

### 🧩 구성 요소

| 영역 | 설명 |
|------|------|
| **상단 헤더** | 공연명 (`IVE WORLD TOUR <SHOW WHAT I AM>`) / 날짜·시간 선택 드롭다운 |
| **좌석도 영역** | SVG 또는 Canvas 기반의 좌석 배치도 (클릭으로 구역 선택) |
| **우측 사이드바** | 좌석 등급 (VIP석, 일반석, 시야제한석) 및 가격 표시 |
| **하단 안내 영역** | `구역을 먼저 선택해주세요` / `좌석 선택 완료` 버튼 |
| **배경 레이아웃** | 배경은 전체 레이아웃을 dim 처리, 중앙에 모달 표시 |

---

## 3️⃣ 보안문자 입력 모달 (인증예매)

- 좌석 선택 전에 나타나는 **보안 인증 단계**
- 별도의 새 창이 아닌, **Layer Popup (div modal)** 구조

```html
<div class="modal-dim"></div> <!-- 배경 어둡게 처리 -->
<div class="modal-captcha">
  <h3>인증예매</h3>
  <p>부정예매 방지를 위해 보안문자를 입력해주세요.</p>

  <div class="captcha-box">
    <img src="/captcha_image" alt="보안문자 이미지" />
    <input type="text" placeholder="보안문자 입력" />
  </div>

  <button class="btn-confirm">입력완료</button>
</div>
```

### 💡 특징
- `div`로 구성된 중앙 고정형 모달
- 배경은 `opacity`로 어둡게, 클릭 불가 (`pointer-events: none`)
- 입력 완료 시 AJAX 요청으로 서버 검증 수행

---

## 4️⃣ 동작 구조 요약

```
1. 예매하기 클릭
   → 새 창(window.open) 생성
2. onestop.htm 로드
   → 좌석도/가격/안내 UI 표시
3. 보안문자 모달 등장
   → 사용자가 이미지 내 문자열 입력
4. 입력 완료 클릭
   → 서버 측 CAPTCHA 검증
   → 성공 시 좌석 선택 가능
```

---

## ⚙️ 기술적 포인트

| 항목 | 내용 |
|------|------|
| **팝업방식** | `window.open()`을 이용한 독립 HTML 페이지 |
| **좌석도 렌더링** | JavaScript 기반 (SVG / Canvas 인터랙션) |
| **보안문자 로직** | 서버 세션 기반 CAPTCHA 검증 |
| **UI 구조** | 모달(layer popup) + dim 처리 배경 |
| **라이브러리** | jQuery, Melon 자체 JS 모듈 가능성 높음 |

---

## 📄 참고 문장 (설명용)

> “멜론티켓 예매 시스템은 예매하기 클릭 시 새 팝업창이 열리며,  
> 좌석도와 가격 정보를 표시하는 페이지 위에 보안문자 입력 모달이 오버레이되어  
> 인증을 완료해야 좌석 선택이 가능하도록 설계되어 있습니다.”

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
