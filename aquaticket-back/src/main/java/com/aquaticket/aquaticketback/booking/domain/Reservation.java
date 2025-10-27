package com.aquaticket.aquaticketback.booking.domain;

import com.aquaticket.aquaticketback.domain.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Long userId 대신 User 객체와 직접 연관관계를 맺도록 수정
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id")
    private Show show;

    // 관람일시 정보를 위해 Showtime 과의 관계 추가
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showtime_id")
    private Showtime showtime;

    // 예매번호 필드 추가
    @Column(unique = true)
    private String bookingNumber;

    private String status; // HOLD, CONFIRMED, CANCELLED

    private Integer totalPrice;

    // bookingDate 로 활용될 예매 확정 시간
    private LocalDateTime confirmedAt;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;
}