package com.aquaticket.aquaticketback.booking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class InvalidShowDataException extends RuntimeException {
    public InvalidShowDataException(String message) {
        super(message);
    }
}
