// 메인 페이지 (공연 상세)
function openBooking(performanceId) {
  const url = `/reservation/popup/onestop.htm?perfId=${performanceId}`;
  const bookingWin = window.open(
    url,
    'MelonTicketBooking',
    'width=1024,height=720,resizable=yes,scrollbars=yes'
  );

  if (!bookingWin || bookingWin.closed) {
    alert('팝업 차단이 설정되어 있습니다. 팝업 허용 후 다시 시도해주세요.');
  }
}

내가 원하는 게 이 팝업에서 좌석 선택·인증·결제를 처리하고,
완료 후에는 window.opener.location.reload() 같은 식으로 부모창에 결과를 반영하는 구조야.

즉 👉
멜론티켓의 예매 단계는 “작게 열리는 새 창”이 아니라, window.open으로 띄운 정식 팝업창이다.
그래서 팝업 차단이 되어 있으면 예매 창이 안 열리고 “팝업 차단 해제” 안내가 뜨는 거야.