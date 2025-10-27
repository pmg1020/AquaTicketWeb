const EventStatus = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
      <h2 className="text-xl font-bold mb-4">최근 참여 이벤트</h2>
      <p className="text-gray-600">참여한 이벤트가 없습니다.</p>
      <button className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100">이벤트 가기</button>
    </div>
  );
};

export default EventStatus;
