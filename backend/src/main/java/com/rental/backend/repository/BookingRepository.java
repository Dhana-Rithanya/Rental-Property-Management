package com.rental.backend.repository;

import com.rental.backend.model.Booking;
import com.rental.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b JOIN FETCH b.property JOIN FETCH b.tenant WHERE b.tenant = :tenant")
    List<Booking> findByTenant(@Param("tenant") User tenant);

    boolean existsByTenantIdAndPropertyId(Long tenantId, Long propertyId);

    @Query("SELECT b FROM Booking b JOIN FETCH b.property p JOIN FETCH b.tenant WHERE p.owner.id = :ownerId")
    List<Booking> findByPropertyOwnerId(@Param("ownerId") Long ownerId);
}
