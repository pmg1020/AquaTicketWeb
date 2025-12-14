const EventStatus = () => {
  return (
    <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-[15px] font-bold text-gray-900">최근 참여 이벤트</h2>
      </div>

      <div className="p-5">
        <p className="text-[13px] text-gray-600">참여한 이벤트가 없습니다.</p>
        <button
          type="button"
          className="mt-4 w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          이벤트 가기
        </button>
      </div>
    </section>
  );
};

export default EventStatus;