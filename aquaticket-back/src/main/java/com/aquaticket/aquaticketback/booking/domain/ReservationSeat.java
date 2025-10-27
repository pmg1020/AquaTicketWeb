package com.aquaticket.aquaticketback.booking.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter @NoArgsConstructor
@Table(name="reservation_seats")
public class ReservationSeat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="reservation_id", nullable=false)
    private Reservation reservation;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name="seat_id", nullable=false)
    private Seat seat;

    private Integer price;
}
