import React, { useMemo } from "react";
import toast from "react-hot-toast";
import type { SeatAvailability } from "@/api/booking";

export interface SeatMapProps {
  zoneId: string;
  availability: SeatAvailability[];
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
  onBack: () => void;
  maxSeats?: number;
}

const SeatMap: React.FC<SeatMapProps> = ({
  zoneId,
  availability,
  selectedSeats,
  onSeatSelect,
  onBack,
}) => {
  const zoneAvailability = useMemo(
    () => availability.filter((seat) => seat.zone === zoneId),
    [availability, zoneId]
  );

  const handleSeatClick = (seat: SeatAvailability) => {
    if (seat.status !== "AVAILABLE") {
      toast.error("선택할 수 없는 좌석입니다.");
      return;
    }
    onSeatSelect(String(seat.seatId));
  };

  const seatsByRow = useMemo(() => {
    const grouped: Record<string, SeatAvailability[]> = {};
    zoneAvailability.forEach((seat) => {
      if (!grouped[seat.row]) grouped[seat.row] = [];
      grouped[seat.row].push(seat);
    });
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [zoneAvailability]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 상단 */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 transition text-sm"
        >
          ← 구역으로
        </button>
        <span className="text-gray-600 text-sm">
          현재 구역: <b>{zoneId}</b>
        </span>
      </div>

      {/* 무대 */}
      <div className="mb-6 text-gray-500 text-sm font-semibold">
        무대방향 (STAGE)
      </div>

      {/* ✅ 좌석 전체 스케일 */}
      <div className="origin-top scale-[1.35] md:scale-[1.45] lg:scale-[1.6]">
        <div className="flex flex-col gap-2">
          {seatsByRow.map(([row, seats]) => (
            <div key={row} className="flex items-center gap-3">
              {/* Row 라벨 */}
              <div className="w-8 text-right text-sm font-bold text-gray-500">
                {row}
              </div>

              {/* 좌석 */}
              <div className="flex gap-2">
                {seats.map((seat) => {
                  const isSelected = selectedSeats.includes(
                    String(seat.seatId)
                  );

                  let bg = "#cbd5e1"; // 기본
                  if (seat.status !== "AVAILABLE") bg = "#9ca3af";
                  if (isSelected) bg = "#2563eb";

                  return (
                    <div
                      key={seat.seatId}
                      onClick={() => handleSeatClick(seat)}
                      className="transition-transform hover:scale-110"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 6,
                        background: bg,
                        cursor:
                          seat.status === "AVAILABLE"
                            ? "pointer"
                            : "not-allowed",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {seat.number}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
