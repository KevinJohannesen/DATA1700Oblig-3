package com.example.data1700oblig3.controller;

import com.example.data1700oblig3.model.Booking;
import com.example.data1700oblig3.repository.BookingRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody @Valid Booking booking) {
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }


    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();  // Endret til findAll, som er en standard JPA-repository metode
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Integer id) {
        return bookingRepository.findById(id).orElse(null);  // Endret til findById med korrekt håndtering av Optional
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Integer id, @RequestBody Booking booking) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    existingBooking.setFilm(booking.getFilm());
                    existingBooking.setAntall(booking.getAntall());
                    existingBooking.setFornavn(booking.getFornavn());
                    existingBooking.setEtternavn(booking.getEtternavn());
                    existingBooking.setTelefon(booking.getTelefon());
                    existingBooking.setEpost(booking.getEpost());
                    return bookingRepository.save(existingBooking);
                }).orElseGet(() -> {
                    booking.setId(id);
                    return bookingRepository.save(booking);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Integer id) {
        bookingRepository.deleteById(id);  // Endret til deleteById, som er en standard JPA-repository metode
    }

    @DeleteMapping
    public void deleteAllBookings() {
        bookingRepository.deleteAll();  // Endret til deleteAll, som er en standard JPA-repository metode
    }
}
