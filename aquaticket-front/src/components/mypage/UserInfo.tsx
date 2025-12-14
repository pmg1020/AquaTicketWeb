import { useEffect, useState } from "react";
import { fetchMe, type Me } from "@/api/auth";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex-1 text-center py-6">
    <div className="text-[26px] font-bold text-gray-900">{value}</div>
    <div className="mt-1.5 text-[13px] text-gray-600">{label}</div>
  </div>
);

export default function UserInfo() {
  const [user, setUser] = useState<Me | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchMe();
      setUser(userData);
    };
    getUser();
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
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  기본정보 관리
                </button>
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  배송지 관리
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 */}
        <div className="flex divide-x divide-gray-200">
          <Stat label="예매내역" value={0} />
          <Stat label="할인쿠폰" value={0} />
          <Stat label="공연예매권" value={0} />
        </div>
      </div>
    </div>
  );
}