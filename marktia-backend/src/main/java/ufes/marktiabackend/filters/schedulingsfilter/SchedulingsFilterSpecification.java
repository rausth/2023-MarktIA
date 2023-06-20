package ufes.marktiabackend.filters.schedulingsfilter;

import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.entities.Service;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.SchedulingStatus;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class SchedulingsFilterSpecification implements Specification<Scheduling> {
    private final SchedulingsFilter schedulingsFilter;

    @Override
    public Predicate toPredicate(Root<Scheduling> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (schedulingsFilter.asConsumer()) {
            Join<Scheduling, User> schedulingConsumerJoin = root.join("consumer");

            predicates.add(criteriaBuilder.equal(schedulingConsumerJoin.get("id"), Long.valueOf(schedulingsFilter.userId())));
        } else {
            Join<Scheduling, User> schedulingProviderJoin = root.join("provider");

            predicates.add(criteriaBuilder.equal(schedulingProviderJoin.get("id"), Long.valueOf(schedulingsFilter.userId())));
        }

        predicates.add(criteriaBuilder.equal(root.get("status"), schedulingsFilter.schedulingStatus()));

        return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
    }
}
