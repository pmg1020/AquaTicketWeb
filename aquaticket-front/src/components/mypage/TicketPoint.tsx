const TicketPoint = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">티켓포인트</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">총 적립</span>
        <span className="font-bold text-blue-600">0 P</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">사용가능</span>
        <span className="font-bold text-blue-600">0 P</span>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        자세히 보기
      </button>
    </div>
  );
};

export default TicketPoint;
