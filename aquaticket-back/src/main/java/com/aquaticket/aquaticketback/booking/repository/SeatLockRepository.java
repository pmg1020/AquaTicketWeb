package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Show;
import com.aquaticket.aquaticketback.booking.domain.SeatLock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface SeatLockRepository extends JpaRepository<SeatLock, Long> {
    List<SeatLock> findByShowAndLockedUntilAfter(Show show, LocalDateTime lockedUntil);
}
