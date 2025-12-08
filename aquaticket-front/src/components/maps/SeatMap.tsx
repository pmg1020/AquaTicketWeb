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
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    return Object.entries(grouped).sort(([rowA], [rowB]) =>
      rowA.localeCompare(rowB)
    );
  }, [zoneAvailability]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={onBack}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          ← 구역으로
        </button>
        <span className="text-gray-600 text-sm font-medium">
          현재 구역: <strong>{zoneId}</strong>
        </span>
      </div>

      <div className="stage-area">무대방향 (STAGE)</div>

      <div className="seat-map-container">
        {seatsByRow.map(([row, seats]) => (
          <div key={row} className="flex items-center gap-2 mb-1">
            <div className="w-6 text-center text-sm font-bold text-gray-500">{row}</div>
            <div className="flex gap-1">
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(String(seat.seatId));
                let color = "#ccc"; // TAKEN
                if (seat.status === "AVAILABLE") color = "#a0aec0"; // Gray
                if (isSelected) color = "#2563eb"; // Blue

                return (
                  <div
                    key={seat.seatId}
                    onClick={() => handleSeatClick(seat)}
                    className="transition-transform hover:scale-110"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 3,
                      background: color,
                      cursor: seat.status === "AVAILABLE" ? "pointer" : "not-allowed",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
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
  );
};

export default SeatMap;
