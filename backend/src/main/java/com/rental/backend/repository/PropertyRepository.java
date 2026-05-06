package com.rental.backend.repository;

import com.rental.backend.model.Property;
import com.rental.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByLocation(String location);
    List<Property> findByPriceLessThanEqual(Double price);
    List<Property> findByOwner(User owner);
}
