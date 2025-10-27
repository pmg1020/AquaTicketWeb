package com.aquaticket.aquaticketback.booking.dto;

import java.time.LocalDateTime;

public class EnsureShowtimeDtos {

    // 요청: KOPIS 공연 ID + 회차 시작시간(로컬)
    public static class Request {
        public String kopisId;
        public LocalDateTime startAt;
    }

    // 응답: 내부 showtimeId
    public static class Response {
        public Long showtimeId;
        public Response(Long id) { this.showtimeId = id; }
    }
}
