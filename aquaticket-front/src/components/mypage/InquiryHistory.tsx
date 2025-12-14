const InquiryHistory = () => {
  return (
    <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-5 py-4 bg-white border-b border-gray-200">
        <h2 className="text-[15px] font-bold text-gray-900">최근 1:1문의</h2>
      </div>

      <div className="p-5">
        <p className="text-[13px] text-gray-600">문의하신 내역이 없습니다.</p>
        <button
          type="button"
          className="mt-4 w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-100 transition"
        >
          1:1문의 가기
        </button>
      </div>
    </section>
  );
};

export default InquiryHistory;