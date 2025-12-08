import { useEffect, useState } from 'react';
import { fetchMyBookings, type Booking } from '@/api/booking';

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const data = await fetchMyBookings();
        setBookings(data);
      } catch (err) {
        setError('예매 내역을 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">최근 예매/취소</h2>
        <a href="#" className="text-sm text-gray-600 hover:underline">더보기 &gt;</a>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-4 p-4 font-semibold text-center border-b">
          <div>예매일</div>
          <div>공연정보</div>
          <div>예매정보</div>
          <div>상태</div>
        </div>
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="grid grid-cols-4 p-4 text-center items-center border-b">
            <div>{new Date(booking.bookingDate).toLocaleDateString()}</div>
            <div className="flex items-center text-left">
              <img src={booking.posterUrl} alt={booking.performanceTitle} className="h-24 w-24 object-cover" />
              <div className="ml-4">
                <p className="font-bold">{booking.performanceTitle}</p>
                <p className="text-sm text-gray-600">관람일: {new Date(booking.viewingDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p>예약번호: {booking.bookingNumber}</p>
              <button className="text-sm text-blue-500 hover:underline">예매 상세</button>
            </div>
            <div>
              <p>{booking.status}</p>
            </div>
          </div>
        ))}
         {bookings.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            예매 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;

