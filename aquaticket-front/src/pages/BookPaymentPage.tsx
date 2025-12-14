import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useBookingStore, { type Coupon } from "@/stores/useBookingStore";
import { fetchMe, type Me } from "@/api/auth";
import { confirmBooking } from "@/api/booking";

// ========== 타입 정의 ==========
type SelectedSeat = {
  id?: number | string;
  seatId?: number | string;
  zoneId?: string;
  zone?: string;
  row?: string;
  seatRow?: string;
  number?: string | number;
  seatNumber?: string | number;
  seatNo?: string | number;
  label?: string;
};

type PerformanceInfo = {
  title?: string;
  date?: string;
};

type Step = 1 | 2;

// ========== Mock 데이터 ==========
const availableCoupons: Coupon[] = [
  { id: 1, name: "신규회원 10% 할인", discountType: "PERCENT", discountValue: 10 },
  { id: 2, name: "5,000원 할인 쿠폰", discountType: "FIXED", discountValue: 5000 },
];

// ========== 유틸리티 함수 ==========
const getSeatZoneText = (seat: SelectedSeat): string => seat.zoneId ?? seat.zone ?? "";
const getSeatRowText = (seat: SelectedSeat): string => seat.row ?? seat.seatRow ?? "";
const getSeatNumberText = (seat: SelectedSeat): string => {
  const v = seat.number ?? seat.seatNumber ?? seat.seatNo ?? seat.label ?? "";
  return String(v);
};
const getSeatId = (seat: SelectedSeat): number | string | undefined => seat.seatId ?? seat.id;
const toNumber = (v: number | string): number => (typeof v === "number" ? v : Number(v));

