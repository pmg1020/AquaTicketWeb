package com.aquaticket.aquaticketback.booking.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "performances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // KOPIS의 공연 ID
    @Column(name = "kopis_id", length = 50, unique = true)
    private String kopisId;

    @Column(nullable = false, length = 255)
    private String title;

    // 포스터 이미지 URL 필드 추가
    @Column(name = "poster_url", length = 512)
    private String posterUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id")
    private Venue venue;
}