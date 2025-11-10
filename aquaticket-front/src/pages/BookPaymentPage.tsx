import React from "react";
import "../css/book.css";

const BookPaymentPage: React.FC = () => {
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
            <input type="text" placeholder="홍길동" />
          </div>
          <div className="form-row">
            <label>연락처</label>
            <input type="text" placeholder="010-0000-0000" />
          </div>
          <div className="form-row">
            <label>이메일</label>
            <input type="email" placeholder="example@email.com" />
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
            <span>132,000원</span>
          </div>
          <div className="summary-row">
            <span>예매수수료</span>
            <span>2,000원</span>
          </div>
          <div className="summary-row">
            <span>배송비</span>
            <span>0원</span>
          </div>
          <div className="summary-total">
            <span>총 결제금액</span>
            <span className="highlight">134,000원</span>
          </div>
        </div>

        <div className="summary-footer">
          <button className="back-btn">이전</button>
          <button className="next-btn">결제하기</button>
        </div>
      </div>
    </div>
  );
};

export default BookPaymentPage;
