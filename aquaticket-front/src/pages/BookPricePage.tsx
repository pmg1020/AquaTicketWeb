// src/pages/BookPricePage.tsx
import React from "react";
import "../css/book.css";

const BookPricePage: React.FC = () => {
  return (
    <div className="book-price-layout">
      {/* 왼쪽: 가격/할인 선택 */}
      <div className="price-left">
        <h2>티켓가격을 선택하세요</h2>
        <div className="price-box">
          <div className="row">
            <span>스탠딩석</span>
            <span className="right">132,000원</span>
          </div>
          <div className="row sub">
            <span>기본가</span>
            <select>
              <option>1매 선택</option>
            </select>
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
            <span>132,000원</span>
          </div>
          <div className="summary-row">
            <span>예매수수료</span>
            <span>2,000원</span>
          </div>
          <div className="summary-total">
            <span>총 결제금액</span>
            <span className="highlight">134,000원</span>
          </div>
        </div>

        <div className="summary-footer">
          <button className="back-btn">이전</button>
          <button className="next-btn">다음</button>
        </div>
      </div>
    </div>
  );
};

export default BookPricePage;
