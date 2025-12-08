import React from 'react';

interface SeatMapProps {
  selectedSeats: string[];
  handleSeatClick: (seatId: string) => void;
  disabled: boolean;
}

const FirstFloorMap: React.FC<SeatMapProps> = ({ selectedSeats, handleSeatClick, disabled }) => {
  // This is a placeholder for the actual SVG seat map for the 1F section.
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full">
      <text x="300" y="40" textAnchor="middle" fontWeight="700" fontSize="20">1F - STAGE</text>

      {/* Example General Seats on 1F */}
      <g fill="#b4b9ff">
        {Array.from({ length: 15 }).map((_, i) => (
          <rect 
            key={`1F-G${i}`}
            x={100 + (i % 5) * 40} 
            y={100 + Math.floor(i / 5) * 40} 
            width="30" 
            height="30" 
            rx="4" 
            className={`${selectedSeats.includes(`1F-G${i}`) ? 'fill-green-500' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={disabled ? undefined : () => handleSeatClick(`1F-G${i}`)}
          />
        ))}
      </g>
    </svg>
  );
};

export default FirstFloorMap;
