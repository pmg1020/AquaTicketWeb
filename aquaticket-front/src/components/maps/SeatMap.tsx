import React, { useState, useEffect } from "react";

interface Seat {
  id: string;
  type: "normal" | "wheelchair";
  x: number;
  y: number;
}

export interface SeatMapProps {
  zoneId: string; // ✅ 현재 선택된 구역
  onSeatSelect?: (id: string) => void;
  onBack: () => void;
  onSeatCountChange?: (count: number) => void; // ✅ 좌석 수 카운트용
}

const SeatMap: React.FC<SeatMapProps> = ({
  zoneId,
  onSeatSelect,
  onBack,
  onSeatCountChange,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.type === "wheelchair") return;

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );

    onSeatSelect?.(seat.id);
  };

  // ✅ 좌석 선택 수 변경 시 부모에 전달
  useEffect(() => {
    onSeatCountChange?.(selectedSeats.length);
  }, [selectedSeats, onSeatCountChange]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* 상단: 뒤로가기 + 현재 구역 표시 */}
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

      {/* 스테이지 영역 */}
      <div className="stage-area">무대방향 (STAGE)</div>

      {/* 좌석 영역 */}
      <div className="seat-map-container">
        {[...Array(8)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {[...Array(20)].map((_, colIndex) => {
              const seatId = `${rowIndex}-${colIndex}`;
              const isSelected = selectedSeats.includes(seatId);
              const baseColor = isSelected ? "#2563eb" : "#ccc";

              return (
                <div
                  key={seatId}
                  onClick={() =>
                    handleSeatClick({
                      id: seatId,
                      type: "normal",
                      x: 0,
                      y: 0,
                    })
                  }
                  className="transition-transform hover:scale-110"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 3,
                    background: baseColor,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
