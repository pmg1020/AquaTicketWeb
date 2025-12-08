import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useBookingStore from "@/stores/useBookingStore";
import { fetchMe, type Me } from "@/api/auth";
import { confirmBooking } from "@/api/booking";
import "../css/book.css";

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
    return <div>Loading...</div>;
  }

  const bookingFee = 2000;
  const deliveryFee = 0;
  const finalPrice = totalPrice + bookingFee + deliveryFee;

  return (
    <div className="book-payment-layout">
      {/* 좌측: 배송 및 결제 정보 입력 */}
      <div className="payment-left">
        <h2>배송 및 결제 정보를 입력하세요</h2>

        {/* 예매자 정보 */}
        <div className="section">
          <h3>예매자 정보</h3>
          <div className="form-row">
            <label>이름</label>
            <input type="text" value={user?.name || ""} readOnly />
          </div>
          <div className="form-row">
            <label>연락처</label>
            <input type="text" placeholder="010-0000-0000" />
          </div>
          <div className="form-row">
            <label>이메일</label>
            <input type="email" value={user?.email || ""} readOnly />
          </div>
        </div>

        {/* 배송 방법 */}
        <div className="section">
          <h3>배송 방법</h3>
          <div className="radio-group">
            <label>
              <input type="radio" name="delivery" defaultChecked /> 모바일 티켓
            </label>
            <label>
              <input type="radio" name="delivery" /> 현장 수령
            </label>
          </div>
        </div>

        {/* 결제수단 */}
        <div className="section">
          <h3>결제수단 선택</h3>
          <div className="radio-group">
            <label>
              <input type="radio" name="pay" defaultChecked /> 신용카드
            </label>
            <label>
              <input type="radio" name="pay" /> 카카오페이
            </label>
            <label>
              <input type="radio" name="pay" /> 네이버페이
            </label>
          </div>
        </div>
      </div>

      {/* 우측: 결제 요약 */}
      <div className="payment-summary">
        <div className="summary-header">
          <h4>결제내역</h4>
        </div>
        <div className="summary-body">
          <div className="summary-row">
            <span>티켓금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="summary-row">
            <span>예매수수료</span>
            <span>{bookingFee.toLocaleString()}원</span>
          </div>
          <div className="summary-row">
            <span>배송비</span>
            <span>{deliveryFee.toLocaleString()}원</span>
          </div>
          <div className="summary-total">
            <span>총 결제금액</span>
            <span className="highlight">{finalPrice.toLocaleString()}원</span>
          </div>
        </div>

        <div className="summary-footer">
          <button className="back-btn" onClick={() => navigate(-1)}>이전</button>
          <button className="next-btn" onClick={handlePayment} disabled={loading}>
            {loading ? "처리중..." : "결제하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookPaymentPage;

