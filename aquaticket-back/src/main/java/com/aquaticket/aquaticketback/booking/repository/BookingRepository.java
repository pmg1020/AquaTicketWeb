package com.aquaticket.aquaticketback.booking.repository;
import com.aquaticket.aquaticketback.booking.domain.Reservation;
import com.aquaticket.aquaticketback.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);

}