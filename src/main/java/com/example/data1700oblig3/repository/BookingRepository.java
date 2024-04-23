package com.example.data1700oblig3.repository;

import com.example.data1700oblig3.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void lagreBookinger(Booking booking) {
        String sql = "INSERT INTO bookings (film, antall, fornavn, etternavn, telefon, epost) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, booking.getFilm(), booking.getAntall(), booking.getFornavn(),
                booking.getEtternavn(), booking.getTelefon(), booking.getEpost());
    }

    public List<Booking> hentAlleBookinger() {
        String sql = "SELECT * FROM bookings ORDER BY etternavn";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Booking.class));
    }

    public Booking hentEnBooking(Integer id) {
        String sql = "SELECT * FROM bookings WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Booking.class), id);
    }

    public void endreEnBooking(Booking booking) {
        String sql = "UPDATE bookings SET film = ?, antall = ?, fornavn = ?, etternavn = ?, telefon = ?, epost = ? WHERE id = ?";
        jdbcTemplate.update(sql, booking.getFilm(), booking.getAntall(), booking.getFornavn(),
                booking.getEtternavn(), booking.getTelefon(), booking.getEpost(), booking.getId());
    }

    public void slettEn(Integer id) {
        String sql = "DELETE FROM bookings WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void slettAlleBookinger() {
        String sql = "DELETE FROM bookings";
        jdbcTemplate.update(sql);
    }
}
