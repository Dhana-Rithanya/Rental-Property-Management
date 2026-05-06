package com.rental.backend.service;

import com.rental.backend.model.Property;
import com.rental.backend.model.User;
import com.rental.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public List<Property> getPropertiesByLocation(String location) {
        return propertyRepository.findByLocation(location);
    }

    public List<Property> getPropertiesByOwner(User owner) {
        return propertyRepository.findByOwner(owner);
    }

    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
