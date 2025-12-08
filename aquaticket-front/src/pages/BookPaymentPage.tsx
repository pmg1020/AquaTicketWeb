import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useBookingStore, { type Coupon } from "@/stores/useBookingStore";
import { fetchMe, type Me } from "@/api/auth";
import { confirmBooking } from "@/api/booking";

// --- Mock Data for Coupons ---
const availableCoupons: Coupon[] = [
  { id: 1, name: "신규회원 10% 할인", discountType: "PERCENT", discountValue: 10 },
  { id: 2, name: "5,000원 할인 쿠폰", discountType: "FIXED", discountValue: 5000 },
];

// --- Helper Components for better structure ---

type SectionProps = {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
};
const Section: React.FC<SectionProps> = ({ title, children, subtitle }) => (
  <div className="mb-8">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
    <div className="space-y-4">{children}</div>
  </div>
);

type InfoFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
};
const InfoField: React.FC<InfoFieldProps> = ({ label, value, placeholder, readOnly, required }) => (
  <div className="flex items-start gap-4">
    <label className="w-20 text-sm text-gray-700 pt-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 read-only:bg-gray-50"
    />
  </div>
);

type RadioGroupProps = {
  name: string;
  options: { label: string; value: string; note?: string }[];
  defaultChecked?: string;
};
const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, defaultChecked }) => (
  <div className="space-y-3">
    {options.map((option) => (
      <label key={option.value} className="flex items-start gap-3 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option.value}
          defaultChecked={option.value === defaultChecked}
          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <div className="flex-1">
          <span className="text-sm">{option.label}</span>
          {option.note && <p className="text-xs text-gray-500 mt-1">{option.note}</p>}
        </div>
      </label>
    ))}
  </div>
);

// --- Main Component ---

const BookPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { showtimeId, selectedSeats, totalPrice, clearBooking, performanceInfo, selectedCoupon, setSelectedCoupon } = useBookingStore();
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);

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

  const handleCouponChange = (couponId: number | null) => {
    setSelectedCouponId(couponId);
    if (couponId === null) {
      setSelectedCoupon(null);
    } else {
      const coupon = availableCoupons.find((c) => c.id === couponId);
      setSelectedCoupon(coupon || null);
    }
  };

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

  // 가격 계산
  const basePrice = totalPrice;
  const priceDiscount = 0; // 가격할인
  const bookingFee = 2000;
  const deliveryFee = 0;

  // 쿠폰 할인 계산
  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "PERCENT") {
      couponDiscount = Math.floor(basePrice * selectedCoupon.discountValue / 100);
    } else {
      couponDiscount = selectedCoupon.discountValue;
    }
  }

  const finalPrice = basePrice - priceDiscount - couponDiscount + bookingFee + deliveryFee;

  // 좌석 정보 포맷
  const seatInfo = selectedSeats.length > 0
    ? `${selectedSeats[0].zone} ${selectedSeats[0].row}열 ${selectedSeats.map(s => s.number).join(", ")}번`
    : "선택된 좌석 없음";

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* Left Side: Input Forms */}
          <div className="space-y-6">
            {/* 할인쿠폰 선택 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Section title="할인쿠폰을 선택하세요">
                <div className="space-y-3">
                  <div
                    onClick={() => handleCouponChange(null)}
                    className={`p-4 border rounded-md cursor-pointer transition ${
                      selectedCouponId === null
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">쿠폰 사용 안함</span>
                      <span className="text-sm text-gray-500">0원</span>
                    </div>
                  </div>
                  {availableCoupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      onClick={() => handleCouponChange(coupon.id)}
                      className={`p-4 border rounded-md cursor-pointer transition ${
                        selectedCouponId === coupon.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{coupon.name}</span>
                        <span className="text-sm text-green-600 font-semibold">
                          {coupon.discountType === "PERCENT"
                            ? `${coupon.discountValue}% 할인`
                            : `${coupon.discountValue.toLocaleString()}원 할인`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* 주문자정보 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Section title="주문자정보">
                <InfoField label="이름" value={user?.name || ""} readOnly required />
                <InfoField label="연락처" value="" placeholder="010-0000-0000" required />
                <InfoField label="이메일" value={user?.email || ""} readOnly required />
                <p className="text-xs text-gray-500 mt-2">
                  입력하신 정보는 공연장에서 예매확인을 위해 사용될 수 있습니다.
                </p>
              </Section>
            </div>

            {/* 수령방법 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Section title="수령방법을 선택하세요">
                <RadioGroup
                  name="delivery"
                  options={[
                    { label: "현장수령", value: "onsite" },
                    { label: "모바일티켓", value: "mobile" },
                    { label: "배송(3,700원)", value: "delivery", note: "12월 30일 일괄발송(배송일기준 최대 4~5일 이내 배송)" }
                  ]}
                  defaultChecked="mobile"
                />
              </Section>

              {/* 배송지 정보 체크박스 */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-bold text-sm mb-4">배송지 정보</h4>
                <label className="flex items-center gap-2 mb-4 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">주문자정보와 동일</span>
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="w-20 text-sm">수령인 <span className="text-red-500">*</span></label>
                    <input type="text" className="flex-1 px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-20 text-sm">연락처 <span className="text-red-500">*</span></label>
                    <div className="flex-1 flex gap-2">
                      <input type="text" className="w-24 px-3 py-2 border border-gray-300 rounded-md" />
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">우편번호</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="w-20 text-sm">주소 <span className="text-red-500">*</span></label>
                    <div className="flex-1 space-y-2">
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-4 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">기본 배송지로 설정</span>
                </label>
              </div>
            </div>

            {/* 결제수단 선택 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Section title="결제수단을 선택하세요">
                <RadioGroup
                  name="payment"
                  options={[
                    { label: "신규", value: "new" },
                    { label: "카드", value: "card" },
                    { label: "기본", value: "default" }
                  ]}
                  defaultChecked="new"
                />
              </Section>
            </div>
          </div>

          {/* Right Side: Order Summary & Performance Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              {/* 공연 정보 */}
              <div className="mb-6 pb-6 border-b">
                <h2 className="text-lg font-bold mb-3">
                  {performanceInfo?.title || "2026 CNBLUE LIVE '3LOGY'"}
                </h2>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{performanceInfo?.date || "2026.01.17(토) 18:00"}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    총 {selectedSeats.length}석 선택
                  </p>
                  <p className="text-xs text-gray-500">{seatInfo}</p>
                </div>
              </div>

              {/* 결제금액 */}
              <h4 className="font-bold text-base mb-4">결제금액</h4>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between">
                  <span>티켓금액</span>
                  <span className="text-right">{basePrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>기본가</span>
                  <span className="text-right">{basePrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>가격할인</span>
                  <span className="text-right">{priceDiscount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>쿠폰할인</span>
                  <span className="text-right">{couponDiscount > 0 ? `-${couponDiscount.toLocaleString()}` : "0"}원</span>
                </div>
                <div className="flex justify-between">
                  <span>공연예매권</span>
                  <span className="text-right">0원</span>
                </div>
                <div className="flex justify-between">
                  <span>예매수수료</span>
                  <span className="text-right">{bookingFee.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>배송료</span>
                  <span className="text-right">{deliveryFee.toLocaleString()}원</span>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-between items-center mb-4">
                <span className="font-bold text-base">총 결제금액</span>
                <span className="text-2xl font-bold text-green-600">{finalPrice.toLocaleString()}원</span>
              </div>

              {/* 취소 정책 */}
              <div className="text-xs text-gray-500 space-y-1 mb-6 pt-4 border-t">
                <p>• 취소기한 : <span className="text-orange-600">2026년 1월 16일(금) 16:59 까지</span></p>
                <p>• 취소수수료 : <span className="text-green-600">티켓금액의 0~30%</span> (상세보기)</p>
              </div>

              {/* 버튼 */}
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400 transition font-medium text-sm"
                  onClick={() => navigate(-1)}
                >
                  이전
                </button>
                <button
                  className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition font-bold text-sm disabled:bg-gray-400"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "처리중..." : "결제하기"}
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

