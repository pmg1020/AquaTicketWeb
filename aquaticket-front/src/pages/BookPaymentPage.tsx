import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useBookingStore, { type Coupon } from "@/stores/useBookingStore";
import { fetchMe, type Me } from "@/api/auth";
import { confirmBooking } from "@/api/booking";

// --- Book Store Seat Type (any 제거용) ---
type SelectedSeat = {
  id?: number | string; // 일부 코드에서 id를 쓰는 경우 대비
  seatId?: number | string;
  zoneId?: string;
  zone?: string;

  row?: string;
  seatRow?: string;

  number?: string | number;
  seatNumber?: string | number;
  seatNo?: string | number;
  label?: string; // svg label 쓰는 경우 대비
};

// --- Performance Info Type(스토어 구조가 다르면 여기만 맞추면 됨) ---
type PerformanceInfo = {
  title?: string;
  date?: string;
};

// --- Mock Data for Coupons ---
const availableCoupons: Coupon[] = [
  { id: 1, name: "신규회원 10% 할인", discountType: "PERCENT", discountValue: 10 },
  { id: 2, name: "5,000원 할인 쿠폰", discountType: "FIXED", discountValue: 5000 },
];

type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, subtitle, children }) => (
  <section className="bg-white border border-gray-200 rounded-xl p-5">
    <div className="flex items-start justify-between gap-4 mb-4">
      <div>
        <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);

type InfoFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (v: string) => void;
};

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  placeholder,
  readOnly,
  required,
  onChange,
}) => (
  <div className="grid grid-cols-[110px_1fr] items-center gap-3">
    <label className="text-[13px] text-gray-700 whitespace-nowrap">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/60 read-only:bg-gray-50"
    />
  </div>
);

type RadioGroupProps = {
  name: string;
  options: { label: string; value: string; note?: string }[];
  value: string;
  onChange: (v: string) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, value, onChange }) => (
  <div className="space-y-2">
    {options.map((option) => {
      const checked = option.value === value;
      return (
        <label
          key={option.value}
          className={[
            "flex items-start gap-3 cursor-pointer rounded-lg border px-3 py-3 transition",
            checked
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
          ].join(" ")}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={checked}
            onChange={() => onChange(option.value)}
            className="mt-[3px]"
          />
          <div className="flex-1">
            <p className="text-[13px] font-medium text-gray-900">{option.label}</p>
            {option.note && (
              <p className="mt-1 text-[11px] leading-snug text-gray-500">{option.note}</p>
            )}
          </div>
        </label>
      );
    })}
  </div>
);

const AgreementSection: React.FC = () => (
  <Section title="예매자 동의" subtitle="결제 진행을 위해 필수 항목에 동의해주세요.">
    <div className="space-y-3 text-[13px]">
      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="mt-[3px] w-4 h-4" />
        <span>[필수] 예매 및 취소 수수료 / 취소기한을 확인하였으며 동의합니다.</span>
      </label>

      <div className="border border-gray-200 rounded-lg overflow-hidden text-[11px]">
        <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
          <div className="px-3 py-2 font-semibold text-gray-700">취소일</div>
          <div className="px-3 py-2 font-semibold text-gray-700">취소수수료</div>
        </div>
        <div className="grid grid-cols-2 border-b border-gray-100">
          <div className="px-3 py-2">공연 7일 전까지</div>
          <div className="px-3 py-2">없음</div>
        </div>
        <div className="grid grid-cols-2 border-b border-gray-100">
          <div className="px-3 py-2">공연 6일 ~ 3일 전</div>
          <div className="px-3 py-2">티켓금액의 20%</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="px-3 py-2">공연 2일 전 ~ 당일</div>
          <div className="px-3 py-2">티켓금액의 30%</div>
        </div>
      </div>

      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="mt-[3px] w-4 h-4" />
        <span>[필수] 개인정보 수집/이용에 동의합니다.</span>
      </label>

      <label className="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" className="mt-[3px] w-4 h-4" />
        <span>[필수] 개인정보 제3자 제공 동의 및 주의사항을 확인했습니다.</span>
      </label>

      <p className="text-[11px] leading-snug text-gray-500">
        예매 당일 취소할 경우 예매수수료 및 취소수수료 환불이 가능합니다. 취소수수료는 예매일 기준으로
        부과됩니다.
      </p>
    </div>
  </Section>
);

type Step = 1 | 2;

