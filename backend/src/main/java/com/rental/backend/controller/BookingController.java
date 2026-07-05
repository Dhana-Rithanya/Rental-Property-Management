package com.rental.backend.controller;

import com.rental.backend.model.Booking;
import com.rental.backend.model.BookingStatus;
import com.rental.backend.model.Property;
import com.rental.backend.model.User;
import com.rental.backend.repository.BookingRepository;
import com.rental.backend.repository.PropertyRepository;
import com.rental.backend.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @PostMapping("/{propertyId}")
    public ResponseEntity<?> requestRent(@PathVariable Long propertyId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null)
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));

        User user = userRepository.findById(userId).orElse(null);
        if (user == null)
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));

        if ("Owner".equals(user.getRole()))
            return ResponseEntity.badRequest().body(Map.of("error", "Owners cannot request to rent"));

        Property property = propertyRepository.findById(propertyId).orElse(null);
        if (property == null)
            return ResponseEntity.status(404).body(Map.of("error", "Property not found"));

        if (bookingRepository.existsByTenantIdAndPropertyId(userId, propertyId))
            return ResponseEntity.badRequest().body(Map.of("error", "You already requested this property"));

        Booking booking = new Booking();
        booking.setTenant(user);
        booking.setProperty(property);
        booking.setStatus(BookingStatus.PENDING);
        booking.setAuditLog("Requested by tenant " + user.getEmail() + " at " + LocalDateTime.now());
        bookingRepository.save(booking);

        return ResponseEntity.ok(Map.of("message", "Rent request submitted successfully"));
    }

    @Transactional
    @GetMapping("/requests")
    public ResponseEntity<?> getOwnerRequests(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null)
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));

        User owner = userRepository.findById(userId).orElse(null);
        if (owner == null)
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));

        if (!"Owner".equals(owner.getRole()))
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));

        List<Booking> bookings = bookingRepository.findByPropertyOwnerId(userId);
        List<Map<String, Object>> result = bookings.stream().map(b -> Map.<String, Object>of(
            "id", b.getId(),
            "propertyTitle", b.getProperty().getTitle(),
            "propertyLocation", b.getProperty().getLocation(),
            "price", b.getProperty().getPrice(),
            "tenantName", b.getTenant().getName(),
            "tenantEmail", b.getTenant().getEmail(),
            "status", b.getStatus().name(),
            "createdAt", b.getCreatedAt().toString()
        )).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @Transactional
    @PostMapping("/{bookingId}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long bookingId,
                                          @RequestBody Map<String, String> body,
                                          HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null)
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));

        User owner = userRepository.findById(userId).orElse(null);
        if (owner == null)
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));

        if (!"Owner".equals(owner.getRole()))
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));

        Booking booking = bookingRepository.findByIdWithDetails(bookingId).orElse(null);
        if (booking == null)
            return ResponseEntity.status(404).body(Map.of("error", "Booking not found"));

        if (!booking.getProperty().getOwner().getId().equals(userId))
            return ResponseEntity.status(403).body(Map.of("error", "You are not the owner of this property"));

        BookingStatus newStatus;
        try {
            newStatus = BookingStatus.valueOf(body.get("status").toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid status value"));
        }

        String prevStatus = booking.getStatus().name();
        booking.setStatus(newStatus);
        booking.setUpdatedAt(LocalDateTime.now());
        booking.setAuditLog(booking.getAuditLog() + " | Status changed from " + prevStatus
                + " to " + newStatus + " by owner " + owner.getEmail() + " at " + LocalDateTime.now());
        bookingRepository.save(booking);

        // If approved, mark property as RENTED
        if (newStatus == BookingStatus.APPROVED) {
            Property property = booking.getProperty();
            property.setStatus("RENTED");
            propertyRepository.save(property);
        }

        // If rejected, mark property back to AVAILABLE
        if (newStatus == BookingStatus.REJECTED) {
            Property property = booking.getProperty();
            property.setStatus("AVAILABLE");
            propertyRepository.save(property);
        }

        return ResponseEntity.ok(Map.of("message", "Status updated to " + newStatus));
    }
}
