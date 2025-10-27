package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Performance;
import com.aquaticket.aquaticketback.booking.domain.Show;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShowRepository extends JpaRepository<Show, Long> {
    List<Show> findByPerformanceIdOrderByStartsAtAsc(Long performanceId);
    Optional<Show> findByPerformanceAndStartsAt(Performance performance, LocalDateTime startsAt);
    Optional<Show> findByKopisId(String kopisId);
    Optional<Show> findByKopisIdAndStartsAt(String kopisId, LocalDateTime startsAt);
}
