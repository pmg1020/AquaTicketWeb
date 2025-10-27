interface Booking {
  id: number;
  date: string;
  imageUrl: string;
  title: string;
  venue: string;
  orderId: string;
  status: string;
}

const bookings: Booking[] = [
  {
    id: 1,
    date: '2025.05.11',
    imageUrl: 'https://ticketimage.interpark.com/Play/image/large/24/24004907_p.gif',
    title: '아이유 공식 팬클럽 <유애나> 6기 모집',
    venue: '2025.04.28 ~ 2025.05.11',
    orderId: 'M258709334',
    status: '예매완료(카드)',
  },
  {
    id: 2,
    date: '2024.08.14',
    imageUrl: 'https://ticketimage.interpark.com/Play/image/large/24/24008981_p.gif',
    title: '2024 IU HEREH WORLD TOUR CONCERT ENCORE : THE WINNING',
    venue: '2024.09.21 ~ 2024.09.22 서울월드컵경기장(상암)',
    orderId: 'M240236000',
    status: '예매완료(입금완료)',
  },
  {
    id: 3,
    date: '2023.12.13',
    imageUrl: 'https://ticketimage.interpark.com/Play/image/large/24/24001920_p.gif',
    title: 'Ado THE FIRST WORLD TOUR \'Wish\'',
    venue: '2024.02.24 ~ 2024.02.24 일산 킨텍스(KINTEX) 2전시장 10B홀',
    orderId: 'M232797481',
    status: '예매완료(입금완료)',
  },
];

const BookingList = () => {
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
          <div key={booking.id} className="grid grid-cols-4 p-4 text-center items-center border-b">
            <div>{booking.date}</div>
            <div className="flex items-center text-left">
              <img src={booking.imageUrl} alt={booking.title} className="h-24 w-24 object-cover" />
              <div className="ml-4">
                <p className="font-bold">{booking.title}</p>
                <p className="text-sm text-gray-600">{booking.venue}</p>
              </div>
            </div>
            <div>
              <p>예약번호: {booking.orderId}</p>
              <button className="text-sm text-blue-500 hover:underline">예매 상세</button>
            </div>
            <div>
              <p>{booking.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
