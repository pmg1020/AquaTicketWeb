package com.aquaticket.aquaticketback.booking.service;

import com.aquaticket.aquaticketback.booking.domain.Show;

import java.time.LocalDateTime;

public interface ShowCreationService {
    Show createShowFromKopis(String kopisId, LocalDateTime startAt);
}
