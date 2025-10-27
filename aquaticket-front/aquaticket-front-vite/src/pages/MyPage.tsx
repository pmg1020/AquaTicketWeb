
import UserInfo from '../components/mypage/UserInfo';
import BookingList from '../components/mypage/BookingList';
import EventStatus from '../components/mypage/EventStatus';
import InquiryHistory from '../components/mypage/InquiryHistory';

const MyPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4 mb-8 text-lg font-semibold border-b">
          <a href="#" className="text-blue-500 border-b-2 border-blue-500 py-2">마이티켓 홈</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 py-2">예매확인/취소</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 py-2">할인쿠폰</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 py-2">공연예매권</a>
        </div>
        <UserInfo />
        <BookingList />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <EventStatus />
          <InquiryHistory />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
