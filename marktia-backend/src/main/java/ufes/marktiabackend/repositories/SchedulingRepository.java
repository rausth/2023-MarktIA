package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.entities.Scheduling;

@Repository
public interface SchedulingRepository extends JpaRepository<Scheduling, Long>, JpaSpecificationExecutor<Scheduling> {
}
