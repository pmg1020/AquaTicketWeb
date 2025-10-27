오후 12:19:42: 실행 중 ':classes'…


> Task :compileJava FAILED

[Incubating] Problems report is available at: file:///C:/Users/nem40/IdeaProjects/aquaticket-back/build/reports/problems/problems-report.html
1 actionable task: 1 executed
C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:55: error: cannot find symbol
        Optional<Showtime> existingShowtime = showtimeRepository.findByKopisIdAndStartAt(kopisId, parsedStartAt);
                                                                ^
  symbol:   method findByKopisIdAndStartAt(String,LocalDateTime)
  location: variable showtimeRepository of type ShowtimeRepository
C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:58: error: incompatible types: Long cannot be converted to Integer
            return existingShowtime.get().getId();
                                               ^
C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:66: error: cannot find symbol
            newShowtime.setKopisId(kopisId);
                       ^
  symbol:   method setKopisId(String)
  location: variable newShowtime of type Showtime
C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:71: error: incompatible types: Long cannot be converted to Integer
            return savedShowtime.getId();
                                      ^
4 errors

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':compileJava'.
> Compilation failed; see the compiler output below.
  C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:58: error: incompatible types: Long cannot be converted to Integer
              return existingShowtime.get().getId();
                                                 ^
  C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:71: error: incompatible types: Long cannot be converted to Integer
              return savedShowtime.getId();
                                        ^
  C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:55: error: cannot find symbol
          Optional<Showtime> existingShowtime = showtimeRepository.findByKopisIdAndStartAt(kopisId, parsedStartAt);
                                                                  ^
    symbol:   method findByKopisIdAndStartAt(String,LocalDateTime)
    location: variable showtimeRepository of type ShowtimeRepository
  C:\Users\nem40\IdeaProjects\aquaticket-back\src\main\java\com\aquaticket\aquaticketback\booking\service\BookingService.java:66: error: cannot find symbol
              newShowtime.setKopisId(kopisId);
                         ^
    symbol:   method setKopisId(String)
    location: variable newShowtime of type Showtime
  4 errors

* Try:
> Check your code and dependencies to fix the compilation error(s)
> Run with --scan to get full insights.

BUILD FAILED in 1s
오후 12:19:44: 실행이 완료되었습니다 ':classes'.
