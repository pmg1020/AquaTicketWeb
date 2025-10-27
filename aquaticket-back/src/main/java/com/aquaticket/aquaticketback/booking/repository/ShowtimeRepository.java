package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Show;
import com.aquaticket.aquaticketback.booking.domain.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    Optional<Showtime> findByShowAndStartAt(Show show, LocalDateTime startAt);
    Optional<Showtime> findByKopisIdAndStartAt(String kopisId, LocalDateTime startAt);
}
