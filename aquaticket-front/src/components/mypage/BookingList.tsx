import { useEffect, useState } from "react";
import { fetchMyBookings, cancelBooking, type Booking } from "@/api/booking";
import toast from "react-hot-toast";
import axios from "axios";

function StatusBadge({ status }: { status: string }) {
  const s = (status || "").toUpperCase();
  let cls = "bg-white text-gray-700";

  if (s.includes("CONFIRM") || s.includes("PAID") || s.includes("COMPLETE")) {
    cls = "bg-emerald-100 text-emerald-700";
  } else if (s.includes("CANCEL")) {
    cls = "bg-red-100 text-red-700";
  }

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold ${cls}`}>
      {status}
    </span>
  );
}

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const data = await fetchMyBookings();
        setBookings(data);
      } catch (err) {
        setError("예매 내역을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const handleCancel = async (bookingId: number) => {
    if (!window.confirm("정말로 예매를 취소하시겠습니까?")) {
      return;
    }

    try {
      await cancelBooking(bookingId);
      toast.success("예매가 취소되었습니다.");
      // Update the status of the booking in the local state
      setBookings(bookings.map(b => 
        b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b
      ));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "취소 중 오류가 발생했습니다.");
      } else {
        toast.error("취소 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-white">
        <h2 className="text-[15px] font-bold text-gray-900">최근 예매/취소</h2>
        <button
          type="button"
          className="text-[12px] text-gray-500 hover:text-emerald-600 transition"
        >
          더보기 &gt;
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="p-4">
        {loading && (
          <div className="py-16 text-center text-[13px] text-gray-500">
            불러오는 중...
          </div>
        )}

        {error && (
          <div className="py-16 text-center text-[13px] text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-[15px] font-semibold text-gray-900">
              예매 내역이 없습니다.
            </div>
            <div className="mt-2 text-[13px] text-gray-500">
              공연을 예매하면 이곳에서 확인할 수 있어요.
            </div>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-3">
            {bookings.map((b) => {
              const bookingDate = b.bookingDate
                ? new Date(b.bookingDate).toLocaleDateString()
                : "-";
              const viewingDate = b.viewingDate
                ? new Date(b.viewingDate).toLocaleDateString()
                : "-";
              const isCancelled = b.status === 'CANCELLED';

              return (
                <div
                  key={b.bookingId}
                  className={`border border-gray-200 rounded-lg p-3 hover:border-emerald-500 hover:shadow-md transition-all duration-200 ${isCancelled ? 'bg-gray-100 opacity-70' : ''}`}
                >
                  <div className="flex gap-3">
                    {/* 포스터 */}
                    <img
                      src={b.posterUrl}
                      alt={b.performanceTitle}
                      className="w-16 h-20 object-cover rounded shrink-0 ring-1 ring-gray-200"
                    />

                    {/* 정보 */}
                    <div className="flex-1 min-w-0">
                      {/* 상단: 제목 + 상태 */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[14px] font-bold text-gray-900 truncate flex-1">
                          {b.performanceTitle}
                        </h3>
                        <StatusBadge status={b.status} />
                      </div>

                      {/* 상세 정보 - 2열 그리드 */}
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[12px] mb-2.5">
                        <div className="flex gap-1.5">
                          <span className="text-gray-500 shrink-0">예약</span>
                          <span className="text-gray-900 font-medium truncate">
                            {b.bookingNumber.slice(-8)}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-gray-500 shrink-0">매수</span>
                          <span className="text-gray-900">1매</span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-gray-500 shrink-0">관람</span>
                          <span className="text-gray-900">{viewingDate}</span>
                        </div>
                        <div className="flex gap-1.5">
                          <span className="text-gray-500 shrink-0">예매</span>
                          <span className="text-gray-900">{bookingDate}</span>
                        </div>
                      </div>

                      {/* 버튼 */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          className="w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-100 transition"
                        >
                          예매 상세
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCancel(b.bookingId)}
                          disabled={isCancelled}
                          className="w-full rounded border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-700 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition"
                        >
                          {isCancelled ? '취소 완료' : '예매 취소'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingList;