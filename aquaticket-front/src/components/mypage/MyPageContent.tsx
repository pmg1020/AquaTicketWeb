import { useState } from "react";
import BookingList from "./BookingList";
import EventStatus from "./EventStatus";
import InquiryHistory from "./InquiryHistory";
import MyPageTab from "./MyPageTab";
import TicketPoint from "./TicketPoint";
import UserInfo from "./UserInfo";

type TabKey = "home" | "booking" | "coupons" | "tickets";

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    {children}
  </div>
);

const EmptyBox = ({ title, desc }: { title: string; desc: string }) => (
  <Card>
    <div className="px-6 py-4 border-b border-gray-200 bg-white">
      <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
    </div>
    <div className="p-8 text-center text-[13px] text-gray-600">{desc}</div>
  </Card>
);

export default function MyPageContent() {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <div className="w-full space-y-5">
      {/* 탭 네비게이션 */}
      <MyPageTab active={tab} onChange={setTab} />

      {/* 홈 탭 */}
      {tab === "home" && (
        <div className="w-full space-y-5">
          {/* 사용자 정보 */}
          <UserInfo />

          {/* 메인 컨텐츠 영역 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 왼쪽: 예매 목록 (2/3) */}
            <div className="md:col-span-2 w-full">
              <BookingList />
            </div>

            {/* 오른쪽: 사이드바 (1/3) */}
            <div className="w-full space-y-5">
              <TicketPoint />
              <EventStatus />
              <InquiryHistory />
            </div>
          </div>
        </div>
      )}

      {/* 예매확인/취소 탭 */}
      {tab === "booking" && <BookingList />}

      {/* 할인쿠폰 탭 */}
      {tab === "coupons" && (
        <EmptyBox title="할인쿠폰" desc="사용 가능한 할인쿠폰이 없습니다." />
      )}

      {/* 공연예매권 탭 */}
      {tab === "tickets" && (
        <EmptyBox title="공연예매권" desc="사용 가능한 공연예매권이 없습니다." />
      )}
    </div>
  );
}