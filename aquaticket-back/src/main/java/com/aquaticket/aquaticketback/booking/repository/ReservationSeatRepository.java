package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Reservation;
import com.aquaticket.aquaticketback.booking.domain.ReservationSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationSeatRepository extends JpaRepository<ReservationSeat, Long> {

    @Query("""
        SELECT rs.seat.id
        FROM ReservationSeat rs
        WHERE rs.reservation.show.id = :showId
          AND rs.reservation.status = 'CONFIRMED'
    """)
    List<Long> findConfirmedSeatIdsByShow(Long showId);

    /** 특정 예약에 속한 좌석 라인 전체 조회 (confirm 단계에서 중복/검증에 사용) */
    List<ReservationSeat> findByReservation(Reservation reservation);
}
