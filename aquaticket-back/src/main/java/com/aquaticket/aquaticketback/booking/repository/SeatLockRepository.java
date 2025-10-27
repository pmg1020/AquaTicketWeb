package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.SeatLock;
import com.aquaticket.aquaticketback.booking.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SeatLockRepository extends JpaRepository<SeatLock, Long> {

    // ✅ 1. 만료된 잠금 제거용
    void deleteByLockedUntilBefore(LocalDateTime now);

    // ✅ 2. 현재 유효한 락 목록 조회 (BookingService#getSeatMap)
    @Query("""
        SELECT sl
        FROM SeatLock sl
        WHERE sl.show.id = :showId
          AND sl.lockedUntil > :now
    """)
    List<SeatLock> findValidLocks(Long showId, LocalDateTime now);

    // ✅ 3. 특정 좌석에 대한 락 단일 조회 (BookingService#holdSeats)
    Optional<SeatLock> findByShowIdAndSeatId(Long showId, Long seatId);

    // ✅ 4. 예약 삭제 시 락 제거
    void deleteByReservation(Reservation reservation);
}
