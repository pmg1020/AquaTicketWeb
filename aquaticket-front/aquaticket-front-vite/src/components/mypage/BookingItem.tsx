
import React from 'react';
import { Link } from 'react-router-dom';
import type { Booking } from '@/api/booking';

interface BookingItemProps {
  booking: Booking;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  return (
    <Link to={`/mypage/bookings/${booking.bookingId}`}>
      <div className="border p-4 rounded-lg flex space-x-4 hover:bg-gray-100 cursor-pointer">
        <img src={booking.posterUrl} alt={booking.performanceTitle} className="w-24 h-32 object-cover" />
        <div>
          <h3 className="text-lg font-bold">{booking.performanceTitle}</h3>
          <p>관람일: {booking.viewingDate}</p>
          <p>예매일: {booking.bookingDate}</p>
          <p>예매 번호: {booking.bookingNumber}</p>
          <p>결제 금액: {booking.totalPrice.toLocaleString()}원</p>
          <p>예매 상태: {booking.status}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookingItem;
