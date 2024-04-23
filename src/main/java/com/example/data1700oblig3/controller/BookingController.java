package com.example.data1700oblig3.controller;

import com.example.data1700oblig3.model.Booking;
import com.example.data1700oblig3.repository.BookingRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class BookingController {
//forklar litt hva dette er
    //Autowired er en anotation som injecter  avhengighetene automatisk, dette fjerner behovet for setter-metode og konstruktør
    @Autowired
    BookingRepository rep;

    @PostMapping("/lagre")
    public void Lagre(Booking booking) {
        rep.lagreBookinger(booking);
    }

    @GetMapping("/hentalle")
    public List<Booking> hentalle() {
        return rep.hentAlleBookinger();
    }

    @GetMapping("/hentEnBooking")
    public Booking hentEnBooking(Integer id){
        return rep.hentEnBooking(id);
    }

    @PostMapping("/endreEnBooking")
    public void endreEnBooking(Booking booking){
        rep.endreEnBooking(booking);
    }

    //her får vi en slett en id fra brukeren og sletter den, med $.ajax type: "DELETE" i javascript.
    @DeleteMapping("/slettEn")
    public void slettEn(@RequestParam Integer id){
        rep.slettEn(id);
    }

    @DeleteMapping("/slettalle")
    public void slettalle(){
        rep.slettAlleBookinger();
    }

}