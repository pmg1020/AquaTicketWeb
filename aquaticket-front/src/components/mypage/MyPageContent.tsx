import BookingList from './BookingList';
import EventStatus from './EventStatus';
import InquiryHistory from './InquiryHistory';
import MyPageTab from './MyPageTab';
import TicketPoint from './TicketPoint';
import UserInfo from './UserInfo';

const MyPageContent = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex space-x-4 mb-8 text-lg font-semibold border-b">
        <a href="#" className="text-blue-500 border-b-2 border-blue-500 py-2">
          마이티켓 홈
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500 py-2">
          예매확인/취소
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500 py-2">
          할인쿠폰
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-500 py-2">
          공연예매권
        </a>
      </div>
      <UserInfo />
      <div className="mt-8">
        <MyPageTab />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <BookingList />
        </div>
        <div className="space-y-8">
          <TicketPoint />
          <EventStatus />
          <InquiryHistory />
        </div>
      </div>
    </div>
  );
};

export default MyPageContent;
