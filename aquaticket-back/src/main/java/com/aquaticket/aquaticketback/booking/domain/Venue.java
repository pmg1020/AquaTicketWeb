package com.aquaticket.aquaticketback.booking.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "venues")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Venue {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 255)
    private String address;
}
