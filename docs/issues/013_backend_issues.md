오전 10:15:25: 실행 중 ':classes'…


> Task :compileJava FAILED

[Incubating] Problems report is available at: file:///C:/Users/nem40/IdeaProjects/aquaticket-back/build/reports/problems/problems-report.html
1 actionable task: 1 executed
C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:34: error: cannot find symbol
                        booking.getShow().getPerformance().getPosterUrl(),
                                                          ^
  symbol:   method getPosterUrl()
  location: class Performance
1 error

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':compileJava'.
> Compilation failed; see the compiler output below.
  C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:34: error: cannot find symbol
                          booking.getShow().getPerformance().getPosterUrl(),
                                                            ^
    symbol:   method getPosterUrl()
    location: class Performance
  1 error

* Try:
> Check your code and dependencies to fix the compilation error(s)
> Run with --scan to get full insights.

BUILD FAILED in 2s
오전 10:15:28: 실행이 완료되었습니다 ':classes'.
