package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.entities.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
}
