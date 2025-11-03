import React, { useState } from "react";
import "../../css/maps.css";

interface SeatMapProps {
  zoneId: string;
  onBack: () => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ zoneId, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats = Array.from({ length: 60 }, (_, i) => ({
    id: `S${i + 1}`,
    available: Math.random() > 0.15,
  }));

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="seat-map-wrapper">
      <div className="stage-top">STAGE</div>

      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`seat-btn ${
              selectedSeats.includes(seat.id)
                ? "selected"
                : !seat.available
                ? "unavailable"
                : ""
            }`}
            onClick={() => seat.available && toggleSeat(seat.id)}
          />
        ))}
      </div>

      <div className="summary-panel">
        <h3>선택 좌석 ({selectedSeats.length})</h3>
        <ul>
          {selectedSeats.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <button className="pay-btn">예매하기</button>
        <button
          className="pay-btn"
          style={{ background: "#999", marginTop: "8px" }}
          onClick={onBack}
        >
          ← 구역선택으로
        </button>
      </div>
    </div>
  );
};

export default SeatMap;
