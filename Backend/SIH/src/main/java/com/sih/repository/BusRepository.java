package com.sih.repository;

import com.sih.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BusRepository extends JpaRepository<Bus, String> {
    List<Bus> findByFromLocationAndToLocation(String from, String to);

}