package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByVenueIdOrderByRowLabelAscSeatNoAsc(Long venueId);
}
