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

// --- Helper Components ---

type SectionProps = {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
};

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => (
  <section className="py-6 border-t border-gray-200 first:border-t-0">
    <h3 className="text-base font-semibold mb-3">{title}</h3>
    {subtitle && <p className="text-xs text-gray-500 mb-3">{subtitle}</p>}
    <div className="space-y-3">{children}</div>
  </section>
);

type InfoFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
};

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  placeholder,
  readOnly,
  required,
}) => (
  <div className="flex items-center gap-4 text-sm">
    <label className="w-20 text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      className="flex-1 h-9 px-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-[1.5px] focus:ring-green-500 read-only:bg-gray-50"
    />
  </div>
);

type RadioGroupProps = {
  name: string;
  options: { label: string; value: string; note?: string }[];
  defaultChecked?: string;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  defaultChecked,
}) => (
  <div className="space-y-2">
    {options.map((option) => (
      <label
        key={option.value}
        className="flex items-start gap-2 text-sm cursor-pointer"
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          defaultChecked={option.value === defaultChecked}
          className="mt-[3px]"
        />
        <div className="flex-1">
          <p>{option.label}</p>
          {option.note && (
            <p className="mt-1 text-[11px] leading-snug text-gray-500">
              {option.note}
            </p>
          )}
        </div>
      </label>
    ))}
  </div>
);

// --- Main Component ---

const BookPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    showtimeId,
    selectedSeats,
    totalPrice,
    clearBooking,
    performanceInfo,
    selectedCoupon,
    setSelectedCoupon,
  } = useBookingStore();

  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(
    selectedCoupon?.id ?? null
  );

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
      const coupon = availableCoupons.find((c) => c.id === couponId) ?? null;
      setSelectedCoupon(coupon);
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
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // --- 가격 계산 ---
  const basePrice = totalPrice;
  const priceDiscount = 0;
  const bookingFee = 2000;
  const deliveryFee = 0;

  let couponDiscount = 0;
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "PERCENT") {
      couponDiscount = Math.floor(
        (basePrice * selectedCoupon.discountValue) / 100
      );
    } else {
      couponDiscount = selectedCoupon.discountValue;
    }
    couponDiscount = Math.min(couponDiscount, basePrice); // 과도 할인 방지
  }

  const finalPrice =
    basePrice - priceDiscount - couponDiscount + bookingFee + deliveryFee;

  // 좌석 정보
  const seatInfo =
    selectedSeats.length > 0
      ? `${selectedSeats[0].zone} ${selectedSeats[0].row}열 ${selectedSeats
          .map((s) => s.number)
          .join(", ")}번`
      : "선택된 좌석 없음";

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6">
      <main className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* LEFT: main content */}
        <div className="flex-1 bg-white rounded-md border border-gray-200">
          {/* 상단 타이틀 영역 (멜론처럼 심플하게) */}
          <div className="px-7 py-5 border-b border-gray-200">
            <h1 className="text-lg font-semibold">배송/결제</h1>
          </div>

          <div className="px-7 pb-8">
            {/* 할인수단 (쿠폰) */}
            <Section title="할인수단을 선택하세요">
              <div className="space-y-2">
                {/* "쿠폰 0개" 형태의 요약 라인 */}
                <div className="flex items-center justify-between text-sm h-10 border border-gray-200 rounded-sm px-3">
                  <span>쿠폰</span>
                  <span className="text-green-600">
                    {selectedCouponId ? "1개 사용 중" : "0개"}
                  </span>
                </div>

                {/* 실제 쿠폰 선택 영역 (펼쳐져 있는 형태) */}
                <div className="mt-3 space-y-2 text-sm">
                  <button
                    type="button"
                    onClick={() => handleCouponChange(null)}
                    className={`w-full flex items-center justify-between rounded-sm border px-3 py-2 text-left transition
                    ${
                      selectedCouponId === null
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-gray-700">쿠폰 사용 안함</span>
                    <span className="text-gray-500">0원</span>
                  </button>
                  {availableCoupons.map((coupon) => (
                    <button
                      key={coupon.id}
                      type="button"
                      onClick={() => handleCouponChange(coupon.id)}
                      className={`w-full flex items-center justify-between rounded-sm border px-3 py-2 text-left transition
                      ${
                        selectedCouponId === coupon.id
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className="text-gray-700">{coupon.name}</span>
                      <span className="font-semibold text-green-600">
                        {coupon.discountType === "PERCENT"
                          ? `${coupon.discountValue}% 할인`
                          : `${coupon.discountValue.toLocaleString()}원 할인`}
                      </span>
                    </button>
                  ))}
                </div>

                {/* 공연예매권 자리 (현재는 0개 고정) */}
                <div className="mt-4 flex items-center justify-between text-sm h-10 border border-gray-200 rounded-sm px-3">
                  <span>공연예매권</span>
                  <span className="text-green-600">0개</span>
                </div>
              </div>
            </Section>

            {/* 수령방법 */}
            <Section title="수령방법을 선택하세요">
              <RadioGroup
                name="delivery"
                options={[
                  { label: "현장수령", value: "onsite" },
                  { label: "모바일티켓", value: "mobile" },
                  {
                    label: "배송(3,700원)",
                    value: "delivery",
                    note: "12월 30일 일괄발송(배송일 기준 최대 4~5일 이내 배송)",
                  },
                ]}
                defaultChecked="mobile"
              />
            </Section>

            {/* 주문자정보 */}
            <Section
              title="주문자정보"
              subtitle="입력하신 정보는 공연장에서 예매확인을 위해 사용될 수 있습니다."
            >
              <div className="space-y-2">
                <InfoField
                  label="이름"
                  value={user?.name || ""}
                  readOnly
                  required
                />
                <InfoField
                  label="연락처"
                  value=""
                  placeholder="010-0000-0000"
                  required
                />
                <InfoField
                  label="이메일"
                  value={user?.email || ""}
                  readOnly
                  required
                />
              </div>
            </Section>

            {/* 배송지 정보 */}
            <Section title="배송지 정보">
              <label className="flex items-center gap-2 text-sm cursor-pointer mb-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>주문자정보와 동일</span>
              </label>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4">
                  <label className="w-20">
                    수령인 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="flex-1 h-9 px-3 border border-gray-300 rounded-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="w-20">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 h-9 px-3 border border-gray-300 rounded-sm"
                    />
                    <button
                      type="button"
                      className="px-3 h-9 border border-gray-300 rounded-sm text-xs"
                    >
                      우편번호
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <label className="w-20 mt-2">
                    주소 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      className="w-full h-9 px-3 border border-gray-300 rounded-sm"
                      placeholder="기본 주소"
                    />
                    <input
                      type="text"
                      className="w-full h-9 px-3 border border-gray-300 rounded-sm"
                      placeholder="상세 주소"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer mt-1">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>기본 배송지로 설정</span>
                </label>
              </div>
            </Section>

            {/* 결제수단 */}
            <Section title="결제수단을 선택하세요">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                {["카드", "무통장입금", "휴대폰 결제", "간편결제", "계좌이체"].map(
                  (label) => (
                    <button
                      key={label}
                      type="button"
                      className="h-10 border border-gray-300 rounded-sm flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition text-gray-700"
                    >
                      {label}
                    </button>
                  )
                )}
              </div>
            </Section>

            {/* (옵션) 예매자 동의 영역 등은 나중에 따로 추가 가능 */}
          </div>
        </div>

        {/* RIGHT: summary / sticky card */}
        <aside className="w-full lg:w-80 lg:shrink-0 lg:sticky lg:top-6">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-5">
            {/* 공연 정보 */}
            <div className="pb-4 mb-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold leading-snug mb-2">
                {performanceInfo?.title || "공연 정보 없음"}
              </h2>
              <div className="text-xs text-gray-600 space-y-1">
                <p>{performanceInfo?.date || ""}</p>
                <p className="mt-1">
                  총 {selectedSeats.length}석 선택
                </p>
                <p>{seatInfo}</p>
              </div>
            </div>

            {/* 결제금액 */}
            <h4 className="text-sm font-semibold mb-3">결제금액</h4>
            <div className="space-y-1 text-xs text-gray-700 mb-3">
              <div className="flex justify-between">
                <span>티켓금액</span>
                <span>{basePrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>기본가</span>
                <span>{basePrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>가격할인</span>
                <span>{priceDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>쿠폰할인</span>
                <span>
                  {couponDiscount > 0
                    ? `-${couponDiscount.toLocaleString()}`
                    : "0"}
                  원
                </span>
              </div>
              <div className="flex justify-between">
                <span>공연예매권</span>
                <span>0원</span>
              </div>
              <div className="flex justify-between">
                <span>예매수수료</span>
                <span>{bookingFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>배송료</span>
                <span>{deliveryFee.toLocaleString()}원</span>
              </div>
            </div>

            <div className="py-3 mt-1 border-y border-gray-200 flex justify-between items-center">
              <span className="text-sm font-semibold">총 결제금액</span>
              <span className="text-xl font-bold text-green-600">
                {finalPrice.toLocaleString()}원
              </span>
            </div>

            {/* 취소 정책 */}
            <div className="mt-3 mb-4 text-[11px] text-gray-500 space-y-1">
              <p>
                • 취소기한 :{" "}
                <span className="text-orange-600">
                  2026년 1월 16일(금) 16:59 까지
                </span>
              </p>
              <p>
                • 취소수수료 :{" "}
                <span className="text-green-600">
                  티켓금액의 0~30%
                </span>{" "}
                (상세보기)
              </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 h-10 text-sm rounded-sm border border-gray-300 bg-white hover:bg-gray-100"
                onClick={() => navigate(-1)}
              >
                이전
              </button>
              <button
                type="button"
                className="flex-1 h-10 text-sm rounded-sm bg-green-500 text-white font-semibold hover:bg-green-600 disabled:bg-gray-400"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? "처리중..." : "결제하기"}
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BookPaymentPage;
