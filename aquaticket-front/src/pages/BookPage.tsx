import api from "@/api/axiosInstance"; // api import 추가
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchAvailability,
  createHold,
  confirmBooking,
  releaseHold,
  type SeatAvailability,
  ensureShowtime,
} from "@/api/booking";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import "@/css/book.css";
import { TOKEN_KEY } from "@/api/axiosInstance";

type ZoneGroup = {
  zone: string;
  seats: SeatAvailability[];
};

export default function BookPage() {
  // const { showtimeId: st } = useParams(); // showtimeId 직접 가져오는 부분 제거
  const [search] = useSearchParams();
  const nav = useNavigate();

  // URL 쿼리 파라미터에서 kopisId, day, time 가져오기
  const qKopisId = search.get("k") ?? "";
  const qDay = search.get("d") ?? "";
  const qTime = search.get("t") ?? "";

  const [showtimeId, setShowtimeId] = useState<number | null>(null); // showtimeId 상태로 관리
  const [seats, setSeats] = useState<SeatAvailability[]>([]);
  const [zone, setZone] = useState<string | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [holdId, setHoldId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 캡챠 인증 메시지 처리 및 showtimeId 확보, 그리고 부모창으로부터 토큰을 받는 로직 통합
  useEffect(() => {
    let authToken: string | null = null; // 토큰을 임시 저장할 변수

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      // 1. 토큰 수신 처리
      if (event.data.type === 'auth-token' && event.data.token) {
        console.log("BookPage: Received token from opener", event.data.token);
        localStorage.setItem(TOKEN_KEY, event.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${event.data.token}`;
        authToken = event.data.token; // 토큰 저장
        console.log("BookPage: Token set in localStorage and axios defaults", api.defaults.headers.common['Authorization']);
      }

      // 2. 캡챠 인증 메시지 처리
      if (event.data.type === 'captcha-verified') {
        console.log("BookPage: Captcha verified message received.");
        if (!qKopisId || !qDay || !qTime) {
          toast.error("공연 정보가 올바르지 않습니다.");
          window.close();
          return;
        }

        // 토큰이 아직 설정되지 않았다면 기다리거나 에러 처리
        // 이 부분은 비동기적인 토큰 수신을 고려하여 더 견고하게 만들 수 있습니다.
        // 예를 들어, 토큰이 설정될 때까지 일정 시간 기다리는 로직을 추가할 수 있습니다.
        if (!authToken && !localStorage.getItem(TOKEN_KEY)) {
            toast.error("인증 토큰을 받지 못했습니다. 다시 시도해주세요.");
            window.close();
            return;
        }

        const startAt = `${qDay}T${qTime}:00`;

        try {
            console.log("BookPage: Calling ensureShowtime with", qKopisId, startAt);
            const fetchedShowtimeId = await ensureShowtime(qKopisId, startAt);
            setShowtimeId(fetchedShowtimeId);
            console.log("BookPage: Showtime ID fetched and set:", fetchedShowtimeId);
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 401) {
                toast.error("로그인이 필요합니다. 다시 로그인해주세요.");
            } else {
                toast.error("예매 진입에 실패했습니다. 다시 시도해주세요.");
            }
            window.close();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [qKopisId, qDay, qTime]); // 의존성 배열에 qKopisId, qDay, qTime 추가

  // 부모창으로부터 토큰을 받는 로직
  useEffect(() => {
    console.log("BookPage: Auth token message effect running."); // 디버깅 코드 추가
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data.type === 'auth-token' && event.data.token) {
        console.log("BookPage: Received token from opener", event.data.token); // 디버깅 코드 추가
        // 받은 토큰을 localStorage에 저장
        localStorage.setItem(TOKEN_KEY, event.data.token);
        // axios 인스턴스의 기본 헤더에 토큰 설정
        api.defaults.headers.common['Authorization'] = `Bearer ${event.data.token}`;
        console.log("BookPage: Token set in localStorage and axios defaults", api.defaults.headers.common['Authorization']); // 디버깅 코드 추가
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []); // 의존성 배열은 비워둡니다.

  // 좌석 데이터 로딩 (showtimeId가 확보된 후에 실행)
  useEffect(() => {
    console.log("BookPage: Seat data loading effect running. Showtime ID:", showtimeId); // 디버깅 코드 추가
    if (showtimeId === null) return; // showtimeId가 null이면 실행하지 않음
    (async () => {
      try {
        const data = await fetchAvailability(showtimeId);
        setSeats(data);
        // 기본 구역 선택
        if (data.length) {
          setZone(data[0].zone);
        }
        console.log("BookPage: Seat data loaded successfully. Data:", data); // 디버깅 코드 추가
      } catch (error) {
        toast.error("좌석 정보를 불러오지 못했습니다.");
        console.error("BookPage: Error loading seat data:", error); // 디버깅 코드 추가
      }
    })();
  }, [showtimeId]); // showtimeId가 변경될 때마다 실행

  // 구역 묶기
  const groups: ZoneGroup[] = useMemo(() => {
    console.log("BookPage: Memo for groups is running. Seats:", seats); // 디버깅 코드 추가
    const map = new Map<string, SeatAvailability[]>();
    for (const s of seats) {
      if (!map.has(s.zone)) map.set(s.zone, []);
      map.get(s.zone)!.push(s);
    }
    const result = Array.from(map.entries()).map(([zone, seats]) => ({
      zone,
      seats,
    }));
    console.log("BookPage: Grouped seats created:", result); // 디버깅 코드 추가
    return result;
  }, [seats]);



  const total = useMemo(
    () =>
      seats
        .filter((s) => picked.includes(s.seatId))
        .reduce((acc, s) => acc + s.price, 0),
    [seats, picked]
  );

  const togglePick = (s: SeatAvailability) => {
    if (s.status !== "AVAILABLE") return;
    setPicked((prev) =>
      prev.includes(s.seatId)
        ? prev.filter((id) => id !== s.seatId)
        : [...prev, s.seatId]
    );
  };

  const onHold = async () => {
    if (!picked.length) {
      toast("좌석을 먼저 선택하세요.");
      return;
    }
    setLoading(true);
    try {
      // showtimeId가 null일 경우를 대비하여 체크
      if (showtimeId === null) {
        toast.error("공연 정보가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      const { holdId: hid } = await createHold({
        showtimeId,
        seatIds: picked,
      });
      setHoldId(hid);
      toast.success("선택 좌석이 홀드되었습니다. (10분)");
    } catch {
      toast.error("홀드 실패: 이미 선택된 좌석일 수 있습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onRelease = async () => {
    if (!holdId) return;
    try {
      await releaseHold(holdId);
      toast("홀드 취소");
      setHoldId(null);
    } catch {
      toast.error("홀드 취소 실패");
    }
  };

  const onConfirm = async () => {
    if (!picked.length) return;
    setLoading(true);
    try {
      // showtimeId가 null일 경우를 대비하여 체크
      if (showtimeId === null) {
        toast.error("공연 정보가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      const { reservationId } = await confirmBooking({
        showtimeId,
        seatIds: picked,
      });
      toast.success("예매 완료!");
      nav(`/mypage?rid=${reservationId}`, { replace: true });
    } catch {
      toast.error("예매 실패: 좌석 상태를 다시 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-page-container p-6">
      <header className="mb-4">
        <h1 className="m-0">좌석 선택</h1>
        <p className="text-gray-600">
          {qDay && qTime ? `${qDay} ${qTime}` : "선택한 날짜/회차"}
        </p>
      </header>

      {/* 무대 표시 */}
      <div className="stage-area">STAGE</div>

      {/* 구역 선택 */}
      <section className="mb-4">
        <div className="zone-selection-buttons">
          {groups.map((g) => (
            <button
              key={g.zone}
              type="button"
              onClick={() => {
                setZone(g.zone);
                setPicked([]); // 구역 바뀌면 선택 초기화
              }}
              className={`${zone === g.zone ? "active" : ""}`}
            >
              {g.zone}
              <span className="ml-1.5 opacity-70">({g.seats.length})</span>
            </button>
          ))}
        </div>
      </section>

      {/* 좌석 그리드 */}
      <section>
        <div className="seat-grid-container">
          {/* 무대 */}
          <div className="stage-area">STAGE</div>

          {/* 좌석 범례 */}
          <div className="seat-legend">
            <span className="legend-item available">선택 가능</span>
            <span className="legend-item picked">선택됨</span>
            <span className="legend-item locked">홀드됨</span>
            <span className="legend-item taken">예매 완료</span>
          </div>

          {/* 구역별 좌석 렌더링 */}
          <div className="seat-map-container">
            {groups.map((zoneGroup) => (
              <div key={zoneGroup.zone} className={`seat-zone ${zoneGroup.zone.toLowerCase().replace(/\s/g, '-')}`}>
                <h3 className="zone-title">{zoneGroup.zone}</h3>
                <div className="zone-seats">
                  {zoneGroup.seats.sort((a, b) => {
                    // 행과 번호를 기준으로 정렬
                    const rowComparison = a.row.localeCompare(b.row, undefined, { numeric: true, sensitivity: 'base' });
                    if (rowComparison !== 0) return rowComparison;
                    return parseInt(a.number) - parseInt(b.number);
                  }).map((s) => {
                    const isPicked = picked.includes(s.seatId);
                    const disabled = s.status !== "AVAILABLE";
                    const statusClass = s.status === "TAKEN" ? "taken" : s.status === "LOCKED" ? "locked" : "available";
                    return (
                      <button
                        key={s.seatId}
                        type="button"
                        onClick={() => togglePick(s)}
                        disabled={disabled}
                        title={`${s.zone} / ${s.row}${s.number} / ${s.price.toLocaleString()}원`}
                        className={`seat-cell ${statusClass} ${isPicked ? "picked" : ""}`}
                      >
                        {s.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 액션 바 */}
      <section className="book-action-bar">
        {!holdId ? (
          <button onClick={onHold} disabled={!picked.length || loading} className="hold-btn">
            좌석 홀드(10분)
          </button>
        ) : (
          <button onClick={onRelease} disabled={loading} className="hold-btn">
            홀드 취소
          </button>
        )}

        <button onClick={onConfirm} disabled={!picked.length || loading} className="confirm-btn">
          예매 확정
        </button>

        <div className="ml-auto font-extrabold total-price">
          총액: {total.toLocaleString()}원
        </div>
      </section>
    </div>
  );
}