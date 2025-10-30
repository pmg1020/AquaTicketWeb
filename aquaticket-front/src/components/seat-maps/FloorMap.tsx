import React from 'react';

interface SeatMapProps {
  selectedSeats: string[];
  handleSeatClick: (seatId: string) => void;
  disabled: boolean;
}

const FloorMap: React.FC<SeatMapProps> = ({ selectedSeats, handleSeatClick, disabled }) => {
  // This is a placeholder for the actual SVG seat map for the Floor section.
  // The SVG content will be more complex in a real application.
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full">
      <text x="300" y="40" textAnchor="middle" fontWeight="700" fontSize="20">FLOOR - STAGE</text>

      {/* Example VIP Seats */}
      <g fill="#d4b48c">
        <rect x="180" y="100" width="40" height="40" rx="6" onClick={disabled ? undefined : () => handleSeatClick('F-VIP1')} className={`${selectedSeats.includes('F-VIP1') ? 'fill-green-500' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`} />
        <text x="200" y="125" textAnchor="middle" fontSize="12" fill="black">VIP1</text>
        <rect x="380" y="100" width="40" height="40" rx="6" onClick={disabled ? undefined : () => handleSeatClick('F-VIP2')} className={`${selectedSeats.includes('F-VIP2') ? 'fill-green-500' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`} />
        <text x="400" y="125" textAnchor="middle" fontSize="12" fill="black">VIP2</text>
      </g>

      {/* Example General Seats */}
      <g fill="#b4b9ff">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect 
            key={`F-G${i}`}
            x={150 + i * 30} 
            y={200} 
            width="20" 
            height="20" 
            rx="4" 
            onClick={disabled ? undefined : () => handleSeatClick(`F-G${i}`)}
            className={`${selectedSeats.includes(`F-G${i}`) ? 'fill-green-500' : 'cursor-pointer'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          />
        ))}
      </g>
    </svg>
  );
};

export default FloorMap;
