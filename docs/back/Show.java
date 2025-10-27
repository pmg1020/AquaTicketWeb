package com.aquaticket.aquaticketback.booking.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shows")  // 회차 테이블
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Show {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * KOPIS 공연 ID (예: PF241378)
     */
    @Column(name = "kopis_id", nullable = false)
    private String kopisId;

    // 어떤 공연(작품)의 회차인지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "performance_id", nullable = false)
    private Performance performance;

    // 회차 시작 시각
    @Column(name = "starts_at", nullable = false)
    private LocalDateTime startsAt;
}
