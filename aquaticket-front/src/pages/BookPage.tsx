// src/pages/BookPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchAvailability,
  createHold,
  confirmBooking,
  releaseHold,
  type SeatAvailability,
} from "@/api/booking";
import toast from "react-hot-toast";
import "@/css/book.css"; // 선택: 없으면 제거

type ZoneGroup = {
  zone: string;
  seats: SeatAvailability[];
};

export default function BookPage() {
  const { showtimeId: st } = useParams();
  const [search] = useSearchParams();
  const nav = useNavigate();

  const showtimeId = Number(st);
  const qDate = search.get("date") ?? "";
  const qTime = search.get("time") ?? "";

  const [seats, setSeats] = useState<SeatAvailability[]>([]);
  const [zone, setZone] = useState<string | null>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [holdId, setHoldId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 좌석 데이터 로딩
  useEffect(() => {
    if (!Number.isFinite(showtimeId)) return;
    (async () => {
      try {
        const data = await fetchAvailability(showtimeId);
        setSeats(data);
        // 기본 구역 선택
        if (data.length) {
          setZone(data[0].zone);
        }
      } catch {
        toast.error("좌석 정보를 불러오지 못했습니다.");
      }
    })();
  }, [showtimeId]);

  // 구역 묶기
  const groups: ZoneGroup[] = useMemo(() => {
    const map = new Map<string, SeatAvailability[]>();
    for (const s of seats) {
      if (!map.has(s.zone)) map.set(s.zone, []);
      map.get(s.zone)!.push(s);
    }
    return Array.from(map.entries()).map(([zone, seats]) => ({
      zone,
      seats,
    }));
  }, [seats]);

  const visibleSeats = useMemo(() => {
    return seats.filter((s) => (zone ? s.zone === zone : true));
  }, [seats, zone]);

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
    <main className="p-6">
      <header className="mb-4">
        <h1 className="m-0">좌석 선택</h1>
        <p className="text-gray-600">
          {qDate && qTime ? `${qDate} ${qTime}` : "선택한 날짜/회차"}
        </p>
      </header>

      {/* 구역 선택 */}
      <section className="mb-4">
        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g.zone}
              type="button"
              onClick={() => {
                setZone(g.zone);
                setPicked([]); // 구역 바뀌면 선택 초기화
              }}
              className={`px-3 py-2 rounded-full border border-gray-200 font-bold cursor-pointer ${zone === g.zone ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
            >
              {g.zone}
              <span className="ml-1.5 opacity-70">
                ({g.seats.length})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 좌석 그리드 */}
      <section>
        <div
          className="grid grid-cols-10 gap-2 max-w-3xl"
        >
          {visibleSeats.map((s) => {
            const isPicked = picked.includes(s.seatId);
            const disabled = s.status !== "AVAILABLE";
            const bg = disabled
              ? s.status === "BOOKED"
                ? "#eee"
                : "#fff7e6" // HELD
              : isPicked
              ? "#d1e9ff"
              : "#fff";
            return (
              <button
                key={s.seatId}
                type="button"
                onClick={() => togglePick(s)}
                disabled={disabled}
                title={`${s.zone} / ${s.row}${s.number} / ${s.price.toLocaleString()}원`}
                className={`p-2 rounded-lg border border-gray-300 ${bg === "#eee" ? "bg-gray-200" : bg === "#fff7e6" ? "bg-orange-100" : bg === "#d1e9ff" ? "bg-blue-200" : "bg-white"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                {s.row}
                {s.number}
              </button>
            );
          })}
        </div>
      </section>

      {/* 액션 바 */}
      <section
        className="mt-4 flex gap-2 items-center max-w-3xl"
      >
        {!holdId ? (
          <button onClick={onHold} disabled={!picked.length || loading}>
            좌석 홀드(10분)
          </button>
        ) : (
          <button onClick={onRelease} disabled={loading}>
            홀드 취소
          </button>
        )}

        <button onClick={onConfirm} disabled={!picked.length || loading}>
          예매 확정
        </button>

        <div className="ml-auto font-extrabold">
          총액: {total.toLocaleString()}원
        </div>
      </section>
    </main>
  );
}