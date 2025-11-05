import React, { useState } from "react";
import "../../css/maps.css";

interface SeatMapProps {
  zoneId: string;
  onBack: () => void;
  onComplete: () => void;
  isVerified: boolean; // ✅ SeatSelection에서 전달받음
}

const SeatMap: React.FC<SeatMapProps> = ({ zoneId, onBack, onComplete, isVerified }) => {
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
      {/* ✅ zoneId 실제 사용 → eslint 경고 사라짐 */}
      <div className="stage-top">STAGE - {zoneId} 구역</div>

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

        {/* ✅ 보안문자 인증 후만 예매 가능 */}
        <button
          className="pay-btn"
          disabled={!isVerified || selectedSeats.length === 0}
          onClick={() => {
            if (!isVerified) return alert("보안문자 인증 후 이용 가능합니다.");
            onComplete(); // 예매하기 → CaptchaModal 다시 표시
          }}
        >
          예매하기
        </button>

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
