// src/pages/PerformanceDetail.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";


import {
  fetchPerformanceDetail,
  fetchPerformancePrices,
  type KopisDetailRaw,
  type KopisPriceItem,
} from "@/api/kopis";





import "@/css/performance-detail.css";


type CalValue = Date | null;

export default function PerformanceDetail() {
  const { id } = useParams<{ id: string }>();

  const [detail, setDetail] = useState<KopisDetailRaw | null>(null);
  const [prices, setPrices] = useState<KopisPriceItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<CalValue>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [id]);

  useEffect(() => {
    const handleBookingCompleted = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data.type === 'booking-completed') {
        // 예매 완료 메시지를 받으면 부모창 새로고침
        window.location.reload();
      }
    };

    window.addEventListener('message', handleBookingCompleted);
    return () => {
      window.removeEventListener('message', handleBookingCompleted);
    };
  }, []); // 의존성 배열은 비워둡니다.

  // ⏱️ 회차(시간) 목록: KOPIS의 dtguidance(예: "화~금 19시 / 토 14시, 19시 ...")를 파싱하기 전
  //   데모용으로 간단히 두 개 시간 슬롯을 노출. 실제로는 날짜에 따라 스케줄 생성/표시.
  const timeSlots: string[] = useMemo(() => {
    if (!selectedDate) return [];
    // 예시: 14:00, 19:00 고정
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

  console.log({ detail, detailPoster: detail?.poster });

  const onClickBook = async () => {
    if (!id || !selectedDate || !selectedTime) {
      toast.error("공연 정보가 올바르지 않습니다. 날짜와 회차를 먼저 선택해주세요.");
      return;
    }
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const d = String(selectedDate.getDate()).padStart(2, "0");
    const day = `${y}-${m}-${d}`;

    const seatSelectionUrl = `/book/select-seats?k=${id}&d=${day}&t=${selectedTime}`;

    const bookWindow = window.open(seatSelectionUrl, 'bookPage', 'width=1200,height=800');

    if (!bookWindow || bookWindow.closed) {
        toast.error('팝업 차단이 설정되어 있습니다. 팝업 허용 후 다시 시도해주세요.');
        return; // 팝업이 차단되었으므로 이후 로직 실행 중단
    }
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

      {/* 날짜/회차 선택 섹션 (박스 안 3단 구조로 변경) */}
      <section className="selection-box">
        <div className="triple-layout">
          {/* Col 1: Calendar */}
          <div className="triple-col calendar-pane">
            <h2 className="sectionTitle">날짜 선택</h2>
            <div className="calendar-wrapper">
              <Calendar
                onChange={(val) => {
                  const v = Array.isArray(val) ? (val[0] as Date) : (val as Date);
                  setSelectedDate(v);
                  setSelectedTime(null); // 날짜 바뀌면 시간 초기화
                }}
                value={selectedDate as unknown as Date}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          </div>

          {/* Col 2: Time Slots */}
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

          {/* Col 3: Price & Booking */}
          <div className="triple-col price-pane">
            <h2 className="sectionTitle">좌석 및 가격</h2>
            {prices.length > 0 && (
              <div className="price-panel">
                <h4 className="price-title">좌석 등급별 가격</h4>
                <div className="price-rows">
                  {prices.map((line, i) => (
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

      {/* 소개 이미지 */}
      <section className="intro">
        <h2 className="introTitle">소개 이미지</h2>
        <div className="introGrid">
          {Array.isArray(detail.styurls) && detail.styurls.length > 0 && (
            <>
              {detail.styurls.map((url, i) => (
                <img key={i} className="introImg" src={url} alt={`소개 ${i + 1}`} />
              ))}
            </>
          )}
        </div>
      </section>

      <div style={{ height: "300px", margin: "40px 0" }}>
        <p>이곳에 상세 정보(출연진, 공지사항, FAQ 등)가 추가되어 스크롤이 길어집니다.</p>
      </div>
    </div>
  );
}
