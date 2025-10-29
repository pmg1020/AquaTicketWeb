오후 12:07:15: 실행 중 ':classes'…


> Task :compileJava FAILED

[Incubating] Problems report is available at: file:///C:/aquaticket/aquaticket-back/build/reports/problems/problems-report.html
1 actionable task: 1 executed
C:\aquaticket\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:101: error: cannot find symbol
                status = SeatStatus.BOOKED;
                                   ^
  symbol:   variable BOOKED
  location: class SeatStatus
C:\aquaticket\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:103: error: cannot find symbol
                status = SeatStatus.HELD;
                                   ^
  symbol:   variable HELD
  location: class SeatStatus
2 errors

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':compileJava'.
> Compilation failed; see the compiler output below.
  C:\aquaticket\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:101: error: cannot find symbol
                  status = SeatStatus.BOOKED;
                                     ^
    symbol:   variable BOOKED
    location: class SeatStatus
  C:\aquaticket\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:103: error: cannot find symbol
                  status = SeatStatus.HELD;
                                     ^
    symbol:   variable HELD
    location: class SeatStatus
  2 errors

* Try:
> Check your code and dependencies to fix the compilation error(s)
> Run with --scan to get full insights.

BUILD FAILED in 1s
오후 12:07:16: 실행이 완료되었습니다 ':classes'.
