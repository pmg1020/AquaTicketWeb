package com.aquaticket.aquaticketback.booking.service;

import com.aquaticket.aquaticketback.booking.domain.*;
import com.aquaticket.aquaticketback.booking.dto.BookingHistoryDto;
import com.aquaticket.aquaticketback.booking.dto.ConfirmRequestDto;
import com.aquaticket.aquaticketback.booking.dto.SeatAvailabilityDto;
import com.aquaticket.aquaticketback.booking.dto.SeatStatus;
import com.aquaticket.aquaticketback.booking.exception.InvalidShowDataException;
import com.aquaticket.aquaticketback.booking.exception.SeatAlreadyBookedException;
import com.aquaticket.aquaticketback.booking.exception.SeatNotFoundException;
import com.aquaticket.aquaticketback.booking.exception.ShowtimeNotFoundException;
import com.aquaticket.aquaticketback.booking.repository.*;
import com.aquaticket.aquaticketback.domain.User;
import com.aquaticket.aquaticketback.exception.UserNotFoundException;
import com.aquaticket.aquaticketback.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingService {
    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShowtimeRepository showtimeRepository;
    private final ShowRepository showRepository;
    private final ShowCreationService showCreationService;
    private final SeatRepository seatRepository;
    private final ReservationSeatRepository reservationSeatRepository;
    private final SeatLockRepository seatLockRepository;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository,
                          ShowtimeRepository showtimeRepository, ShowRepository showRepository,
                          ShowCreationService showCreationService, SeatRepository seatRepository,
                          ReservationSeatRepository reservationSeatRepository, SeatLockRepository seatLockRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.showtimeRepository = showtimeRepository;
        this.showRepository = showRepository;
        this.showCreationService = showCreationService;
        this.seatRepository = seatRepository;
        this.reservationSeatRepository = reservationSeatRepository;
        this.seatLockRepository = seatLockRepository;
    }

    @Transactional
    public Long confirmBooking(ConfirmRequestDto request) {
        log.info("Attempting to confirm booking with request: {}", request);
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            log.info("1. Authenticated user email: {}", email);
            User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
            log.info("2. User found: {}", user.getId());

            Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                    .orElseThrow(() -> new ShowtimeNotFoundException("Invalid showtime ID: " + request.getShowtimeId()));
            log.info("3. Showtime found: {}. Associated Show ID: {}", showtime.getId(), showtime.getShow() != null ? showtime.getShow().getId() : "null");

            if (showtime.getShow() == null) {
                throw new InvalidShowDataException("Showtime with ID " + showtime.getId() + " has no associated Show.");
            }

            List<Seat> seats = seatRepository.findAllById(request.getSeatIds());
            log.info("4. Requested {} seats, found {} seats.", request.getSeatIds().size(), seats.size());
            if (seats.size() != request.getSeatIds().size()) {
                throw new SeatNotFoundException("One or more seats not found.");
            }

            log.info("5. Checking for already booked seats.");
            Set<Long> alreadyBooked = reservationSeatRepository.findSeatIdsByShowtime(showtime.getId());
            for (Seat seat : seats) {
                if (alreadyBooked.contains(seat.getId())) {
                    throw new SeatAlreadyBookedException("Seat " + seat.getId() + " is already booked.");
                }
            }
            log.info("6. All seats are available.");

            double totalPrice = seats.stream().mapToDouble(Seat::getPrice).sum();
            log.info("7. Calculated total price: {}", totalPrice);

            Reservation newReservation = new Reservation();
            newReservation.setUser(user);
            newReservation.setShow(showtime.getShow());
            newReservation.setShowtime(showtime);
            newReservation.setTotalPrice((int) totalPrice);
            newReservation.setStatus("CONFIRMED");
            newReservation.setBookingNumber(UUID.randomUUID().toString());
            newReservation.setConfirmedAt(LocalDateTime.now());
            log.info("8. Reservation object created: {}", newReservation);

            Reservation savedReservation = bookingRepository.save(newReservation);
            log.info("9. Reservation saved with ID: {}", savedReservation.getId());

            List<ReservationSeat> reservationSeats = seats.stream().map(seat -> {
                ReservationSeat rs = new ReservationSeat();
                rs.setReservation(savedReservation);
                rs.setSeat(seat);
                return rs;
            }).collect(Collectors.toList());

            reservationSeatRepository.saveAll(reservationSeats);
            log.info("10. Reservation seats saved.");

            return savedReservation.getId();
        } catch (Exception e) {
            log.error("!!! CRITICAL: Exception during booking confirmation: ", e);
            throw e; // Re-throw the exception to let the controller advice handle it
        }
    }
    @Transactional(readOnly = true)
    public List<BookingHistoryDto> getMyBookings() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        return bookingRepository.findByUser(user).stream()
                .map(reservation -> new BookingHistoryDto(
                        reservation.getId(),
                        reservation.getShow().getPerformance().getTitle(),
                        reservation.getShow().getPerformance().getPosterUrl(),
                        reservation.getShowtime().getStartAt().toString(),
                        reservation.getConfirmedAt().toString(),
                        reservation.getBookingNumber(),
                        reservation.getTotalPrice(),
                        reservation.getStatus()))
                .collect(Collectors.toList());
    }

    @Transactional
    public Long ensureShowtime(String kopisId, String startAt) {
        LocalDateTime parsedStartAt = LocalDateTime.parse(startAt);
        Optional<Showtime> existingShowtime = showtimeRepository.findFirstByKopisIdAndStartAt(kopisId, parsedStartAt);

        if (existingShowtime.isPresent()) {
            return existingShowtime.get().getId();
        } else {
            Show show = showRepository.findByKopisId(kopisId)
                    .orElseGet(() -> showCreationService.createShowFromKopis(kopisId, parsedStartAt));

            Showtime newShowtime = new Showtime();
            newShowtime.setKopisId(kopisId);
            newShowtime.setStartAt(parsedStartAt);
            newShowtime.setShow(show);

            Showtime savedShowtime = showtimeRepository.save(newShowtime);
            return savedShowtime.getId();
        }
    }

    @Transactional(readOnly = true)
    public List<SeatAvailabilityDto> getSeatAvailability(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ShowtimeNotFoundException("Invalid showtime ID: " + showtimeId));

        if (showtime.getShow() == null || showtime.getShow().getPerformance() == null || showtime.getShow().getPerformance().getVenue() == null) {
            throw new InvalidShowDataException("Showtime with ID " + showtime.getId() + " has incomplete data.");
        }

        Venue venue = showtime.getShow().getPerformance().getVenue();
        List<Seat> allSeatsInVenue = seatRepository.findByVenue(venue);

        Set<Long> bookedSeatIds = reservationSeatRepository.findSeatIdsByShowtime(showtime.getId());
        Map<Long, SeatLock> lockedSeatsMap = seatLockRepository.findByShowAndLockedUntilAfter(showtime.getShow(), LocalDateTime.now())
                .stream().collect(Collectors.toMap(lock -> lock.getSeat().getId(), lock -> lock));

        return allSeatsInVenue.stream().map(seat -> {
            SeatStatus status;
            if (bookedSeatIds.contains(seat.getId())) {
                status = SeatStatus.TAKEN;
            } else if (lockedSeatsMap.containsKey(seat.getId())) {
                status = SeatStatus.LOCKED;
            } else {
                status = SeatStatus.AVAILABLE;
            }

            return SeatAvailabilityDto.builder()
                    .seatId(seat.getId())
                    .zone(seat.getZone())
                    .row(seat.getRowLabel())
                    .number(String.valueOf(seat.getSeatNo()))
                    .price(seat.getPrice())
                    .status(status)
                    .build();
        }).collect(Collectors.toList());
    }
}