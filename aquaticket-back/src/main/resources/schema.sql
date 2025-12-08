-- 공연/장소/일정/좌석/예매의 최소 스키마

CREATE TABLE IF NOT EXISTS venues (
                                      id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                      kopis_facility_id VARCHAR(20) NULL UNIQUE,
                                      name VARCHAR(200) NOT NULL
    );

CREATE TABLE IF NOT EXISTS performances (
                                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                            kopis_id VARCHAR(50) NULL,            -- 외부 KOPIS 식별자(선택)
    title VARCHAR(255) NOT NULL,
    venue_id BIGINT NOT NULL,
    CONSTRAINT fk_perf_venue FOREIGN KEY (venue_id) REFERENCES venues(id)
    );

CREATE TABLE IF NOT EXISTS shows (
                                     id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                     performance_id BIGINT NOT NULL,
                                     starts_at DATETIME NOT NULL,
                                     CONSTRAINT fk_show_perf FOREIGN KEY (performance_id) REFERENCES performances(id),
    INDEX idx_shows_perf (performance_id)
    );

CREATE TABLE IF NOT EXISTS seats (
                                     id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                     venue_id BIGINT NOT NULL,
                                     row_label VARCHAR(5) NOT NULL,  -- A, B, C...
    seat_no INT NOT NULL,           -- 1, 2, 3...
    price INT NOT NULL DEFAULT 50000,
    UNIQUE KEY uq_seat (venue_id, row_label, seat_no),
    CONSTRAINT fk_seat_venue FOREIGN KEY (venue_id) REFERENCES venues(id)
    );

-- 예매(예약) 헤더
CREATE TABLE IF NOT EXISTS reservations (
                                            id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                            user_id BIGINT NOT NULL,
                                            show_id BIGINT NOT NULL,
                                            status VARCHAR(20) NOT NULL, -- HOLD / CONFIRMED / CANCELLED
    total_price INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NULL,
    ticket_code VARCHAR(40) NULL,
    CONSTRAINT fk_resv_show FOREIGN KEY (show_id) REFERENCES shows(id),
    INDEX idx_resv_user (user_id),
    INDEX idx_resv_show (show_id)
    );

-- 예매 좌석 라인
CREATE TABLE IF NOT EXISTS reservation_seats (
                                                 id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                                 reservation_id BIGINT NOT NULL,
                                                 seat_id BIGINT NOT NULL,
                                                 price INT NOT NULL,
                                                 CONSTRAINT fk_rseat_resv FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    CONSTRAINT fk_rseat_seat FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE KEY uq_show_seat_once (reservation_id, seat_id)   -- 한 예약 내 좌석 중복 방지
    );

-- 좌석 잠금(임시예매) 충돌 방지용 (간단한 Lock)
CREATE TABLE IF NOT EXISTS seat_locks (
                                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                          show_id BIGINT NOT NULL,
                                          seat_id BIGINT NOT NULL,
                                          reservation_id BIGINT NOT NULL,
                                          locked_until DATETIME NOT NULL,
                                          UNIQUE KEY uq_lock (show_id, seat_id),
    INDEX idx_lock_until (locked_until),
    CONSTRAINT fk_lock_resv FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    CONSTRAINT fk_lock_show FOREIGN KEY (show_id) REFERENCES shows(id),
    CONSTRAINT fk_lock_seat FOREIGN KEY (seat_id) REFERENCES seats(id)
    );
