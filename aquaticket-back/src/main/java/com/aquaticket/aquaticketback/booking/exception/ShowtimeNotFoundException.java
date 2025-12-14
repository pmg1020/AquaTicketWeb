package com.aquaticket.aquaticketback.booking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ShowtimeNotFoundException extends RuntimeException {
    public ShowtimeNotFoundException(String message) {
        super(message);
    }
}
