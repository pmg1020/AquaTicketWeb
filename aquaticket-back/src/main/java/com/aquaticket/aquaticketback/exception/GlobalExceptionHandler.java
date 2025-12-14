package com.aquaticket.aquaticketback.exception;

import com.aquaticket.aquaticketback.booking.exception.BookingNotFoundException;
import com.aquaticket.aquaticketback.booking.exception.InvalidShowDataException;
import com.aquaticket.aquaticketback.booking.exception.SeatAlreadyBookedException;
import com.aquaticket.aquaticketback.booking.exception.SeatNotFoundException;
import com.aquaticket.aquaticketback.booking.exception.ShowtimeNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(SeatNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public Map<String, String> handleSeatNotFoundException(SeatNotFoundException ex) {
        log.warn("Handling SeatNotFoundException: {}. Responding with 404.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(ShowtimeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public Map<String, String> handleShowtimeNotFoundException(ShowtimeNotFoundException ex) {
        log.warn("Handling ShowtimeNotFoundException: {}. Responding with 404.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(SeatAlreadyBookedException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    public Map<String, String> handleSeatAlreadyBookedException(SeatAlreadyBookedException ex) {
        log.warn("Handling SeatAlreadyBookedException: {}. Responding with 409.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(InvalidShowDataException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Map<String, String> handleInvalidShowDataException(InvalidShowDataException ex) {
        log.error("Handling InvalidShowDataException: {}. Responding with 500.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public Map<String, String> handleUserNotFoundException(UserNotFoundException ex) {
        log.warn("Handling UserNotFoundException: {}. Responding with 401.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(BookingNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public Map<String, String> handleBookingNotFoundException(BookingNotFoundException ex) {
        log.warn("Handling BookingNotFoundException: {}. Responding with 404.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ResponseBody
    public Map<String, String> handleAccessDeniedException(AccessDeniedException ex) {
        log.warn("Handling AccessDeniedException: {}. Responding with 403.", ex.getMessage());
        return Map.of("message", ex.getMessage());
    }
}

