import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SvgSeatMap from "../components/maps/SvgSeatMap";
import SeatMap from "../components/maps/SeatMap";
import CaptchaModal from "../components/modals/CaptchaModal";
import useBookingStore from "@/stores/useBookingStore";
import { ensureShowtime, type SeatAvailability } from "@/api/booking";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";

import { parseSvgSeatmap } from "../utils/svgSeatParser";
import svgContent from "../assets/seatmap_demo.svg?raw";

import "@/css/maps/base.css";
import "@/css/maps/layout.css";
import "@/css/maps/seatmap.css";
import "@/css/maps/bottom-bar.css";
import type { KopisPriceItem } from "@/api/kopis.types";
import type { PerformanceInfo } from "@/stores/useBookingStore";

const MAX_SEATS_PER_PERSON = 2;

const SeatSelection: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    priceInfo,
    setShowtimeId,
    setSelectedSeats: setStoreSelectedSeats,
    setPriceInfo,
    performanceInfo,
    setPerformanceInfo,
  } = useBookingStore();

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [availability, setAvailability] = useState<SeatAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverType, setHoverType] = useState<"standing" | "seat" | null>(null);

  // ⭐ 좌석등급 아코디언 열려있는 등급
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);

  const [miniMapScale, setMiniMapScale] = useState(1.0);
  const [miniMapTransform, setMiniMapTransform] = useState({ x: 0, y: -10 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const miniMapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const kopisId = searchParams.get("k");
    const date = searchParams.get("d");
    const time = searchParams.get("t");

    if (!kopisId || !date || !time) {
      setError("잘못된 접근입니다. 공연 정보가 없습니다.");
      setLoading(false);
      return;
    }

    const startAt = `${date}T${time}:00`;

    const initialize = async (priceData: KopisPriceItem[], performanceData: PerformanceInfo) => {
      try {
        setPriceInfo(priceData);
        setPerformanceInfo(performanceData);

        const showtimeId = await ensureShowtime(kopisId, startAt);
        setShowtimeId(showtimeId);

        const seats = await parseSvgSeatmap(svgContent, priceData);
        setAvailability(seats);
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
          toast.error("로그인이 필요합니다.");
          navigate(
            `/login?next=${encodeURIComponent(
              window.location.pathname + window.location.search
            )}`
          );
        } else {
          setError("좌석 정보를 불러오는데 실패했습니다.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(() => {
      const storedPriceInfo = localStorage.getItem("temp_price_info");
      const storedPerformanceInfo = localStorage.getItem(
        "temp_performance_info"
      );
      attempts++;

      if (storedPriceInfo && storedPerformanceInfo) {
        clearInterval(interval);
        localStorage.removeItem("temp_price_info");
        localStorage.removeItem("temp_performance_info");

        try {
          const parsedPriceInfo = JSON.parse(storedPriceInfo);
          const parsedPerformanceInfo = JSON.parse(storedPerformanceInfo);
          initialize(parsedPriceInfo, parsedPerformanceInfo);
        } catch (e) {
          setError("정보 파싱에 실패했습니다.");
          setLoading(false);
        }
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        toast.error("필수 정보를 가져오지 못했습니다. 다시 시도해주세요.");
        setError("필수 정보가 없습니다.");
        setLoading(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [searchParams, setShowtimeId, setPriceInfo, setPerformanceInfo, navigate]);

  const handleCaptchaSuccess = () => setShowCaptcha(false);

  // 날짜 + 시간 포맷터
  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };
    const formattedDate = date
      .toLocaleDateString("ko-KR", options)
      .replace(/\.$/, "");
    return `${formattedDate} ${timeStr}`;
  };

  // ⭐ 등급별로 어떤 구역이 포함되는지 계산
  const getZonesForGrade = (grade: string): string[] => {
    const isStanding = grade.includes("스탠딩");
    const zoneSet = new Set<string>();

    availability.forEach((seat) => {
      const zoneId = String(seat.zone || "");
      if (!zoneId) return;

      const isStandingZone = zoneId.toLowerCase().includes("standing");

      // 스탠딩석: STANDING 이 포함된 구역만
      if (isStanding && isStandingZone) {
        zoneSet.add(zoneId);
      }
      // 지정석: 나머지 구역들
      if (!isStanding && !isStandingZone) {
        zoneSet.add(zoneId);
      }
    });

    return Array.from(zoneSet).sort();
  };

  // ⭐ zone id → 화면에 보여줄 라벨
  const getZoneLabel = (zoneId: string): string => {
    const lower = zoneId.toLowerCase();

    if (lower.includes("standing")) {
      const match = lower.match(/standing[-_]?([a-z])/i);
      if (match) {
        return `STANDING ${match[1].toUpperCase()}`;
      }
      return "STANDING";
    }

    const numMatch = zoneId.match(/(\d+)$/);
    if (numMatch) {
      return `${numMatch[1]}구역`;
    }

    return zoneId;
  };

  // ⭐ 좌석등급 클릭 시 아코디언 토글
  const handleGradeClick = (grade: string) => {
    setExpandedGrade((prev) => (prev === grade ? null : grade));
  };

  const MIN_SCALE = 1.0;
  const MAX_SCALE = 3.0;

  const handleZoom = (type: "in" | "out") => {
    if (!miniMapRef.current) return;

    const step = 0.1;
    const newScale =
      type === "in"
        ? Math.min(MAX_SCALE, miniMapScale + step)
        : Math.max(MIN_SCALE, miniMapScale - step);

    if (newScale === miniMapScale) return;

    if (newScale === MIN_SCALE) {
      setMiniMapScale(newScale);
      setMiniMapTransform({ x: 0, y: -10 });
      return;
    }

    const rect = miniMapRef.current.getBoundingClientRect();
    const svgElement = miniMapRef.current.querySelector("svg");
    if (!svgElement) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const svgCenterX = (centerX - miniMapTransform.x) / miniMapScale;
    const svgCenterY = (centerY - miniMapTransform.y) / miniMapScale;

    let newX = centerX - svgCenterX * newScale;
    let newY = centerY - svgCenterY * newScale;

    const svgRect = svgElement.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    const svgOriginalWidth = svgRect.width / miniMapScale;
    const svgOriginalHeight = svgRect.height / miniMapScale;
    const scaledWidth = svgOriginalWidth * newScale;
    const scaledHeight = svgOriginalHeight * newScale;

    if (scaledWidth <= containerWidth) {
      newX = (containerWidth - scaledWidth) / 2;
    } else {
      const maxX = 0;
      const minX = containerWidth - scaledWidth;
      newX = Math.max(minX, Math.min(maxX, newX));
    }

    if (scaledHeight <= containerHeight) {
      newY = -10;
    } else {
      const maxY = -10;
      const minY = containerHeight - scaledHeight + 10;
      newY = Math.max(minY, Math.min(maxY, newY));
    }

    setMiniMapScale(newScale);
    setMiniMapTransform({ x: newX, y: newY });
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!miniMapRef.current) return;

    const rect = miniMapRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(
      MAX_SCALE,
      Math.max(MIN_SCALE, miniMapScale + delta)
    );

    if (newScale === miniMapScale) return;

    if (newScale === MIN_SCALE) {
      setMiniMapScale(newScale);
      setMiniMapTransform({ x: 0, y: -10 });
      return;
    }

    const svgElement = miniMapRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgX = (mouseX - miniMapTransform.x) / miniMapScale;
    const svgY = (mouseY - miniMapTransform.y) / miniMapScale;

    let newX = mouseX - svgX * newScale;
    let newY = mouseY - svgY * newScale;

    const svgRect = svgElement.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;
    const svgOriginalWidth = svgRect.width / miniMapScale;
    const svgOriginalHeight = svgRect.height / miniMapScale;
    const scaledWidth = svgOriginalWidth * newScale;
    const scaledHeight = svgOriginalHeight * newScale;

    if (scaledWidth <= containerWidth) {
      newX = (containerWidth - scaledWidth) / 2;
    } else {
      const maxX = 0;
      const minX = containerWidth - scaledWidth;
      newX = Math.max(minX, Math.min(maxX, newX));
    }

    if (scaledHeight <= containerHeight) {
      newY = -10;
    } else {
      const maxY = -10;
      const minY = containerHeight - scaledHeight + 10;
      newY = Math.max(minY, Math.min(maxY, newY));
    }

    setMiniMapScale(newScale);
    setMiniMapTransform({ x: newX, y: newY });
  };

  const toggleBar = () => setIsExpanded(!isExpanded);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (miniMapScale <= MIN_SCALE) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - miniMapTransform.x,
      y: e.clientY - miniMapTransform.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !miniMapRef.current) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const svgElement = miniMapRef.current.querySelector("svg");
    if (svgElement) {
      const rect = miniMapRef.current.getBoundingClientRect();
      const svgRect = svgElement.getBoundingClientRect();

      const containerWidth = rect.width;
      const containerHeight = rect.height;
      const svgOriginalWidth = svgRect.width / miniMapScale;
      const svgOriginalHeight = svgRect.height / miniMapScale;
      const scaledWidth = svgOriginalWidth * miniMapScale;
      const scaledHeight = svgOriginalHeight * miniMapScale;

      let boundedX = newX;
      let boundedY = newY;

      if (scaledWidth > containerWidth) {
        const maxX = 0;
        const minX = containerWidth - scaledWidth;
        boundedX = Math.max(minX, Math.min(maxX, newX));
      } else {
        boundedX = (containerWidth - scaledWidth) / 2;
      }

      if (scaledHeight > containerHeight) {
        const maxY = -10;
        const minY = containerHeight - scaledHeight + 10;
        boundedY = Math.max(minY, Math.min(maxY, newY));
      } else {
        boundedY = -10;
      }

      setMiniMapTransform({ x: boundedX, y: boundedY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) => {
      const isSelected = prev.includes(seatId);
      if (isSelected) {
        return prev.filter((id) => id !== seatId);
      } else {
        if (prev.length >= MAX_SEATS_PER_PERSON) {
          toast.error(`최대 ${MAX_SEATS_PER_PERSON}석까지만 선택 가능합니다.`);
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const handleCompleteSelection = () => {
    const seatsToStore = availability.filter((seat) =>
      selectedSeats.includes(String(seat.seatId))
    );
    setStoreSelectedSeats(seatsToStore);
    navigate("/book/payment");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // ---------- 메인 좌석도 (zone 미선택) ----------
  if (!selectedZone) {
    return (
      <div className="seat-selection-page relative overflow-hidden w-screen flex flex-col h-screen">
        {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}
        <div
          className={
            showCaptcha
              ? "pointer-events-none blur-sm brightness-90 flex flex-col h-full"
              : "flex flex-col h-full"
          }
        >
          <div className="seatmap-container">
            <div className="seatmap-left">
              <div className="top-ui-header">
                <div className="title-area">좌석 선택</div>
                <div className="info-area">
                  <span className="concert-title-text">
                    {performanceInfo?.title || "공연 제목"}
                  </span>
                  <select className="time-select">
                    <option>
                      {performanceInfo?.date && searchParams.get("t")
                        ? formatDateTime(
                          performanceInfo.date,
                          searchParams.get("t")!
                        )
                        : "날짜 및 시간"}
                    </option>
                  </select>
                </div>
              </div>

              <SvgSeatMap
                onZoneSelect={(zoneId) => setSelectedZone(zoneId)}
                hoverType={hoverType}
              />

              <div
                className={`seat-info-bar ${isExpanded ? "expanded" : ""}`}
                onClick={toggleBar}
              >
                <div className="seat-info-header">
                  <span>
                    구역을 먼저 선택해주세요{" "}
                    <span className="sub-text">
                      (1인 최대 {MAX_SEATS_PER_PERSON}매 선택 가능)
                    </span>
                  </span>
                  <button className="toggle-btn">∧</button>
                </div>

                <div className="seat-info-content">
                  {selectedSeats.length > 0 ? (
                    availability
                      .filter((seat) =>
                        selectedSeats.includes(String(seat.seatId))
                      )
                      .map((seat) => (
                        <div
                          key={seat.seatId}
                          className="seat-detail"
                        >
                          {seat.zone} / {seat.row}열{" "}
                          {seat.number}번
                        </div>
                      ))
                  ) : (
                    <p className="empty-text">선택된 좌석이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            {/* ---------- 우측 패널 ---------- */}
            <aside className="seat-sidebar">
              <div className="sidebar-logo">Aqua Ticket</div>

              <div className="sidebar-mini-map">
                <div className="mini-map-controls">
                  <button
                    className="zoom-btn"
                    onClick={() => handleZoom("in")}
                  >
                    +
                  </button>
                  <button
                    className="zoom-btn"
                    onClick={() => handleZoom("out")}
                  >
                    −
                  </button>
                </div>
                <div
                  className="mini-map-wrapper"
                  ref={miniMapRef}
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{
                    cursor:
                      miniMapScale > MIN_SCALE
                        ? isDragging
                          ? "grabbing"
                          : "grab"
                        : "default",
                  }}
                >
                  <div
                    style={{
                      transform: `translate(${miniMapTransform.x}px, ${miniMapTransform.y}px) scale(${miniMapScale})`,
                      transformOrigin: "0 0",
                      transition: isDragging ? "none" : "transform 0.1s ease",
                      pointerEvents: isDragging ? "none" : "auto",
                    }}
                  >
                    <SvgSeatMap
                      onZoneSelect={(zoneId) => setSelectedZone(zoneId)}
                      isMiniMap={true}
                    />
                  </div>
                </div>
              </div>

              <button className="view-full-map-btn">
                좌석도 전체보기 ›
              </button>

              {/* ---------- 좌석등급/잔여석 & 아코디언 ---------- */}
              <div className="sidebar-section">
                <div className="sidebar-title-wrapper">
                  <h3 className="sidebar-title">좌석등급/잔여석</h3>
                  <button className="info-icon">ⓘ</button>
                </div>

                <ul className="sidebar-seat-list">
                  {priceInfo.map((p) => {
                    const isStanding = p.grade.includes("스탠딩");
                    const zones = getZonesForGrade(p.grade);
                    const opened = expandedGrade === p.grade;

                    return (
                      <li
                        key={p.grade}
                        className={`seat-item ${opened ? "opened" : ""}`}
                        onMouseEnter={() =>
                          setHoverType(isStanding ? "standing" : "seat")
                        }
                        onMouseLeave={() => setHoverType(null)}
                      >
                        <button
                          type="button"
                          className="seat-item-header"
                          onClick={() => handleGradeClick(p.grade)}
                        >
                          <div className="seat-item-left">
                            <span
                              className={`color-box ${isStanding ? "standing" : "seat"
                                }`}
                            ></span>
                            <span>{p.grade}</span>
                          </div>
                          <div className="seat-item-right">
                            <span className="price">{p.price}</span>
                            <span
                              className={`expand-arrow ${opened ? "open" : ""
                                }`}
                            >
                              ∨
                            </span>
                          </div>
                        </button>

                        {opened && zones.length > 0 && (
                          <ul className="seat-grade-zone-list">
                            {zones.map((zoneId) => (
                              <li key={zoneId}>
                                <button
                                  type="button"
                                  className="zone-row"
                                  onClick={() => setSelectedZone(zoneId)}
                                >
                                  {getZoneLabel(zoneId)}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}

                        {opened && zones.length === 0 && (
                          <p className="no-zone-text">이 등급에 해당하는 구역이 없습니다.</p>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <button className="refresh-btn">새로고침</button>
              </div>

              <button
                className="sidebar-btn"
                onClick={handleCompleteSelection}
                disabled={selectedSeats.length === 0}
              >
                좌석 선택 완료
              </button>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // ---------- 상세 좌석도 (zone 선택 후) ----------
  return (
    <div className="seat-selection-page relative overflow-hidden w-screen flex flex-col h-screen">
      {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}
      <div
        className={
          showCaptcha
            ? "pointer-events-none blur-sm brightness-90 flex flex-col h-full"
            : "flex flex-col h-full"
        }
      >
        <div className="seatmap-container">
          <div className="seatmap-left">
            <div className="top-ui-header">
              <div className="title-area">좌석 선택</div>
              <div className="info-area">
                <span className="concert-title-text">
                  {performanceInfo?.title || "공연 제목"}
                </span>
                <select className="time-select">
                  <option>
                    {performanceInfo?.date && searchParams.get("t")
                      ? formatDateTime(
                        performanceInfo.date,
                        searchParams.get("t")!
                      )
                      : "날짜 및 시간"}
                  </option>
                </select>
              </div>
            </div>

            <SeatMap
              zoneId={selectedZone}
              onBack={() => setSelectedZone(null)}
              maxSeats={MAX_SEATS_PER_PERSON}
              availability={availability}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />

            <div
              className={`seat-info-bar ${isExpanded ? "expanded" : ""}`}
              onClick={() => setIsExpanded((p) => !p)}
            >
              <div className="seat-info-header">
                {selectedSeats.length > 0 ? (
                  <span>
                    선택한 좌석 총{" "}
                    <span className="highlight">
                      {selectedSeats.length}석
                    </span>
                    이 선택되었습니다.
                  </span>
                ) : (
                  <span>
                    좌석을 선택해주세요. (1인 최대 {MAX_SEATS_PER_PERSON}매)
                  </span>
                )}
                <button className="toggle-btn">∧</button>
              </div>

              <div className="seat-info-content">
                {selectedSeats.length > 0 ? (
                  availability
                    .filter((seat) =>
                      selectedSeats.includes(String(seat.seatId))
                    )
                    .map((seat) => (
                      <div
                        key={seat.seatId}
                        className="seat-detail"
                      >
                        {seat.zone} / {seat.row}열{" "}
                        {seat.number}번
                      </div>
                    ))
                ) : (
                  <p className="empty-text">선택된 좌석이 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          <aside className="seat-sidebar">
            <div className="sidebar-body">
              <h3 className="sidebar-title">현재 구역: {selectedZone}</h3>
              <p>
                선택한 좌석: <b>{selectedSeats.length}</b>석
              </p>
            </div>

            <div className="sidebar-footer">
              <button
                className={`complete-btn ${!selectedSeats.length ? "disabled" : ""
                  }`}
                disabled={!selectedSeats.length}
                onClick={handleCompleteSelection}
              >
                좌석 선택 완료
              </button>
              <button
                className="back-btn"
                onClick={() => setSelectedZone(null)}
              >
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
