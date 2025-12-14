// src/pages/PerformanceDetail.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import "@/css/performance-detail-tabs.css";

import {
  fetchPerformanceDetail,
  fetchPerformancePrices,
  type KopisDetailRaw,
  type KopisPriceItem,
} from "@/api/kopis";
import KakaoMap from "@/components/maps/KakaoMap";

import useBookingStore from "@/stores/useBookingStore";

import "@/css/performance-detail.css";

type CalValue = Date | null;
type TabKey = "detail" | "venue" | "booking";

export default function PerformanceDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { setPriceInfo, setPerformanceInfo } = useBookingStore();

  const [detail, setDetail] = useState<KopisDetailRaw | null>(null);
  const [prices, setPrices] = useState<KopisPriceItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<CalValue>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ 탭 상태 추가
  const [activeTab, setActiveTab] = useState<TabKey>("detail");

  useEffect(() => {
    let alive = true;
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        const [d, p] = await Promise.all([
          fetchPerformanceDetail(id),
          fetchPerformancePrices(id),
        ]);
        if (!alive) return;
        setDetail(d);
        setPrices(p);
        setPerformanceInfo({
          title: d.prfnm,
          date: d.prfpdfrom,
          venue: d.fcltynm,
          posterUrl: d.poster,
        });
        setPriceInfo(p);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [id, setPerformanceInfo, setPriceInfo]);

  const timeSlots: string[] = useMemo(() => {
    if (!selectedDate) return [];
    return ["14:00", "19:00"];
  }, [selectedDate]);

  const { minDate, maxDate } = useMemo(() => {
    if (!detail) return { minDate: undefined, maxDate: undefined };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const fromDate = detail.prfpdfrom
      ? new Date(detail.prfpdfrom.replace(/\./g, "-"))
      : undefined;

    const toDate = detail.prfpdto
      ? new Date(detail.prfpdto.replace(/\./g, "-"))
      : undefined;

    let effectiveMinDate = fromDate;

    if (!effectiveMinDate || effectiveMinDate < today) {
      effectiveMinDate = today;
    }

    return { minDate: effectiveMinDate, maxDate: toDate };
  }, [detail]);

  const displayPrices = useMemo(() => {
    if (!prices || prices.length === 0) return [];

    const priceStringToNumber = (s: string) => parseInt(s.replace(/[^\d]/g, ""), 10) || 0;

    const sortedPrices = [...prices]
      .map(p => ({ ...p, numericPrice: priceStringToNumber(p.price) }))
      .filter(p => p.numericPrice > 0)
      .sort((a, b) => b.numericPrice - a.numericPrice);

    if (sortedPrices.length >= 2) {
      return [
        { grade: "스탠딩석", price: `${sortedPrices[0].numericPrice.toLocaleString()}원` },
        { grade: "지정석", price: `${sortedPrices[1].numericPrice.toLocaleString()}원` },
      ];
    } else if (sortedPrices.length === 1) {
      return [
        { grade: "전석", price: `${sortedPrices[0].numericPrice.toLocaleString()}원` },
      ];
    }

    return [];
  }, [prices]);

  if (loading) {
    return (
      <div className="page-detail-wrapper">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="page-detail-wrapper">
        <div className="loading">공연 정보를 불러올 수 없습니다.</div>
      </div>
    );
  }

  const title = detail.prfnm ?? "-";
  const subline = `${detail.prfpdfrom ?? "-"} ~ ${detail.prfpdto ?? "-"}`;

  const onClickBook = async () => {
    if (!id || !selectedDate || !selectedTime) {
      toast.error("공연 정보가 올바르지 않습니다. 날짜와 회차를 먼저 선택해주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("로그인이 필요합니다.");
      const currentPath = window.location.pathname + window.location.search;
      navigate(`/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    try {
      localStorage.setItem("temp_price_info", JSON.stringify(displayPrices));
      const perfInfo = {
        title: detail.prfnm,
        date: detail.prfpdfrom,
        venue: detail.fcltynm,
        posterUrl: detail.poster,
      };
      localStorage.setItem("temp_performance_info", JSON.stringify(perfInfo));
    } catch (e) {
      console.error("Failed to save info to localStorage", e);
      toast.error("예매를 진행할 수 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const d = String(selectedDate.getDate()).padStart(2, "0");
    const day = `${y}-${m}-${d}`;

    const seatSelectionUrl = `/book/select-seats?k=${id}&d=${day}&t=${selectedTime}`;

    const popupWidth = 990;
    const popupHeight = 820;

    const left = window.screenX + (window.outerWidth - popupWidth) / 2;
    const top = window.screenY + (window.outerHeight - popupHeight) / 2;

    const windowFeatures = `
      width=${popupWidth},
      height=${popupHeight},
      left=${left},
      top=${top},
      resizable=yes,
      scrollbars=yes
    `;

    window.open(seatSelectionUrl, "aquaticket_booking", windowFeatures);
  };

  return (
    <div className="page-detail-wrapper">
      {/* 상단 포스터 및 기본 정보 섹션 */}
      <section className="melon-detail-header">
        <div className="melon-poster-area">
          <img src={detail.poster} alt={detail.prfnm} />
        </div>
        <div className="melon-info-area">
          <h1 className="melon-title">{title}</h1>

          <ul className="melon-infoList">
            <li><strong className="melon-label">장르</strong><span className="melon-value">{detail.genrenm}</span></li>
            <li><strong className="melon-label">공연 기간</strong><span className="melon-value">{subline}</span></li>
            <li><strong className="melon-label">공연 장소</strong><span className="melon-value">{detail.fcltynm}</span></li>
            <li><strong className="melon-label">공연 시간</strong><span>{detail.dtguidance}</span></li>
            <li><strong className="melon-label">런타임</strong><span>{detail.prfruntime}</span></li>
            <li><strong className="melon-label">관람 연령</strong><span>{detail.prfage}</span></li>
          </ul>

          <div className="melon-actions">
            <button className="melon-like-btn">
              <i className="icon-like"></i> 관심공연
            </button>
            <button className="melon-share-btn">공유</button>
          </div>
        </div>
      </section>

      {/* 날짜/회차 선택 섹션 */}
      <section className="selection-box">
        <div className="triple-layout">
          <div className="triple-col calendar-pane">
            <h2 className="sectionTitle">날짜 선택</h2>
            <div className="calendar-wrapper">
              <Calendar
                onChange={(val) => {
                  const v = Array.isArray(val) ? (val[0] as Date) : (val as Date);
                  setSelectedDate(v);
                  setSelectedTime(null);
                }}
                value={selectedDate as unknown as Date}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          </div>

          <div className="triple-col time-pane">
            <h2 className="sectionTitle">회차 선택</h2>
            <p className="selected-date-msg">
              {selectedDate ? selectedDate.toLocaleDateString() : "날짜를 먼저 선택하세요"}
            </p>
            <div className="time-slots">
              {timeSlots.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`time-slot-btn ${selectedTime === t ? "active" : ""}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="triple-col price-pane">
            <h2 className="sectionTitle">좌석 및 가격</h2>
            {displayPrices.length > 0 && (
              <div className="price-panel">
                <h4 className="price-title">좌석 등급별 가격</h4>
                <div className="price-rows">
                  {displayPrices.map((line, i) => (
                    <div key={i} className={`price-row ${!line.price || line.price.trim() === "0원" ? 'muted' : ''}`}>
                      <span className="grade">{line.grade}</span>
                      <span className="amount">
                        {line.price && line.price.trim() !== "0원" && line.price.trim() !== "000원" && line.price.trim() !== "0"
                          ? line.price
                          : "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              className="melon-book-btn wide"
              onClick={onClickBook}
              disabled={!selectedDate || !selectedTime}
            >
              예매하기
            </button>
          </div>
        </div>
      </section>

      {/* ✅ 탭 네비게이션 */}
      <section className="detail-tabs-section">
        <div className="detail-tabs">
          <button
            className={`detail-tab ${activeTab === "detail" ? "active" : ""}`}
            onClick={() => setActiveTab("detail")}
          >
            상세정보
          </button>
          <button
            className={`detail-tab ${activeTab === "venue" ? "active" : ""}`}
            onClick={() => setActiveTab("venue")}
          >
            공연장정보
          </button>
          <button
            className={`detail-tab ${activeTab === "booking" ? "active" : ""}`}
            onClick={() => setActiveTab("booking")}
          >
            예매안내
          </button>
        </div>

        {/* ✅ 탭 컨텐츠 */}
        <div className="detail-tab-content">
          {/* 상세정보 탭 */}
          {activeTab === "detail" && (
            <div className="tab-pane">
              <h2 className="content-title">소개 이미지</h2>
              <div className="introGrid">
                {Array.isArray(detail.styurls) && detail.styurls.length > 0 ? (
                  detail.styurls.map((url, i) => (
                    <img key={i} className="introImg" src={url} alt={`소개 ${i + 1}`} />
                  ))
                ) : (
                  <p className="no-content">소개 이미지가 없습니다.</p>
                )}
              </div>
            </div>
          )}

          {/* 공연장정보 탭 */}
          {activeTab === "venue" && (
            <div className="tab-pane">
              <div className="venue-info-box">
                <h2 className="venue-title">{detail.fcltynm}</h2>
                {detail.area && (
                  <p className="venue-address">{detail.area}</p>
                )}
              </div>

              <div className="venue-map-wrapper">
                <h3 className="map-title">공연장 위치</h3>
                <KakaoMap venueName={detail.fcltynm} venueArea={detail.area} />
              </div>
            </div>
          )}

          {/* 예매안내 탭 */}
          {activeTab === "booking" && (
            <div className="tab-pane">
              <h2 className="content-title">예매 안내</h2>
              <div className="booking-guide">
                <div className="guide-section">
                  <h3>예매 방법</h3>
                  <ul>
                    <li>날짜와 회차를 선택한 후 예매하기 버튼을 클릭하세요.</li>
                    <li>좌석 선택 후 결제를 진행하시면 예매가 완료됩니다.</li>
                  </ul>
                </div>

                <div className="guide-section">
                  <h3>취소/환불 안내</h3>
                  <ul>
                    <li>공연 시작 전까지 전액 환불 가능합니다.</li>
                    <li>부분 취소는 불가능하며, 전체 취소만 가능합니다.</li>
                  </ul>
                </div>

                <div className="guide-section">
                  <h3>유의사항</h3>
                  <ul>
                    <li>예매 시 입력한 정보를 확인해주세요.</li>
                    <li>공연 당일 신분증을 지참해주세요.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}