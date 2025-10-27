package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    /**
     * 사용자의 특정 회차(showId)에 대해 가장 최근 생성된 HOLD 상태 예약 1건을 조회
     */
    Optional<Reservation> findTopByUserIdAndShowIdAndStatusOrderByCreatedAtDesc(
            Long userId, Long showId, String status
    );
}
