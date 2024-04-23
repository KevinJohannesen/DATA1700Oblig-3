package com.example.data1700oblig3.repository;

import com.example.data1700oblig3.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}