const getSeatZoneText = (seat: SelectedSeat): string => seat.zoneId ?? seat.zone ?? "";
const getSeatRowText = (seat: SelectedSeat): string => seat.row ?? seat.seatRow ?? "";
const getSeatNumberText = (seat: SelectedSeat): string => {
  const v = seat.number ?? seat.seatNumber ?? seat.seatNo ?? seat.label ?? "";
  return String(v);
};

const getSeatId = (seat: SelectedSeat): number | string | undefined => seat.seatId ?? seat.id;

// ✅ number[]로 안전하게 바꾸는 헬퍼
const toNumber = (v: number | string): number => (typeof v === "number" ? v : Number(v));

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
  } = useBookingStore() as unknown as {
    showtimeId?: number;
    selectedSeats: SelectedSeat[];
    totalPrice: number;
    clearBooking: () => void;
    performanceInfo?: PerformanceInfo;
    selectedCoupon: Coupon | null;
    setSelectedCoupon: (c: Coupon | null) => void;
  };

  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState<Step>(1);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(
    selectedCoupon?.id ?? null
  );

  const [deliveryType, setDeliveryType] = useState<"onsite" | "mobile" | "delivery">("mobile");
  const [phone, setPhone] = useState("");
  const [receiver, setReceiver] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchMe();
        setUser(userData);
      } catch {
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    if (!selectedSeats || selectedSeats.length === 0) {
      toast.error("선택된 좌석이 없습니다. 다시 시도해주세요.");
      navigate("/");
      return;
    }

    getUser();
  }, [navigate, selectedSeats]);

  const seatInfo = useMemo(() => {
    if (!selectedSeats?.length) return "";
    const first = selectedSeats[0];

    const zone = getSeatZoneText(first);
    const row = getSeatRowText(first);

    const nums = selectedSeats
      .map((s) => getSeatNumberText(s))
      .filter((v) => v.trim().length > 0)
      .join(", ");

    return `${zone}${row ? ` ${row}` : ""}${nums ? ` ${nums}` : ""}`.trim();
  }, [selectedSeats]);

  const handleCouponChange = (couponId: number | null) => {
    setSelectedCouponId(couponId);
    if (couponId === null) {
      setSelectedCoupon(null);
    } else {
      const coupon = availableCoupons.find((c) => c.id === couponId) ?? null;
      setSelectedCoupon(coupon);
    }
  };

  const basePrice = totalPrice || 0;
  const priceDiscount = 0;
  const bookingFee = 2000;
  const deliveryFee = deliveryType === "delivery" ? 3700 : 0;

  const couponDiscount = useMemo(() => {
    if (!selectedCoupon) return 0;
    if (selectedCoupon.discountType === "PERCENT") {
      return Math.floor((basePrice * selectedCoupon.discountValue) / 100);
    }
    return Math.min(basePrice, selectedCoupon.discountValue);
  }, [selectedCoupon, basePrice]);

  const finalPrice = Math.max(0, basePrice - priceDiscount - couponDiscount) + bookingFee + deliveryFee;

  const handleNext = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (step === 1) {
      navigate(-1);
      return;
    }
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = async () => {
    if (!showtimeId || selectedSeats.length === 0) {
      toast.error("예매 정보가 올바르지 않습니다.");
      return;
    }

    // ✅ 여기에서 확실히 number[]로 만들기 (ConfirmRequest: seatIds: number[])
    const seatIds: number[] = selectedSeats
      .map((s) => getSeatId(s))
      .filter((id): id is number | string => id !== undefined)
      .map((id) => toNumber(id))
      .filter((id) => Number.isFinite(id));

    if (seatIds.length === 0) {
      toast.error("좌석 ID를 찾을 수 없습니다. 좌석 데이터 구조를 확인해주세요.");
      return;
    }

    // (선택) 일부가 NaN으로 빠졌을 경우 방지
    if (seatIds.length !== selectedSeats.length) {
      toast.error("좌석 ID 형식이 올바르지 않습니다. 다시 좌석을 선택해주세요.");
      return;
    }

    try {
      setLoading(true);
      await confirmBooking({ showtimeId, seatIds }); // ✅ 타입 에러 해결
      toast.success("예매가 완료되었습니다.");
      clearBooking();
      navigate("/mypage");
    } catch {
      toast.error("예매 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const stepTitle = step === 1 ? "가격 선택" : "배송/결제";
  const stepBadge = step === 1 ? "STEP 2 · 가격 선택" : "STEP 3 · 배송/결제";

  if (loading && !user) {
    return <div className="min-h-screen bg-gray-100" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ max-width 확장: 우측 여백 줄이기 */}
      <div className="max-w-[1280px] mx-auto px-4 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[34px] font-extrabold tracking-tight text-gray-900">{stepTitle}</h1>
            <p className="mt-2 text-[13px] text-gray-600">
              {step === 1
                ? "선택한 티켓 가격과 할인 수단을 확인하는 단계입니다."
                : "티켓 수령방법과 결제정보를 입력하는 단계입니다."}
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-semibold text-gray-700">
              {stepBadge}
            </span>
          </div>
        </div>
      </div>

      {/* ✅ max-width 확장 + 2컬럼 고정: 좌측이 남는 폭 전부 사용 */}
      <main className="max-w-[1280px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          {/* LEFT */}
          <div className="space-y-6 min-w-0">
            {step === 1 && (
              <>
                <Section
                  title="티켓가격을 선택하세요"
                  subtitle="선택한 좌석/구역에 따라 가격이 표시됩니다."
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[13px] text-gray-700">
                      <p className="font-semibold">{selectedSeats.length}매 선택</p>
                      <p className="mt-1 text-gray-500">{seatInfo}</p>
                    </div>
                    <div className="text-[22px] font-extrabold text-gray-900">
                      {basePrice.toLocaleString()}원
                    </div>
                  </div>
                </Section>

                <Section
                  title="날짜 및 회차 확인"
                  subtitle="선택한 회차에서 예매가 진행됩니다. 날짜/시간을 다시 확인해주세요."
                >
                  <div className="text-[14px] font-semibold text-gray-900">
                    {performanceInfo?.date || "날짜 정보 없음"}
                  </div>
                </Section>

                <Section title="할인수단을 선택하세요" subtitle="쿠폰은 1개만 적용됩니다.">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[13px] h-10 border border-gray-200 rounded-lg px-3 bg-gray-50">
                      <span className="font-medium text-gray-800">쿠폰</span>
                      <span className="text-green-700 font-semibold">
                        {selectedCouponId ? "1개 사용 중" : "0개"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => handleCouponChange(null)}
                        className={[
                          "w-full flex items-center justify-between rounded-lg border px-3 py-3 text-left transition",
                          selectedCouponId === null
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span className="text-[13px] text-gray-700">쿠폰 사용 안함</span>
                        <span className="text-[13px] text-gray-500">0원</span>
                      </button>

                      {availableCoupons.map((coupon) => (
                        <button
                          key={coupon.id}
                          type="button"
                          onClick={() => handleCouponChange(coupon.id)}
                          className={[
                            "w-full flex items-center justify-between rounded-lg border px-3 py-3 text-left transition",
                            selectedCouponId === coupon.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          <span className="text-[13px] text-gray-700">{coupon.name}</span>
                          <span className="text-[13px] font-extrabold text-green-700">
                            {coupon.discountType === "PERCENT"
                              ? `${coupon.discountValue}% 할인`
                              : `${coupon.discountValue.toLocaleString()}원 할인`}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[13px] h-10 border border-gray-200 rounded-lg px-3 bg-gray-50">
                      <span className="font-medium text-gray-800">공연예매권</span>
                      <span className="text-green-700 font-semibold">0개</span>
                    </div>
                  </div>
                </Section>

                <Section title="안내" subtitle="다음 단계에서 입력할 내용입니다.">
                  <ul className="text-[13px] text-gray-700 list-disc pl-5 space-y-1">
                    <li>수령방법(모바일/현장/배송)</li>
                    <li>주문자/배송지 정보</li>
                    <li>결제수단 선택 및 예매자 동의</li>
                  </ul>
                  <p className="mt-3 text-[12px] text-gray-500">
                    우측 결제요약에서 금액이 실시간 반영됩니다.
                  </p>
                </Section>
              </>
            )}

            {step === 2 && (
              <>
                <Section title="수령방법을 선택하세요">
                  <RadioGroup
                    name="delivery"
                    value={deliveryType}
                    onChange={(v) => setDeliveryType(v as "onsite" | "mobile" | "delivery")}
                    options={[
                      { label: "현장수령", value: "onsite" },
                      { label: "모바일티켓", value: "mobile" },
                      {
                        label: "배송(3,700원)",
                        value: "delivery",
                        note: "12월 30일 일괄발송(배송일 기준 최대 4~5일 이내 배송)",
                      },
                    ]}
                  />
                </Section>

                <Section
                  title="주문자정보"
                  subtitle="입력하신 정보는 공연장에서 예매확인을 위해 사용될 수 있습니다."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="이름" value={user?.name || ""} readOnly required />
                    <InfoField
                      label="연락처"
                      value={phone}
                      placeholder="010-0000-0000"
                      required
                      onChange={setPhone}
                    />
                    <div className="md:col-span-2">
                      <InfoField label="이메일" value={user?.email || ""} readOnly required />
                    </div>
                  </div>
                </Section>

                <Section title="배송지 정보" subtitle="배송 선택 시 필수 입력입니다.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField
                      label="수령인"
                      value={receiver}
                      required={deliveryType === "delivery"}
                      onChange={setReceiver}
                    />
                    <InfoField
                      label="연락처"
                      value={receiverPhone}
                      required={deliveryType === "delivery"}
                      onChange={setReceiverPhone}
                    />
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InfoField
                        label="기본 주소"
                        value={addr1}
                        placeholder="기본 주소"
                        required={deliveryType === "delivery"}
                        onChange={setAddr1}
                      />
                      <InfoField
                        label="상세 주소"
                        value={addr2}
                        placeholder="상세 주소"
                        required={deliveryType === "delivery"}
                        onChange={setAddr2}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="h-10 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-[13px]"
                    >
                      우편번호 찾기
                    </button>
                    <label className="inline-flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" />
                      기본 배송지로 설정
                    </label>
                  </div>
                </Section>

                <Section title="결제수단을 선택하세요">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["카드", "무통장입금", "휴대폰 결제", "간편결제", "계좌이체"].map((label) => (
                      <button
                        key={label}
                        type="button"
                        className="h-11 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 hover:border-green-500 transition text-[13px] font-semibold text-gray-800"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Section>

                <AgreementSection />
              </>
            )}
          </div>

          {/* RIGHT */}
          <aside className="w-full lg:sticky lg:top-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm min-h-[calc(100vh-120px)] flex flex-col">
              <div className="pb-4 mb-4 border-b border-gray-200">
                <h2 className="text-[14px] font-extrabold leading-snug">
                  {performanceInfo?.title || "공연 정보 없음"}
                </h2>
                <div className="mt-2 text-[12px] text-gray-600 space-y-1">
                  <p>{performanceInfo?.date || ""}</p>
                  <p>총 {selectedSeats.length}석 선택</p>
                  <p className="text-gray-500">{seatInfo}</p>
                </div>
              </div>

              <h4 className="text-[13px] font-extrabold mb-3 text-gray-900">결제금액</h4>
              <div className="space-y-1 text-[12px] text-gray-700">
                <div className="flex justify-between">
                  <span>티켓금액</span>
                  <span>{basePrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>가격할인</span>
                  <span>{priceDiscount.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>쿠폰할인</span>
                  <span>{couponDiscount > 0 ? `-${couponDiscount.toLocaleString()}원` : "0원"}</span>
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

              <div className="mt-4 py-3 border-y border-gray-200 flex justify-between items-center">
                <span className="text-[14px] font-extrabold">총 결제금액</span>
                <span className="text-[24px] font-extrabold text-green-700">
                  {finalPrice.toLocaleString()}원
                </span>
              </div>

              <div className="mt-3 text-[11px] text-gray-500 space-y-1">
                <p>
                  • 취소기한 :{" "}
                  <span className="text-orange-600 font-semibold">2026년 1월 16일(금) 16:59 까지</span>
                </p>
                <p>
                  • 취소수수료 :{" "}
                  <span className="text-green-700 font-semibold">티켓금액의 0~30%</span> (상세보기)
                </p>
              </div>

              <div className="mt-auto pt-5">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="h-11 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-[13px] font-semibold"
                    onClick={handlePrev}
                  >
                    이전
                  </button>

                  {step === 1 ? (
                    <button
                      type="button"
                      className="h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 text-[13px] font-extrabold"
                      onClick={handleNext}
                      disabled={loading}
                    >
                      다음
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 text-[13px] font-extrabold"
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? "처리중..." : "결제하기"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default BookPaymentPage;
