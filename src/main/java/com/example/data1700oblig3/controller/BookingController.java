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
    //Autowired er en anotation som injecter  avhengighetene automatisk, dette fjerner behovet for setter-metode og konstruktør
    @Autowired
    BookingRepository rep;
//vi har en post mapping som lagrer en booking i databasen, med $.ajax type: "POST" i javascript.
    @PostMapping("/lagre")
    public void Lagre(Booking booking) {
        rep.lagreBookinger(booking);
    }
//vi har en get mapping som henter alle bookinger fra databasen, med $.ajax type: "GET" i javascript.
    @GetMapping("/hentalle")
    public List<Booking> hentalle() {
        return rep.hentAlleBookinger();
    }
//vi har en get mapping som henter en booking fra databasen, med $.ajax type: "GET" i javascript.
    @GetMapping("/hentEnBooking")
    public Booking hentEnBooking(Integer id){
        return rep.hentEnBooking(id);
    }
    //Vi har en @RequestBody anotation som forteller spring boot at parameteren kommer fra request body.
    @PostMapping("/endreEnBooking")
    public void endreEnBooking(@RequestBody Booking booking){
        rep.endreEnBooking(booking);
    }
    //her får vi en slett en id fra brukeren og sletter den, med $.ajax type: "DELETE" i javascript.
    @DeleteMapping("/slettEn")
    public void slettEn(@RequestParam Integer id){
        rep.slettEn(id);
    }
//vi har en delete mapping som sletter alle bookinger fra databasen, med $.ajax type: "DELETE" i javascript.
    @DeleteMapping("/slettalle")
    public void slettalle(){
        rep.slettAlleBookinger();
    }

}