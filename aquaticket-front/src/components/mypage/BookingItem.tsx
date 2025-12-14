import React from "react";
import { Link } from "react-router-dom";
import type { Booking } from "@/api/booking";

interface BookingItemProps {
  booking: Booking;
}

const BookingItem: React.FC<BookingItemProps> = ({ booking }) => {
  const viewing = booking.viewingDate
    ? new Date(booking.viewingDate).toLocaleDateString()
    : "-";
  const bookingDate = booking.bookingDate
    ? new Date(booking.bookingDate).toLocaleDateString()
    : "-";

  return (
    <Link to={`/mypage/bookings/${booking.bookingId}`} className="block">
      <div className="rounded-lg px-4 py-4 hover:bg-gray-100/60 transition">
        <div className="flex gap-4">
          <img
            src={booking.posterUrl}
            alt={booking.performanceTitle}
            className="h-24 w-20 rounded-md object-cover ring-1 ring-gray-200"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-gray-900 truncate">
                {booking.performanceTitle}
              </h3>
              <span className="shrink-0 inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-700">
                {booking.status}
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>관람일: {viewing}</p>
              <p>예매일: {bookingDate}</p>
              <p className="text-gray-500">예매 번호: {booking.bookingNumber}</p>
              <p className="text-gray-900 font-medium">
                결제 금액: {booking.totalPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookingItem;
