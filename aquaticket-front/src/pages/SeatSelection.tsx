/* /c:/aquaticket/aquaticket-front/src/pages/SeatSelection.tsx */

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
import svgContent from '../assets/seatmap_demo.svg?raw';

import "@/css/maps/base.css";
import "@/css/maps/layout.css";
import "@/css/maps/seatmap.css";
import "@/css/maps/bottom-bar.css";

const MAX_SEATS_PER_PERSON = 2;

const SeatSelection: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    priceInfo,
    setShowtimeId,
    setSelectedSeats: setStoreSelectedSeats,
    setPriceInfo,
    performanceInfo, // ✅ performanceInfo 추가
    setPerformanceInfo, // ✅ setPerformanceInfo 추가
  } = useBookingStore();

  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [availability, setAvailability] = useState<SeatAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [hoverType, setHoverType] = useState<"standing" | "seat" | null>(null);
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

    const initialize = async (priceData: any, performanceData: any) => {
      try {
        setPriceInfo(priceData); // 현재 창의 스토어에 가격 정보 설정
        setPerformanceInfo(performanceData); // 현재 창의 스토어에 공연 정보 설정

        const showtimeId = await ensureShowtime(kopisId, startAt);
        setShowtimeId(showtimeId);

        const seats = await parseSvgSeatmap(svgContent, priceData);
        setAvailability(seats);
      } catch (err) {
        if (isAxiosError(err) && err.response?.status === 401) {
          toast.error("로그인이 필요합니다.");
          navigate(`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`);
        } else {
          setError("좌석 정보를 불러오는데 실패했습니다.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    // --- LocalStorage Polling ---
    let attempts = 0;
    const maxAttempts = 20; // 20 * 100ms = 2 seconds
    const interval = setInterval(() => {
      const storedPriceInfo = localStorage.getItem("temp_price_info");
      const storedPerformanceInfo = localStorage.getItem("temp_performance_info"); // ✅ 공연 정보도 폴링
      attempts++;

      if (storedPriceInfo && storedPerformanceInfo) {
        clearInterval(interval);
        localStorage.removeItem("temp_price_info");
        localStorage.removeItem("temp_performance_info"); // ✅ 공연 정보도 제거

        try {
          const parsedPriceInfo = JSON.parse(storedPriceInfo);
          const parsedPerformanceInfo = JSON.parse(storedPerformanceInfo); // ✅ 공연 정보 파싱
          initialize(parsedPriceInfo, parsedPerformanceInfo); // ✅ initialize에 둘 다 전달
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
  }, [searchParams, setShowtimeId, setPriceInfo, setPerformanceInfo, navigate]); // ✅ setPerformanceInfo 의존성 추가

  const handleCaptchaSuccess = () => setShowCaptcha(false);

  // ✅ 날짜와 시간 포맷팅 헬퍼 함수
  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    };
    const formattedDate = date.toLocaleDateString('ko-KR', options).replace(/\.$/, ''); // "YYYY.MM.DD (요일)"
    return `${formattedDate} ${timeStr}`;
  };

  const MIN_SCALE = 1.0;
  const MAX_SCALE = 3.0;

  // 미니맵 줌 인/아웃 (버튼용)
  const handleZoom = (type: 'in' | 'out') => {
    if (!miniMapRef.current) return;

    const step = 0.1;
    const newScale = type === 'in'
      ? Math.min(MAX_SCALE, miniMapScale + step)
      : Math.max(MIN_SCALE, miniMapScale - step);

    if (newScale === miniMapScale) return;

    // 최소 스케일로 돌아가면 초기화
    if (newScale === MIN_SCALE) {
      setMiniMapScale(newScale);
      setMiniMapTransform({ x: 0, y: -10 });
      return;
    }

    const rect = miniMapRef.current.getBoundingClientRect();
    const svgElement = miniMapRef.current.querySelector('svg');
    if (!svgElement) return;

    // 중앙 기준으로 줌
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const svgCenterX = (centerX - miniMapTransform.x) / miniMapScale;
    const svgCenterY = (centerY - miniMapTransform.y) / miniMapScale;

    let newX = centerX - svgCenterX * newScale;
    let newY = centerY - svgCenterY * newScale;

    // 경계 체크
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
      newY = -10; // offset 유지
    } else {
      const maxY = -10;
      const minY = containerHeight - scaledHeight + 10;
      newY = Math.max(minY, Math.min(maxY, newY));
    }

    setMiniMapScale(newScale);
    setMiniMapTransform({ x: newX, y: newY });
  };

  // 마우스 휠로 줌 (마우스 위치 기준)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!miniMapRef.current) return;

    const rect = miniMapRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, miniMapScale + delta));

    if (newScale === miniMapScale) return;

    // 최소 스케일로 돌아가면 초기화
    if (newScale === MIN_SCALE) {
      setMiniMapScale(newScale);
      setMiniMapTransform({ x: 0, y: -10 });
      return;
    }

    const svgElement = miniMapRef.current.querySelector('svg');
    if (!svgElement) return;

    // 마우스 위치의 SVG 상 좌표
    const svgX = (mouseX - miniMapTransform.x) / miniMapScale;
    const svgY = (mouseY - miniMapTransform.y) / miniMapScale;

    let newX = mouseX - svgX * newScale;
    let newY = mouseY - svgY * newScale;

    // 경계 체크
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
      newY = -10; // offset 유지
    } else {
      const maxY = -10;
      const minY = containerHeight - scaledHeight + 10;
      newY = Math.max(minY, Math.min(maxY, newY));
    }

    setMiniMapScale(newScale);
    setMiniMapTransform({ x: newX, y: newY });
  };

  const toggleBar = () => setIsExpanded(!isExpanded);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // 확대된 상태에서만 드래그 가능
    if (miniMapScale <= MIN_SCALE) return;

    setIsDragging(true);
    setDragStart({
      x: e.clientX - miniMapTransform.x,
      y: e.clientY - miniMapTransform.y
    });
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !miniMapRef.current) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // 경계 체크
    const svgElement = miniMapRef.current.querySelector('svg');
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
        const maxY = -10; // 0 → -10 (초기 offset 고려)
        const minY = containerHeight - scaledHeight + 10; // offset 고려
        boundedY = Math.max(minY, Math.min(maxY, newY));
      } else {
        boundedY = -10; // 중앙 정렬 시에도 offset 유지
      }

      setMiniMapTransform({ x: boundedX, y: boundedY });
    }
  };

  // 드래그 종료
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

  // zone이 선택되지 않은 상태 (메인 좌석도)
  if (!selectedZone) {
    return (
      <div className="seat-selection-page relative overflow-hidden w-screen flex flex-col h-screen">
        {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}
        <div className={showCaptcha ? "pointer-events-none blur-sm brightness-90 flex flex-col h-full" : "flex flex-col h-full"}>
          <div className="seatmap-container">
            <div className="seatmap-left">

              {/* ⭐️ 상단 UI 헤더 */}
              <div className="top-ui-header">
                <div className="title-area">좌석 선택</div>
                <div className="info-area">
                  <span className="concert-title-text">{performanceInfo?.title || "공연 제목"}</span>
                  <select className="time-select">
                    <option>{performanceInfo?.date && searchParams.get("t") ? formatDateTime(performanceInfo.date, searchParams.get("t")!) : "날짜 및 시간"}</option>
                  </select>
                </div>
              </div>

              {/* ❌ 안내 문구 바 제거됨 */}

              <SvgSeatMap
                onZoneSelect={(zoneId) => setSelectedZone(zoneId)}
                hoverType={hoverType}
              />

              {/* ⭐️ 하단 안내바 */}
              <div className={`seat-info-bar ${isExpanded ? "expanded" : ""}`} onClick={toggleBar}>
                <div className="seat-info-header">
                  <span>
                    구역을 먼저 선택해주세요 <span className="sub-text">(1인 최대 {MAX_SEATS_PER_PERSON}매 선택 가능)</span>
                  </span>
                  <button className="toggle-btn">∧</button>
                </div>

                <div className="seat-info-content">
                  {selectedSeats.length > 0 ? (
                    availability
                      .filter(seat => selectedSeats.includes(String(seat.seatId)))
                      .map((seat) => (
                        <div key={seat.seatId} className="seat-detail">
                          {seat.zone} / {seat.row}열 {seat.number}번
                        </div>
                      ))
                  ) : (
                    <p className="empty-text">선택된 좌석이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            {/* 📋 우측 사이드 패널 */}
            <aside className="seat-sidebar">
              {/* 로고 */}
              <div className="sidebar-logo">Aqua Ticket</div>

              {/* ⭐️ 미니맵: 마우스 휠 줌 지원 */}
              <div className="sidebar-mini-map">
                {/* 줌 컨트롤 */}
                <div className="mini-map-controls">
                    <button className="zoom-btn" onClick={() => handleZoom('in')}>+</button>
                    <button className="zoom-btn" onClick={() => handleZoom('out')}>−</button>
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
                    cursor: miniMapScale > MIN_SCALE ? (isDragging ? 'grabbing' : 'grab') : 'default'
                  }}
                >
                  <div style={{
                    transform: `translate(${miniMapTransform.x}px, ${miniMapTransform.y}px) scale(${miniMapScale})`,
                    transformOrigin: '0 0',
                    transition: isDragging ? 'none' : 'transform 0.1s ease',
                    pointerEvents: isDragging ? 'none' : 'auto',
                  }}>
                    <SvgSeatMap
                      onZoneSelect={(zoneId) => setSelectedZone(zoneId)}
                      isMiniMap={true}
                    />
                  </div>
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
                {priceInfo.map((p) => {
                  const isStanding = p.grade.includes("스탠딩");
                  return (
                    <li
                      key={p.grade}
                      className="seat-item"
                      onMouseEnter={() => setHoverType(isStanding ? "standing" : "seat")}
                      onMouseLeave={() => setHoverType(null)}
                    >
                      <div className="seat-item-header">
                        <div className="seat-item-left">
                          <span className={`color-box ${isStanding ? "standing" : "seat"}`}></span>
                          <span>{p.grade}</span>
                        </div>
                        <div className="seat-item-right">
                          <span className="price">{p.price}</span>
                          <span className="expand-arrow">∨</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
                </ul>

                {/* 새로고침 버튼 */}
                <button className="refresh-btn">새로고침</button>
              </div>

              {/* 좌석 선택 완료 버튼 */}
              <button className="sidebar-btn" onClick={handleCompleteSelection} disabled={selectedSeats.length === 0}>좌석 선택 완료</button>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  // zone이 선택된 상태 (상세 좌석도)
  return (
    <div className="seat-selection-page relative overflow-hidden w-screen flex flex-col h-screen">
      {showCaptcha && <CaptchaModal onSuccess={handleCaptchaSuccess} />}
      <div className={showCaptcha ? "pointer-events-none blur-sm brightness-90 flex flex-col h-full" : "flex flex-col h-full"}>
        <div className="seatmap-container">
          <div className="seatmap-left">
            {/* ⭐️ top-ui-header */}
            <div className="top-ui-header">
              <div className="title-area">좌석 선택</div>
              <div className="info-area">
                <span className="concert-title-text">{performanceInfo?.title || "공연 제목"}</span>
                <select className="time-select">
                  <option>{performanceInfo?.date && searchParams.get("t") ? formatDateTime(performanceInfo.date, searchParams.get("t")!) : "날짜 및 시간"}</option>
                </select>
              </div>
            </div>

            {/* ❌ 안내 문구 바 제거됨 */}

            {/* ⭐️ 상세 좌석도 컴포넌트 렌더링 */}
            <SeatMap
              zoneId={selectedZone}
              onBack={() => setSelectedZone(null)}
              maxSeats={MAX_SEATS_PER_PERSON}
              availability={availability}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />

            {/* ⭐️ 하단 안내바 */}
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
                  <span>좌석을 선택해주세요. (1인 최대 {MAX_SEATS_PER_PERSON}매)</span>
                )}
                <button className="toggle-btn">∧</button>
              </div>

              <div className="seat-info-content">
                {selectedSeats.length > 0 ? (
                  availability
                    .filter(seat => selectedSeats.includes(String(seat.seatId)))
                    .map((seat) => (
                      <div key={seat.seatId} className="seat-detail">
                        {seat.zone} / {seat.row}열 {seat.number}번
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
                onClick={handleCompleteSelection}
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