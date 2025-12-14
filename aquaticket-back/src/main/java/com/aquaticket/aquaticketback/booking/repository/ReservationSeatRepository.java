package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.ReservationSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.aquaticket.aquaticketback.booking.domain.Reservation;

import java.util.List;
import java.util.Set;

public interface ReservationSeatRepository extends JpaRepository<ReservationSeat, Long> {

    @Query(value = "SELECT rs.seat_id FROM reservation_seats rs JOIN reservations r ON rs.reservation_id = r.id WHERE r.showtime_id = :showtimeId AND r.status = 'CONFIRMED'", nativeQuery = true)
    Set<Long> findSeatIdsByShowtime(@Param("showtimeId") Long showtimeId);

    List<ReservationSeat> findByReservation(Reservation reservation);
}
