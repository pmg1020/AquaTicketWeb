주소창 URL 형태

ticket.melon.com/reservation/popup/onestop.htm


→ /popup/ 디렉터리 안에 HTML 파일이 로드되고 있음.
→ 즉, window.open() 같은 방식으로 새로운 브라우저 창에서 불러온 전용 예매 페이지.

브라우저 탭 이름

상단 탭 제목이 “멜론 티켓 – Chrome” 으로 따로 표시되어 있음.

메인 페이지(ticket.melon.com/performance/index.htm)와 별개의 창으로 작동 중.

UI 구조

배경이 전체 페이지가 아니라, 좌석도 + 인증 입력창만 표시되는 축소된 전용 페이지.

일반적인 모달(overlay)이라면 URL이 변하지 않고 뒤의 메인 페이지가 흐리게 보이는데,
지금은 URL 자체가 다른 페이지로 로드되고 있음.

보안/인증 절차

“인증예매” 캡차 입력창은 FNATTS처럼 자동예매 방지를 위한 서버단 로직이 포함된 별도 세션 페이지.

이런 경우 iframe 또는 window.open 팝업이 가장 안전하게 세션을 분리함.

✅ 정리하면
항목	설명
창 종류	window.open()으로 띄운 팝업창
URL	/reservation/popup/onestop.htm
메인 페이지와의 관계	별도 세션, opener(부모창)와 연결
브라우저 상단	독립된 주소 표시줄 존재
기능 목적	좌석선택·캡차·결제 등 예매 전용 프로세스
닫기 시 동작	부모창 새로고침 또는 결제 완료 메시지 전달 (window.opener.postMessage)

지금 수정된 건 예매하기 버튼 클릭 했을 때 작품 상세페이지가 똑같은게 1개 뜨고 그 위에 보안문자 팝업창이 하나 열리는 형식인데 이게 아니야