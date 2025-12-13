// src/pages/BookPricePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import useBookingStore from "@/stores/useBookingStore";

const BookPricePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSeats, totalPrice } = useBookingStore();

  const ticketPrice = selectedSeats.length > 0 ? selectedSeats[0].price : 0;
  const numTickets = selectedSeats.length;
  const bookingFee = 2000;
  const finalPrice = totalPrice + bookingFee;

  return (
    <div className="book-price-layout">
      {/* 왼쪽: 가격/할인 선택 */}
      <div className="price-left">
        <h2>티켓가격을 선택하세요</h2>
        <div className="price-box">
          <div className="row">
            <span>{selectedSeats.length > 0 ? selectedSeats[0].zone : '좌석'}</span>
            <span className="right">{ticketPrice.toLocaleString()}원</span>
          </div>
          <div className="row sub">
            <span>기본가</span>
            {/* 이 부분은 매수 선택 UI로, 현재는 선택된 매수만 보여줍니다. */}
            <span>{numTickets}매</span>
          </div>
        </div>

        <h3>할인수단을 선택하세요</h3>
        <div className="discount-box">
          <div className="row green">쿠폰 0개</div>
          <div className="row green">공연예매권 0개</div>
        </div>
      </div>

      {/* 오른쪽: 결제 요약 */}
      <div className="price-summary">
        <div className="summary-header">
          <h4>결제금액</h4>
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
          <div className="summary-total">
            <span>총 결제금액</span>
            <span className="highlight">{finalPrice.toLocaleString()}원</span>
          </div>
        </div>

        <div className="summary-footer">
          <button className="back-btn" onClick={() => navigate(-1)}>이전</button>
          <button className="next-btn" onClick={() => navigate("/book/payment")}>다음</button>
        </div>
      </div>
    </div>
  );
};

export default BookPricePage;
