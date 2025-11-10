import React from "react";

interface SeatSidebarProps {
  selectedSeats: string[];
  isVerified: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const SeatSidebar: React.FC<SeatSidebarProps> = ({
  selectedSeats,
  isVerified,
  onBack,
  onComplete,
}) => {
  return (
    <aside className="seat-sidebar">
      {/* 공연 정보 */}
      <div className="sidebar-header">
        <h2>2025 N.Flying LIVE &CON4 ENCORE</h2>
        <p>2025.12.19 (금) 19:30</p>
      </div>

      {/* 좌석 요약 */}
      <div className="sidebar-body">
        <h3>선택 좌석 ({selectedSeats.length})</h3>
        <ul>
          {selectedSeats.length === 0 ? (
            <li className="text-gray-400">선택된 좌석이 없습니다.</li>
          ) : (
            selectedSeats.map((s) => <li key={s}>{s}</li>)
          )}
        </ul>
      </div>

      {/* 버튼 영역 */}
      <div className="sidebar-footer">
        <button
          className="complete-btn"
          disabled={!isVerified || selectedSeats.length === 0}
          onClick={() => {
            if (!isVerified) return alert("보안문자 인증 후 이용 가능합니다.");
            onComplete();
          }}
        >
          예매하기
        </button>
        <button className="back-btn" onClick={onBack}>
          ← 구역 선택으로
        </button>
      </div>
    </aside>
  );
};

export default SeatSidebar;
