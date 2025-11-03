# 🧩 Seat Map Grid & Height Fix Guide (`seat-map-grid-fix.md`)

> **문제 요약:**  
> 좌석맵(`SeatMap`)이 렌더링은 되지만 화면에 표시되지 않거나 찌그러져 보이는 현상은  
> `seat-map`과 `seat-container`의 grid/flex 높이 계산이 꼬여서 발생합니다.

---

## 🎯 원인 요약

| 구역 | 문제점 | 설명 |
|------|---------|------|
| `seat-container` | `items-start` 속성 | grid 컬럼의 높이가 수축되어 내부 flex가 0이 됨 |
| `seat-map` | 높이 없음 | 내부 `flex-grow`가 작동하지 않아 좌석맵이 사라짐 |
| `seat-map-content` | 부모 높이 의존 | 부모의 `height:auto` 상태에서 확장 불가 |

---

## ✅ 수정 방향 요약

| 수정 항목 | 수정 내용 | 효과 |
|------------|------------|------|
| 1️⃣ `seat-container` | `items-stretch` 적용 | grid 컬럼 높이를 세로로 늘림 |
| 2️⃣ `seat-map` | `min-h` 및 `h-[calc(100vh-240px)]` 지정 | 부모 높이 확보 |
| 3️⃣ `seat-map-content` | `flex-1 + min-h` 적용 | 자식 Flex가 공간을 올바르게 채움 |

---

## 🧱 수정 코드 예시 (최종 버전)

```tsx
<div className="seat-container w-full max-w-[1600px] justify-center 
p-5 md:py-[40px] md:px-0 font-pretendard grid grid-cols-1 
md:grid-cols-[5fr_1.3fr] gap-6 md:gap-[60px] items-stretch">

  <div className="seat-map flex flex-col flex-1 min-h-[720px] h-[calc(100vh-240px)] 
  bg-white border rounded-xl p-[40px] shadow-[0_2px_8px_rgba(0,0,0,0.05)]">

    <div className="stage font-semibold text-center mb-4">STAGE</div>

    <div className="section-tabs flex justify-center gap-4 mb-4">
      <button className="px-4 py-2 bg-gray-100 rounded-md">1층</button>
      <button className="px-4 py-2 bg-gray-100 rounded-md">2층</button>
      <button className="px-4 py-2 bg-gray-100 rounded-md">3층</button>
    </div>

    <div className="seat-map-content flex-1 flex items-center justify-center w-full min-h-[520px] h-full">
      <SeatMap area={selectedArea} selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
    </div>
  </div>
</div>
```

---

## 🎨 CSS 레이아웃 설명

| 클래스 | 의미 |
|---------|------|
| `items-stretch` | Grid 컬럼의 세로 크기를 자식 높이에 맞게 확장 |
| `flex-1` | Flex 컨테이너에서 남은 공간을 채움 |
| `min-h-[720px]` | 최소 높이 보장 (좌석맵이 보이도록) |
| `h-[calc(100vh-240px)]` | 화면 높이에 따라 비율 조정 |
| `shadow-[0_2px_8px_rgba(0,0,0,0.05)]` | 시각적 분리감 강화 |

---

## 🧠 디버깅 체크리스트

1. `F12 → Elements`로 `.seat-map`과 `.seat-map-content`의 실제 높이를 확인  
2. `seat-container`가 `items-stretch`로 되어 있는지 체크  
3. `SeatMap` 내부 grid(`display:grid`)가 정상적으로 렌더링되는지 확인  
4. 좌석이 `<div class="seat">` 형태로 DOM에 찍히는데 안 보이면 → 높이 문제 확실

---

## ✅ 예상 결과

- 좌석맵 영역이 명확히 표시되고, grid 좌석들이 정렬됨  
- 뷰포트 크기 변화에도 안정적인 레이아웃 유지  
- 구역(1층/2층 등) 버튼 전환 시에도 좌석맵 영역이 찌그러지지 않음

---

📅 **작성일:** 2025-10-31  
🧩 **버전:** Seat Map Grid Fix 1.0  
✍ **작성자:** ChatGPT (GPT-5)
