package com.aquaticket.aquaticketback.booking.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "showtimes",
        indexes = {
                @Index(name = "idx_showtime_show", columnList = "show_id"),
                @Index(name = "idx_showtime_start_at", columnList = "start_at")
        })
public class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * KOPIS 공연 ID (예: PF241378)
     */
    @Column(name = "kopis_id", nullable = false)
    private String kopisId;

    /**
     * 어떤 공연(Show)에 속한 회차인지
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "show_id", nullable = false)
    private Show show;

    /**
     * 회차 시작 시각 (예: 2025-10-20T19:00:00)
     */
    @Column(name = "start_at", nullable = false)
    private LocalDateTime startAt;

    // 필요 시 좌석 관계를 뒤에 추가해도 됩니다.
    // @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<Seat> seats = new ArrayList<>();
}
