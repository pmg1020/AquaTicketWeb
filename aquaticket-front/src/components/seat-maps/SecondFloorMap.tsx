import React from 'react';

interface SeatMapProps {
  selectedSeats: string[];
  handleSeatClick: (seatId: string) => void;
  disabled: boolean;
}

const SecondFloorMap: React.FC<SeatMapProps> = ({ selectedSeats, handleSeatClick, disabled }) => {
  // This is a placeholder for the actual SVG seat map for the 2F section.
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full">
      <text x="300" y="40" textAnchor="middle" fontWeight="700" fontSize="20">2F - STAGE</text>

      {/* Example Restricted View Seats on 2F */}
      <g fill="#f7c4d4">
        {Array.from({ length: 8 }).map((_, i) => (
          <circle 
            key={`2F-R${i}`}
            cx={150 + i * 50} 
            cy={150} 
            r="15" 
            onClick={disabled ? undefined : () => handleSeatClick(`2F-R${i}`)}
            className={`${selectedSeats.includes(`2F-R${i}`) ? 'fill-green-500' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          />
        ))}
      </g>
    </svg>
  );
};

export default SecondFloorMap;