// ========== 컴포넌트 ==========
const BookPaymentPage: React.FC = () => {
  const navigate = useNavigate();

  // Zustand Store
  const {
    showtimeId,
    selectedSeats,
    totalPrice,
    clearBooking,
    performanceInfo,
    selectedCoupon,
    setSelectedCoupon,
  } = useBookingStore() as unknown as {
    showtimeId?: number;
    selectedSeats: SelectedSeat[];
    totalPrice: number;
    clearBooking: () => void;
    performanceInfo?: PerformanceInfo;
    selectedCoupon: Coupon | null;
    setSelectedCoupon: (c: Coupon | null) => void;
  };

  // State
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>(1);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(selectedCoupon?.id ?? null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [deliveryType, setDeliveryType] = useState<"onsite" | "mobile" | "delivery">("mobile");
  const [phone, setPhone] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");

  // 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      try {
        const me = await fetchMe();
        setUser(me);
      } catch {
        toast.error("사용자 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // 좌석 정보 문자열
  const seatInfo = selectedSeats
    .map((s) => `${getSeatZoneText(s)} ${getSeatRowText(s)}열 ${getSeatNumberText(s)}번`)
    .join(", ");

  // 가격 계산
  const basePrice = totalPrice;
  const priceDiscount = 0;

  const coupon = selectedCouponId ? availableCoupons.find((c) => c.id === selectedCouponId) : null;
  const couponDiscount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.discountType === "FIXED") return coupon.discountValue;
    return Math.floor(basePrice * (coupon.discountValue / 100));
  }, [coupon, basePrice]);

  const bookingFee = 2000;
  const deliveryFee = deliveryType === "delivery" ? 3700 : 0;
  const finalPrice = basePrice - priceDiscount - couponDiscount + bookingFee + deliveryFee;

  // 이벤트 핸들러
  const handleNext = () => {
    if (selectedCouponId !== null) {
      const c = availableCoupons.find((x) => x.id === selectedCouponId) ?? null;
      setSelectedCoupon(c);
    }
    setStep(2);
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  const handlePayment = async () => {
    if (!showtimeId) {
      toast.error("회차 정보가 없습니다.");
      return;
    }

    const seatIds = selectedSeats
      .map(getSeatId)
      .filter((x): x is number | string => x !== undefined)
      .map(toNumber);

    if (seatIds.length === 0) {
      toast.error("선택된 좌석이 없습니다.");
      return;
    }

    setLoading(true);
    try {
      await confirmBooking({
        showtimeId,
        seatIds,
      });

      toast.success("예매가 완료되었습니다!");
      clearBooking();
      navigate("/mypage");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        toast.error("선택하신 좌석 정보를 찾을 수 없거나 이미 판매된 좌석입니다. 다시 시도해 주세요.");
        clearBooking();
        navigate("/");
      } else {
        const msg = err instanceof Error ? err.message : "결제 처리 중 오류가 발생했습니다.";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ========== 헤더 ========== */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">예매 진행</h1>
            <div className="flex items-center gap-3">
              <div className={`px-5 py-2 rounded-full text-sm font-bold ${
                step === 1 ? 'bg-green-100 text-green-700' : 'bg-white text-gray-500'
              }`}>
                STEP 1 · 가격 선택
              </div>
              <div className="w-8 h-px bg-gray-300"></div>
              <div className={`px-5 py-2 rounded-full text-sm font-bold ${
                step === 2 ? 'bg-green-100 text-green-700' : 'bg-white text-gray-500'
              }`}>
                STEP 2 · 배송/결제
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== 메인 콘텐츠 ========== */}
      <main className="max-w-[1400px] mx-auto px-6 py-5">
        <div className="flex gap-6">

          {/* ========== 왼쪽: 입력 영역 ========== */}
          <div className="flex-1 space-y-3 min-h-[calc(100vh-120px)]">

            {/* STEP 1 */}
            {step === 1 && (
              <>
                {/* 티켓 가격 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">티켓가격을 선택하세요</h3>
                  <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">1매 선택</p>
                        <p className="text-xs text-gray-700">{seatInfo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {basePrice.toLocaleString()}
                          <span className="text-base font-semibold text-gray-600 ml-1">원</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 날짜 및 회차 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">날짜 및 회차 확인</h3>
                  <div className="bg-white rounded-lg p-5 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{performanceInfo?.date || "날짜 정보 없음"}</p>
                    <p className="text-xs text-gray-500 mt-1.5">총 1석 선택</p>
                  </div>
                </section>

                {/* 할인 쿠폰 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">할인쿠폰을 선택하세요</h3>
                  <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">쿠폰</span>
                      <span className="text-sm font-bold text-green-600">{availableCoupons.length}개</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {availableCoupons.map((cp) => {
                      const isSelected = selectedCouponId === cp.id;
                      return (
                        <label
                          key={cp.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition ${
                            isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="coupon"
                            checked={isSelected}
                            onChange={() => setSelectedCouponId(isSelected ? null : cp.id)}
                            className="w-5 h-5"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{cp.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {cp.discountType === "FIXED"
                                ? `${cp.discountValue.toLocaleString()}원 할인`
                                : `${cp.discountValue}% 할인`}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </section>

                {/* 공연 예매권 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">공연 예매권</h3>
                  <div className="bg-white rounded-lg p-5 text-center border border-gray-200">
                    <p className="text-sm text-gray-500">사용 가능한 예매권: 0개</p>
                  </div>
                </section>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                {/* 수령 방법 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">수령방법을 선택하세요</h3>
                  <div className="space-y-3">
                    {[
                      { label: "현장수령", value: "onsite" },
                      { label: "모바일티켓", value: "mobile" },
                      { label: "배송(3,700원)", value: "delivery", note: "12월 30일 일괄발송(배송일 기준 최대 4~5일 이내 배송)" }
                    ].map((option) => {
                      const checked = deliveryType === option.value;
                      return (
                        <label
                          key={option.value}
                          className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition ${
                            checked ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            value={option.value}
                            checked={checked}
                            onChange={() => setDeliveryType(option.value as "onsite" | "mobile" | "delivery")}
                            className="mt-0.5 w-5 h-5"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{option.label}</p>
                            {option.note && (
                              <p className="text-xs text-gray-500 mt-1.5">{option.note}</p>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </section>

                {/* 주문자 정보 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">주문자정보</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <label className="text-sm text-gray-700">이름 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={user?.name || ""}
                        readOnly
                        className="h-10 px-3 border border-gray-300 rounded-lg bg-white text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <label className="text-sm text-gray-700">연락처 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                      <label className="text-sm text-gray-700">이메일 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={user?.email || ""}
                        readOnly
                        className="h-10 px-3 border border-gray-300 rounded-lg bg-white text-sm"
                      />
                    </div>
                  </div>
                </section>

                {/* 배송지 정보 (배송 선택 시에만) */}
                {deliveryType === "delivery" && (
                  <section className="bg-white rounded-lg p-5 border border-gray-200">
                    <h3 className="text-base font-bold text-gray-900 mb-4">배송지 정보</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-sm text-gray-700">수령인 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={receiver}
                          onChange={(e) => setReceiver(e.target.value)}
                          className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-sm text-gray-700">연락처 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={receiverPhone}
                          onChange={(e) => setReceiverPhone(e.target.value)}
                          className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-sm text-gray-700">기본 주소 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={addr1}
                          onChange={(e) => setAddr1(e.target.value)}
                          className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                        <label className="text-sm text-gray-700">상세 주소 <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={addr2}
                          onChange={(e) => setAddr2(e.target.value)}
                          className="h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </section>
                )}

                {/* 결제 수단 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">결제수단을 선택하세요</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {["카드", "계좌이체", "무통장입금", "휴대폰", "간편결제"].map((method) => {
                      const isSelected = selectedPaymentMethod === method;
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setSelectedPaymentMethod(method)}
                          className={`h-12 rounded-lg border-2 transition-all text-sm font-semibold shadow-sm ${
                            isSelected
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 bg-white hover:border-green-500 hover:bg-green-50 hover:shadow-md'
                          }`}
                        >
                          {method}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* 약관 동의 */}
                <section className="bg-white rounded-lg p-5 border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">예매자 동의</h3>
                  <div className="space-y-3 text-sm">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 w-5 h-5" />
                      <span>[필수] 예매 및 취소 수수료 / 취소기한을 확인하였으며 동의합니다.</span>
                    </label>

                    <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                      <div className="grid grid-cols-2 bg-white border-b">
                        <div className="px-4 py-2.5 font-semibold">취소일</div>
                        <div className="px-4 py-2.5 font-semibold">취소수수료</div>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-100">
                        <div className="px-4 py-2.5">공연 7일 전까지</div>
                        <div className="px-4 py-2.5">없음</div>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-100">
                        <div className="px-4 py-2.5">공연 6일 ~ 3일 전</div>
                        <div className="px-4 py-2.5">티켓금액의 20%</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2.5">공연 2일 전 ~ 당일</div>
                        <div className="px-4 py-2.5">티켓금액의 30%</div>
                      </div>
                    </div>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 w-5 h-5" />
                      <span>[필수] 개인정보 수집/이용에 동의합니다.</span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 w-5 h-5" />
                      <span>[필수] 개인정보 제3자 제공 동의 및 주의사항을 확인했습니다.</span>
                    </label>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* ========== 오른쪽: 결제 요약 ========== */}
          <div className="w-[380px] shrink-0 space-y-3">
            {/* 공연 정보 박스 */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                {performanceInfo?.title || "공연 정보 없음"}
              </h2>
              <div className="mt-2.5 space-y-1.5 text-sm text-gray-700">
                <p>{performanceInfo?.date || ""}</p>
                <p>총 {selectedSeats.length}석</p>
                <p className="text-gray-600 text-xs">{seatInfo}</p>
              </div>
            </div>

            {/* 결제 정보 박스 */}
            <div className="sticky top-[88px] bg-white rounded-lg p-5 border border-gray-200 min-h-[calc(100vh-280px)] flex flex-col">

              {/* 결제금액 */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-900 mb-3">결제금액</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>티켓금액</span>
                    <span>{basePrice.toLocaleString()}원</span>
                  </div>
                  {priceDiscount > 0 && (
                    <div className="flex justify-between">
                      <span>가격할인</span>
                      <span className="text-red-600">-{priceDiscount.toLocaleString()}원</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between">
                      <span>쿠폰할인</span>
                      <span className="text-red-600">-{couponDiscount.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>예매수수료</span>
                    <span>{bookingFee.toLocaleString()}원</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>배송료</span>
                      <span>{deliveryFee.toLocaleString()}원</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 총 결제금액 */}
              <div className="py-3 mb-3 border-y border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">총 결제금액</span>
                  <p className="text-2xl font-bold text-green-600">
                    {finalPrice.toLocaleString()}
                    <span className="text-base font-semibold text-gray-600 ml-1">원</span>
                  </p>
                </div>
              </div>

              {/* 안내사항 */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 text-sm text-gray-600">
                <p>• 취소기한: <span className="text-orange-600 font-semibold">2026년 1월 16일(금) 16:59 까지</span></p>
                <p>• 취소수수료: <span className="text-green-700 font-semibold">티켓금액의 0~30%</span></p>
              </div>

              {/* 환불 안내 */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h5 className="text-sm font-bold text-gray-900 mb-3">환불 안내</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 공연 7일 전: 전액 환불</p>
                  <p>• 공연 6~3일 전: 80% 환불</p>
                  <p>• 공연 2일 전~당일: 70% 환불</p>
                </div>
              </div>

              {/* 예매 유의사항 */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h5 className="text-sm font-bold text-gray-900 mb-3">예매 유의사항</h5>
                <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                  <p>• 티켓 수령 후 스탠딩석은 현장 입장 순서대로 자리가 배정됩니다.</p>
                  <p>• 본 공연은 만 7세 이상 관람가능합니다.</p>
                  <p>• 공연 시작 후 입장이 제한될 수 있습니다.</p>
                  <p>• 주차 공간이 협소하니 대중교통을 이용해주세요.</p>
                </div>
              </div>

              {/* 고객센터 */}
              <div className="mb-4">
                <h5 className="text-sm font-bold text-gray-900 mb-3">고객센터</h5>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <p>평일 09:00 - 18:00</p>
                  <p>점심시간 12:00 - 13:00</p>
                  <p className="text-green-600 font-semibold">📞 1588-0000</p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="h-11 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-100 text-sm font-semibold transition shadow-sm"
                >
                  이전
                </button>
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-bold transition shadow-sm"
                  >
                    다음
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={loading}
                    className="h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-50 text-sm font-bold transition shadow-sm"
                  >
                    {loading ? "처리중..." : "결제하기"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookPaymentPage;