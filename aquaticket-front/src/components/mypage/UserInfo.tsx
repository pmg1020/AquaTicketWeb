import { useEffect, useState } from "react";
import { fetchMe, type Me } from "@/api/auth";
import { fetchMyBookings } from "@/api/booking";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { RightOutlined } from "@ant-design/icons";

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex-1 text-center py-6">
    <div className="text-[26px] font-bold text-gray-900">{value}</div>
    <div className="mt-1.5 text-[13px] text-gray-600">{label}</div>
  </div>
);

export default function UserInfo() {
  const [user, setUser] = useState<Me | null>(null);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await fetchMe();
        setUser(userData);

        const bookingsData = await fetchMyBookings();
        setBookingCount(bookingsData.length);
      } catch (error) {
        console.error("Failed to fetch user data or bookings", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* 사용자 정보 */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex items-center gap-4">
            <UserCircleIcon className="h-14 w-14 text-gray-300 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[17px] font-bold text-gray-900 truncate">
                {user?.email ?? "user@email.com"}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  기본정보 관리
                  <RightOutlined className="ml-1 h-3 w-3" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  배송지 관리
                  <RightOutlined className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 */}
        <div className="flex divide-x divide-gray-200">
          <Stat label="예매내역" value={bookingCount} />
          <Stat label="할인쿠폰" value={0} />
          <Stat label="공연예매권" value={0} />
        </div>
      </div>
    </div>
  );
}