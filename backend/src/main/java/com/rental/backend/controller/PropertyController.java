package com.rental.backend.controller;

import com.rental.backend.model.Property;
import com.rental.backend.model.User;
import com.rental.backend.repository.UserRepository;
import com.rental.backend.service.PropertyService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Property>> getAll(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double maxPrice) {
        List<Property> properties = location != null && !location.isEmpty()
                ? propertyService.getPropertiesByLocation(location)
                : propertyService.getAllProperties();

        if (maxPrice != null)
            properties = properties.stream().filter(p -> p.getPrice() <= maxPrice).toList();

        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return propertyService.getPropertyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addProperty(@RequestBody Property property, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        User owner = userRepository.findById(userId).orElse(null);
        if (owner == null)
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));

        if (!"Owner".equals(owner.getRole()))
            return ResponseEntity.status(403).body(Map.of("error", "Only owners can add properties"));

        property.setOwner(owner);
        return ResponseEntity.ok(propertyService.addProperty(property));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable Long id, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        Property property = propertyService.getPropertyById(id).orElse(null);
        if (property == null)
            return ResponseEntity.status(404).body(Map.of("error", "Property not found"));

        // Authorization: only the owner of this property can delete it
        if (!property.getOwner().getId().equals(userId))
            return ResponseEntity.status(403).body(Map.of("error", "You are not the owner of this property"));

        propertyService.deleteProperty(id);
        return ResponseEntity.ok(Map.of("message", "Property deleted"));
    }
}
