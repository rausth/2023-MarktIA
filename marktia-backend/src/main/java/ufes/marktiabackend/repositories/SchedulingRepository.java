package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.SchedulingStatus;

import java.util.List;

@Repository
public interface SchedulingRepository extends JpaRepository<Scheduling, Long>, JpaSpecificationExecutor<Scheduling> {

    List<Scheduling> findAllByProviderAndStatusIsNot(User provider, SchedulingStatus status);

}
