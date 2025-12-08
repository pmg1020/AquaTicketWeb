import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useBookingStore from "@/stores/useBookingStore";
import { fetchMe, type Me } from "@/api/auth";
import { confirmBooking } from "@/api/booking";
// import "../css/book.css"; // We will replace this with Tailwind

// --- Helper Components for better structure ---

type SectionProps = {
  title: string;
  children: React.ReactNode;
};
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold border-b pb-2 mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

type InfoFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
};
const InfoField: React.FC<InfoFieldProps> = ({ label, value, placeholder, readOnly }) => (
  <div className="flex items-center">
    <label className="w-24 text-gray-600 font-medium">{label}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      className="flex-1 px-3 py-2 border rounded-md bg-gray-100 read-only:bg-gray-100 read-only:text-gray-500 focus:outline-none"
    />
  </div>
);

type RadioGroupProps = {
  name: string;
  options: string[];
  defaultChecked?: string;
};
const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, defaultChecked }) => (
  <div className="flex items-center gap-6">
    {options.map((option) => (
      <label key={option} className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option}
          defaultChecked={option === defaultChecked}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
);

// --- Main Component ---

const BookPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { showtimeId, selectedSeats, totalPrice, clearBooking } = useBookingStore();
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchMe();
        setUser(userData);
      } catch (error) {
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (selectedSeats.length === 0) {
      toast.error("선택된 좌석이 없습니다. 다시 시도해주세요.");
      navigate("/");
    } else {
      getUser();
    }
  }, [navigate, selectedSeats]);

  const handlePayment = async () => {
    if (!showtimeId || selectedSeats.length === 0) {
      toast.error("예매 정보가 올바르지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      const seatIds = selectedSeats.map((seat) => seat.seatId);
      await confirmBooking({ showtimeId, seatIds });

      toast.success("예매가 완료되었습니다.");
      clearBooking();
      navigate("/mypage");
    } catch (error) {
      toast.error("예매 처리 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const bookingFee = 2000;
  const deliveryFee = 0;
  const finalPrice = totalPrice + bookingFee + deliveryFee;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">결제하기</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Side: Input Forms */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
            <Section title="예매자 정보">
              <InfoField label="이름" value={user?.name || ""} readOnly />
              <InfoField label="연락처" value="" placeholder="010-0000-0000" />
              <InfoField label="이메일" value={user?.email || ""} readOnly />
            </Section>

            <Section title="배송 방법">
              <RadioGroup
                name="delivery"
                options={["모바일 티켓", "현장 수령"]}
                defaultChecked="모바일 티켓"
              />
            </Section>

            <Section title="결제수단 선택">
              <RadioGroup
                name="payment"
                options={["신용카드", "카카오페이", "네이버페이"]}
                defaultChecked="신용카드"
              />
            </Section>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h4 className="text-xl font-semibold border-b pb-2 mb-4">결제내역</h4>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>티켓금액</span>
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>예매수수료</span>
                  <span>{bookingFee.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>{deliveryFee.toLocaleString()}원</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between font-bold text-lg">
                <span>총 결제금액</span>
                <span className="text-blue-600">{finalPrice.toLocaleString()}원</span>
              </div>
              <div className="mt-8 space-y-3">
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-bold disabled:bg-gray-400"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "처리중..." : `${finalPrice.toLocaleString()}원 결제하기`}
                </button>
                <button
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition"
                  onClick={() => navigate(-1)}
                >
                  이전
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BookPaymentPage;

