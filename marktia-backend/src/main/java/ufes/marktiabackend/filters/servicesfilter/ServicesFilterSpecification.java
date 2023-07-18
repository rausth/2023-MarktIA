package ufes.marktiabackend.filters.servicesfilter;

import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.Service;
import ufes.marktiabackend.entities.User;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class ServicesFilterSpecification implements Specification<Service> {
    private final ServicesFilter servicesFilter;

    @Override
    public Predicate toPredicate(Root<Service> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();

        if (servicesFilter.providerId() != null) {
            Join<Service, User> serviceUserJoin = root.join("provider");

            predicates.add(criteriaBuilder.equal(serviceUserJoin.get("id"), Long.valueOf(servicesFilter.providerId())));
        }
        if (servicesFilter.name() != null) {
            predicates.add(criteriaBuilder.like(root.get("title"), "%" + servicesFilter.name() + "%"));
        }
        if (servicesFilter.type() != null) {
            predicates.add(criteriaBuilder.equal(root.get("type"), servicesFilter.type()));
        }

        if (servicesFilter.state() != null) {
            if (root.get("address") != null) {
                Join<Service, Address> serviceAddressJoin = root.join("address");

                predicates.add(criteriaBuilder.equal(serviceAddressJoin.get("state"), servicesFilter.state()));
            } else {
                Join<Service, User> serviceUserJoin = root.join("provider");
                Join<User, Address> userAddressJoin = serviceUserJoin.join("address");

                predicates.add(criteriaBuilder.equal(userAddressJoin.get("state"), servicesFilter.state()));
            }
        }
        if (servicesFilter.city() != null) {
            if (root.get("address") != null) {
                Join<Service, Address> serviceAddressJoin = root.join("address");

                predicates.add(criteriaBuilder.equal(serviceAddressJoin.get("city"), servicesFilter.city()));
            } else {
                Join<Service, User> serviceUserJoin = root.join("provider");
                Join<User, Address> userAddressJoin = serviceUserJoin.join("address");

                predicates.add(criteriaBuilder.equal(userAddressJoin.get("city"), servicesFilter.city()));
            }
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
    }
}
