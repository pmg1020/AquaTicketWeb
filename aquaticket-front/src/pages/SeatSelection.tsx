import React, { useState, useEffect, useRef } from "react";
import SvgSeatMap from "../components/maps/SvgSeatMap";
import SeatMap from "../components/maps/SeatMap";
import CaptchaModal from "../components/modals/CaptchaModal";

import "@/css/maps/base.css";
import "@/css/maps/layout.css";
import "@/css/maps/seatmap.css";
import "@/css/maps/bottom-bar.css";

const SeatSelection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverType, setHoverType] = useState<"standing" | "seat" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCaptchaSuccess = () => setShowCaptcha(false);

  // ✅ 반응형 스케일 (멜론티켓 수준) - 기존 로직 유지
  useEffect(() => {
    const baseWidth = 1280;
    let frame: number;

    const applyScale = () => {
      if (!containerRef.current) return;
      const viewportWidth = window.innerWidth;
      const pixelRatio = window.devicePixelRatio || 1;
      const effectiveWidth = viewportWidth * pixelRatio * 0.5;
      const scale = Math.max(0.5, Math.min(1, effectiveWidth / baseWidth));
      containerRef.current.style.transform = `scale(${scale})`;
      containerRef.current.style.transformOrigin = "top center";
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyScale);
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);

    window.addEventListener("resize", applyScale);
    applyScale();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", applyScale);
    };
  }, []);

  const toggleBar = () => setIsExpanded(!isExpanded);

  // zone이 선택되지 않은 상태 (메인 좌석도)
  if (!selectedZone) {
    return (
      <div className="seatmap-container grow" ref={containerRef}>
        {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}
        <div className="seatmap-left">

          {/* ⭐️ 상단 UI 헤더 - 로고 제거 */}
          <div className="top-ui-header">
            <div className="title-area">좌석 선택</div>
            <div className="info-area">
              <span className="concert-title-text">2025 N.Flying LIVE '&CON4 ENCORE : Let's Roll &4...</span>
              <select className="time-select">
                <option>2025.12.19 (금) 19:30</option>
              </select>
            </div>
          </div>

          {/* SVG 지도 컴포넌트는 남은 공간을 flex-grow로 채웁니다. */}
          <SvgSeatMap
            onZoneSelect={(zoneId) => setSelectedZone(zoneId)}
            hoverType={hoverType}
          />

          {/* ⭐️ 하단 안내바를 seatmap-left 안으로 이동 */}
          <div className={`seat-info-bar ${isExpanded ? "expanded" : ""}`} onClick={toggleBar}>
            <div className="seat-info-header">
              <span>
                구역을 먼저 선택해주세요 <span className="sub-text">(화면을 직접 선택하거나 우측 좌석등급을 선택해주세요)</span>
              </span>
              <button className="toggle-btn">∧</button>
            </div>

            <div className="seat-info-content">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((seat, idx) => (
                  <div key={idx} className="seat-detail">
                    FLOOR층 {seat}번
                  </div>
                ))
              ) : (
                <p className="empty-text">선택된 좌석이 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* 📋 우측 사이드 패널 - 레퍼런스 UI 적용 */}
        <aside className="seat-sidebar">
          {/* 로고 */}
          <div className="sidebar-logo">Aqua Ticket</div>

          {/* 미니맵 */}
          <div className="sidebar-mini-map">
            {/* 줌 컨트롤 */}
            <div className="mini-map-controls">
              <button className="zoom-btn">+</button>
              <button className="zoom-btn">−</button>
            </div>
            <div className="mini-map-wrapper">
              <SvgSeatMap onZoneSelect={() => { }} />
            </div>
          </div>

          {/* 좌석도 전체보기 버튼 */}
          <button className="view-full-map-btn">
            좌석도 전체보기 ›
          </button>

          {/* 좌석등급/잔여석 섹션 */}
          <div className="sidebar-section">
            <div className="sidebar-title-wrapper">
              <h3 className="sidebar-title">좌석등급/잔여석</h3>
              <button className="info-icon">ⓘ</button>
            </div>

            <ul className="sidebar-seat-list">
              <li
                className="seat-item"
                onMouseEnter={() => setHoverType("standing")}
                onMouseLeave={() => setHoverType(null)}
              >
                <div className="seat-item-header">
                  <div className="seat-item-left">
                    <span className="color-box standing"></span>
                    <span>스탠딩석</span>
                  </div>
                  <div className="seat-item-right">
                    <span className="price">132,000원</span>
                    <span className="expand-arrow">∨</span>
                  </div>
                </div>
              </li>
              <li
                className="seat-item"
                onMouseEnter={() => setHoverType("seat")}
                onMouseLeave={() => setHoverType(null)}
              >
                <div className="seat-item-header">
                  <div className="seat-item-left">
                    <span className="color-box seat"></span>
                    <span>지정석</span>
                  </div>
                  <div className="seat-item-right">
                    <span className="price">132,000원</span>
                    <span className="expand-arrow">∨</span>
                  </div>
                </div>
              </li>
            </ul>

            {/* 새로고침 버튼 */}
            <button className="refresh-btn">새로고침</button>
          </div>

          {/* 좌석 선택 완료 버튼 */}
          <button className="sidebar-btn">좌석 선택 완료</button>
        </aside>
      </div>
    );
  }

  // zone이 선택된 상태 (상세 좌석도) - 이 부분도 동일하게 수정해야 합니다.
  return (
    <div className="seat-selection-page relative h-screen overflow-hidden w-screen flex flex-col">
      {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}
      <div className={showCaptcha ? "pointer-events-none blur-sm brightness-90 flex flex-col h-full" : "flex flex-col h-full"}>
        <div className="seatmap-container grow">
          <div className="seatmap-left">
            {/* ⭐️ top-ui-header - 로고 제거 */}
            <div className="top-ui-header">
              <div className="title-area">좌석 선택</div>
              <div className="info-area">
                <span className="concert-title-text">2025 N.Flying LIVE '&CON4 ENCORE : Let's Roll &4...</span>
                <select className="time-select">
                  <option>2025.12.19 (금) 19:30</option>
                </select>
              </div>
            </div>
            {/* ⭐️ 상단 UI 추가 후 SeatMap 컴포넌트 렌더링 */}
            <SeatMap
              zoneId={selectedZone}
              onBack={() => setSelectedZone(null)}
              onSeatCountChange={(count: number) =>
                setSelectedSeats(
                  Array.from({ length: count }, (_, i) => `${selectedZone} ${i + 301}`)
                )
              }
            />

            {/* ⭐️ 하단 안내바를 seatmap-left 안으로 이동 */}
            <div
              className={`seat-info-bar ${isExpanded ? "expanded" : ""}`}
              onClick={() => setIsExpanded((p) => !p)}
            >
              <div className="seat-info-header">
                {selectedSeats.length > 0 ? (
                  <span>
                    선택한 좌석 총{" "}
                    <span className="highlight">{selectedSeats.length}석</span>이 선택되었습니다.
                  </span>
                ) : (
                  <span>좌석을 선택해주세요.</span>
                )}
                <button className="toggle-btn">∧</button>
              </div>

              <div className="seat-info-content">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seat, idx) => (
                    <div key={idx} className="seat-detail">
                      FLOOR층 {seat}번
                    </div>
                  ))
                ) : (
                  <p className="empty-text">선택된 좌석이 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* 📋 우측 패널 (선택 후) */}
          <aside className="seat-sidebar">
            <div className="sidebar-body">
              <h3 className="sidebar-title">현재 구역: {selectedZone}</h3>
              <p>
                선택한 좌석: <b>{selectedSeats.length}</b>석
              </p>
            </div>

            <div className="sidebar-footer">
              <button
                className={`complete-btn ${!selectedSeats.length ? "disabled" : ""}`}
                disabled={!selectedSeats.length}
              >
                좌석 선택 완료
              </button>
              <button className="back-btn" onClick={() => setSelectedZone(null)}>
                ← 구역으로 돌아가기
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;