package com.aquaticket.aquaticketback.booking.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Seat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @Column(name = "row_label", length = 10, nullable = false)
    private String rowLabel;

    @Column(name = "seat_no", nullable = false)
    private Integer seatNo;

    @Column(nullable = false)
    private Integer price;
}
