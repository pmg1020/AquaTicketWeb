import { useEffect, useState } from 'react';
import { fetchMe } from '@/api/auth';
import type { Me } from '@/api/auth';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const UserInfo = () => {
  const [user, setUser] = useState<Me | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchMe();
      setUser(userData);
    };
    getUser();
  }, []);

  return (
    <div className="flex items-center p-6 bg-white rounded-lg shadow-md">
      <UserCircleIcon className="h-16 w-16 text-gray-400" />
      <div className="ml-6">
        <h2 className="text-xl font-bold">{user?.email}</h2>
        <div className="flex space-x-4 mt-2">
          <button className="text-sm text-gray-600 hover:underline">기본정보 관리</button>
          <button className="text-sm text-gray-600 hover:underline">배송지 관리</button>
        </div>
      </div>
      <div className="flex-grow" />
      <div className="flex space-x-8 text-center">
        <div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-600">예매내역</p>
        </div>
        <div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-600">할인쿠폰</p>
        </div>
        <div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-sm text-gray-600">공연예매권</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
