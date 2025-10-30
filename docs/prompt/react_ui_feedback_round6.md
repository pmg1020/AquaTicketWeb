# 🎟️ React 좌석 선택 페이지 개선안 (6차 — 멜론티켓 구조 적용)

> **대상:** AquaTicket / 공연 예매 UI  
> **목표:** 멜론티켓과 유사한 단계별 좌석 선택 및 구역 전환 UI 구현

---

## 🎯 목표

| 항목 | 현재 구현 | 목표 형태 (멜론티켓형) | 개선 포인트 |
|------|-------------|----------------|-------------|
| **레이아웃 구조** | 단일 페이지 (무대 + 가격표 + 예매정보) | 좌석 맵(좌) + 요약 정보(우) | `Grid` 2단 구조 적용 |
| **좌석 시각화 방식** | 단순 블록 | 원형/섹션형 좌석도 | SVG 기반 배치 |
| **좌석 구역 전환** | 없음 | 클릭 시 `FLOOR / 1F / 2F` 전환 | 구역 상태(`useState`) 추가 |
| **좌석 상태 표시** | 텍스트 중심 | 색상 중심 (잔여석, 예매완료) | color legend 도입 |
| **결제 요약 영역** | 별도 카드 | 고정 사이드 패널 | `sticky sidebar` 구현 |

---

## 🧩 React 컴포넌트 구조 예시

```
SeatSelectPage.tsx
├── Header (공연 정보)
├── SeatLayout
│   ├── SeatMap (SVG 좌석 배치)
│   ├── SeatSection (FLOOR, 1F, 2F)
│   ├── SeatTooltip (hover 시 좌석 정보)
├── SeatSidebar
│   ├── SeatLegend (좌석 색상 안내)
│   ├── SeatSummary (선택 좌석/가격 합계)
│   ├── PayButton
```

---

## 🧱 기본 레이아웃 CSS

```css
.seat-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;
}

.stage {
  text-align: center;
  background: #f5f6f7;
  border-radius: 10px;
  padding: 14px 0;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
}

.seat-map {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 24px;
  height: 620px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 100px;
}
```

---

## 🎨 좌석맵 (SVG 예시)

```tsx
<svg viewBox="0 0 600 400">
  <text x="300" y="40" textAnchor="middle" fontWeight="700">STAGE</text>

  {/* VIP 좌석 */}
  <g fill="#d4b48c">
    <rect x="180" y="100" width="40" height="40" rx="6" />
    <rect x="380" y="100" width="40" height="40" rx="6" />
  </g>

  {/* 일반석 */}
  <g fill="#b4b9ff">
    {Array.from({ length: 10 }).map((_, i) => (
      <rect key={i} x={150 + i * 30} y={200} width="20" height="20" rx="4" />
    ))}
  </g>
</svg>
```

📌 이후 `onClick` 이벤트로 좌석 선택 → 색상 변경 및 state 업데이트.

---

## ⚙️ 구역 전환 구조 (FLOOR / 1F / 2F)

```tsx
const [section, setSection] = useState<'floor' | '1f' | '2f'>('floor');

return (
  <div className="seat-map">
    <div className="section-tabs">
      {['floor', '1f', '2f'].map((lvl) => (
        <button
          key={lvl}
          className={section === lvl ? 'active' : ''}
          onClick={() => setSection(lvl)}
        >
          {lvl.toUpperCase()}
        </button>
      ))}
    </div>

    {section === 'floor' && <FloorMap />}
    {section === '1f' && <FirstFloorMap />}
    {section === '2f' && <SecondFloorMap />}
  </div>
);
```

📌 각 층별로 `SVG`를 분리해 구역 전환 구현 가능.

---

## 🎨 좌석 색상 코드 (Legend)

| 구분 | 색상 코드 | 의미 |
|------|------------|------|
| VIP석 | `#d4b48c` | 고급석 |
| 일반석 | `#b4b9ff` | 일반 구역 |
| 시야제한석 | `#f7c4d4` | 제한 구역 |
| 선택석 | `#2dd36f` | 사용자가 선택 |
| 비활성 | `#e5e7eb` | 예매 완료 |

---

## ✅ 핵심 개선 요약

| 구역 | 적용 항목 | 기대 효과 |
|------|-------------|-------------|
| **좌석맵** | SVG 기반 원형 배치 | 실제 공연장 형태 재현 |
| **구역 전환** | useState + Component 분리 | 층별/구역별 전환 가능 |
| **시각 표시** | 색상 기반 좌석 상태 | 직관적인 예매 경험 |
| **사이드바** | Sticky 구조 | 스크롤 시 정보 고정 |
| **UX 완성도** | Hover Tooltip + 클릭 피드백 | 멜론티켓 수준의 인터랙션 |

---

**작성일:** 2025-10-30  
**작성자:** ChatGPT (GPT-5)
