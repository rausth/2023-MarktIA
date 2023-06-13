package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.entities.Evaluation;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

    @Query("SELECT e FROM Service s left join scheduling sch on sch.service.id=s.id left join evaluation e on e.scheduling.id=sch.id where s.id=:serviceId")
    List<Evaluation> EvaluationByServiceId(Long serviceId);

}
