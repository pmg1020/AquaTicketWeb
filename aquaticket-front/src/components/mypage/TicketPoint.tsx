const TicketPoint = () => {
  return (
    <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 bg-white border-b border-gray-200">
        <h2 className="text-[15px] font-bold text-gray-900">티켓포인트</h2>
      </div>

      <div className="p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-gray-600">총 적립</span>
            <span className="text-[16px] font-bold text-gray-900">0 P</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-gray-600">사용가능</span>
            <span className="text-[16px] font-bold text-gray-900">0 P</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-md bg-gray-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-black transition"
        >
          자세히 보기
        </button>
      </div>
    </section>
  );
};

export default TicketPoint;