오후 12:23:47: 실행 중 ':classes'…


> Task :compileJava FAILED
C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\controller\BookingController.java:35: error: incompatible types: Long cannot be converted to Integer
        Integer showtimeId = bookingService.ensureShowtime(request.getKopisId(), request.getStartAt());
                                                          ^
1 error

[Incubating] Problems report is available at: file:///C:/Users/nem40/IdeaProjects/aquaticket-back/build/reports/problems/problems-report.html
1 actionable task: 1 executed

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':compileJava'.
> Compilation failed; see the compiler output below.
  C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\controller\BookingController.java:35: error: incompatible types: Long cannot be converted to Integer
          Integer showtimeId = bookingService.ensureShowtime(request.getKopisId(), request.getStartAt());
                                                            ^
  1 error

* Try:
> Check your code and dependencies to fix the compilation error(s)
> Run with --scan to get full insights.

BUILD FAILED in 1s
오후 12:23:49: 실행이 완료되었습니다 ':classes'.
