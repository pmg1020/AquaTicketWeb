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

  // ✅ 반응형 스케일 (멜론티켓 수준)
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

  return (
    <div className="seat-selection-page relative">
      {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}

      <div className={showCaptcha ? "pointer-events-none blur-sm brightness-90" : ""}>
        {!selectedZone ? (
          <div className="seatmap-container" ref={containerRef}>
            {/* 🎟 좌측 SVG 영역 */}
            <div className="seatmap-left">
              <SvgSeatMap
                onZoneSelect={(zoneId) => setSelectedZone(zoneId)}
                hoverType={hoverType}
              />

              {/* ✅ 좌측 하단 안내바 */}
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
                    <span>구역을 먼저 선택해주세요 (화면 또는 우측 좌석등급 클릭)</span>
                  )}
                  <button className="toggle-btn">{isExpanded ? "︿" : "﹀"}</button>
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

            {/* 📋 우측 사이드 패널 */}
            <aside className="seat-sidebar full-height">
              <div className="sidebar-mini-map">
                <SvgSeatMap onZoneSelect={() => {}} />
                <p className="mini-map-caption">좌석도 전체보기</p>
              </div>

              <h3 className="sidebar-title">좌석등급 / 잔여석</h3>
              <ul className="sidebar-seat-list">
                <li
                  className="seat-item"
                  onMouseEnter={() => setHoverType("standing")}
                  onMouseLeave={() => setHoverType(null)}
                >
                  <div className="flex items-center">
                    <span className="color-box standing"></span> 스탠딩석
                  </div>
                  <span className="price">132,000원</span>
                </li>
                <li
                  className="seat-item"
                  onMouseEnter={() => setHoverType("seat")}
                  onMouseLeave={() => setHoverType(null)}
                >
                  <div className="flex items-center">
                    <span className="color-box seat"></span> 지정석
                  </div>
                  <span className="price">132,000원</span>
                </li>
              </ul>

              <button className="sidebar-btn">좌석 선택 완료</button>
            </aside>
          </div>
        ) : (
          <div className="seatmap-container" ref={containerRef}>
            <div className="seatmap-left">
              <SeatMap
                zoneId={selectedZone}
                onBack={() => setSelectedZone(null)}
                onSeatCountChange={(count: number) =>
                  setSelectedSeats(
                    Array.from({ length: count }, (_, i) => `${selectedZone} ${i + 301}`)
                  )
                }
              />

              {/* ✅ 하단 안내바 */}
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
                  <button className="toggle-btn">{isExpanded ? "︿" : "﹀"}</button>
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
            <aside className="seat-sidebar full-height">
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
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
