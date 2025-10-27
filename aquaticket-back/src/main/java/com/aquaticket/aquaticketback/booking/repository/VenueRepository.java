package com.aquaticket.aquaticketback.booking.repository;

import com.aquaticket.aquaticketback.booking.domain.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Long> {
}
