# 🧩 Seat Map Layout Fix Guide (`seat-map-layout-fix.md`)

> **문제 요약:**  
> 좌석맵이 정상적으로 렌더링되고 있음에도, 부모 Flex 컨테이너(`seat-map-content`)가 높이를 차지하지 않아  
> 화면에 표시되지 않거나 0px로 수축되는 문제 발생.

---

## 🎯 문제 원인

- `seat-map-content`에 `flex-grow`만 적용되어 있음.  
- 하지만 부모(`seat-map`)이 `flex-col` 또는 `height: auto` 상태라 **자식이 확장할 기준 높이 없음**.  
- 결과적으로 grid는 생성되지만, **부모 높이가 0이므로 시각적으로 안 보임.**

---

## ✅ 해결 방법 요약

| 방법 | 설명 |
|------|------|
| **방법 1** | `seat-map-content`에 고정 또는 최소 높이(`min-h-[500px]`) 지정 |
| **방법 2** | 부모(`seat-map`)에 `h-full`과 `min-h`를 지정하여 기준 확보 |
| **방법 3** | 부모와 자식 모두 `flex-1`을 지정해 Flex 내 공간 균등 분배 |

---

## 🧱 방법 1 — `seat-map-content`에 높이 강제

```html
<div class="seat-map-content flex-grow flex items-center justify-center h-full min-h-[500px]">
  <div class="seat-map-wrapper">
    <div class="seat-map grid grid-cols-15 gap-1 justify-center">
      <!-- 좌석들 -->
    </div>
  </div>
</div>
```

📌 **효과:**  
최소 500px 높이를 확보하므로, 좌석 grid가 확실히 보이게 됨.

---

## 🧱 방법 2 — 부모 `.seat-map`에 높이 지정

```html
<div class="seat-map flex flex-col items-center justify-start h-full min-h-[640px] bg-white border rounded-xl">
  <div class="stage">STAGE</div>
  <div class="seat-map-content flex-grow flex items-center justify-center w-full">
    ...
  </div>
</div>
```

📌 **효과:**  
부모 컨테이너가 명시적인 높이를 가지므로, `flex-grow`가 정상적으로 작동함.

---

## 🧱 방법 3 — 부모/자식 모두 `flex-1` 적용 (권장)

```html
<div class="seat-map flex flex-col flex-1">
  <div class="seat-map-content flex-1 flex items-center justify-center w-full">
    <SeatMap ... />
  </div>
</div>
```

📌 **효과:**  
부모와 자식이 모두 동일한 Flex 비율을 가지게 되어 공간 배분이 자동으로 균형 잡힘.

---

## 🎨 추가 개선 — `.seat-map-wrapper` 정렬

좌석 중앙 정렬 및 세로 공간 확보용으로 아래와 같이 보정 가능:

```html
<div class="seat-map-wrapper flex items-center justify-center w-full h-full">
  <div class="seat-map grid grid-cols-15 gap-1">
    <!-- 좌석들 -->
  </div>
</div>
```

---

## 🧠 디버깅 팁

1. **F12 → Elements 패널**에서 `.seat-map-content` 높이 확인  
   - 0이면 위 수정이 필요함.  
2. `.seat`들이 렌더링되어도 안 보인다면, 부모의 높이 문제임.  
3. `.seat-map-wrapper` 높이가 지정되지 않았을 경우, `h-full`로 맞춰야 함.

---

## ✅ 최종 추천 구조 (요약)

```html
<div class="seat-map flex flex-col flex-1 min-h-[640px] bg-white border rounded-xl">
  <div class="stage">STAGE</div>
  <div class="seat-map-content flex-1 flex items-center justify-center w-full min-h-[500px]">
    <SeatMap />
  </div>
</div>
```

---

📅 **작성일:** 2025-10-31  
🧩 **버전:** Seat Map Layout Fix 1.0  
✍ **작성자:** ChatGPT (GPT-5)
