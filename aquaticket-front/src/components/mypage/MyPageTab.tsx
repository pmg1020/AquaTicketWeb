import { useState } from 'react';

const MyPageTab = () => {
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('booking')}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'booking'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}>
          예매확인/취소
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'coupons'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}>
          할인쿠폰
        </button>
        <button
          onClick={() => setActiveTab('tickets')}
          className={`py-2 px-4 text-sm font-medium ${
            activeTab === 'tickets'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}>
          공연예매권
        </button>
      </div>
      <div className="p-4">
        {activeTab === 'booking' && <div>예매확인/취소 내역이 없습니다.</div>}
        {activeTab === 'coupons' && <div>사용가능한 할인쿠폰이 없습니다.</div>}
        {activeTab === 'tickets' && <div>사용가능한 공연예매권이 없습니다.</div>}
      </div>
    </div>
  );
};

export default MyPageTab;
