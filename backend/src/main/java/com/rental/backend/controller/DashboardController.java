package com.rental.backend.controller;

import com.rental.backend.model.Booking;
import com.rental.backend.model.Property;
import com.rental.backend.model.User;
import com.rental.backend.repository.BookingRepository;
import com.rental.backend.repository.UserRepository;
import com.rental.backend.service.PropertyService;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Transactional
    @GetMapping
    public ResponseEntity<?> getDashboard(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        User user = userRepository.findById(userId).orElse(null);
        if (user == null)
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));

        if ("Owner".equals(user.getRole())) {
            List<Property> myProperties = propertyService.getPropertiesByOwner(user);
            return ResponseEntity.ok(Map.of(
                "role", user.getRole(),
                "name", user.getName(),
                "properties", myProperties
            ));
        } else {
            List<Booking> bookings = bookingRepository.findByTenant(user);
            List<Map<String, Object>> bookingData = bookings.stream().map(b -> Map.<String, Object>of(
                "id", b.getId(),
                "propertyTitle", b.getProperty().getTitle(),
                "propertyLocation", b.getProperty().getLocation(),
                "price", b.getProperty().getPrice(),
                "status", b.getStatus().name(),
                "createdAt", b.getCreatedAt().toString()
            )).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of(
                "role", user.getRole(),
                "name", user.getName(),
                "bookings", bookingData
            ));
        }
    }
}
