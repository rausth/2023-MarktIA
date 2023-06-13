package ufes.marktiabackend.filters.servicesfilter;

import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.Federation;
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

        if (servicesFilter.stateId() != null) {
            if (root.get("address") != null) {
                Join<Service, Address> serviceAddressJoin = root.join("address");
                Join<Address, Federation> addressFederationJoin = serviceAddressJoin.join("federation");

                predicates.add(criteriaBuilder.equal(addressFederationJoin.get("uf"), Long.valueOf(servicesFilter.stateId())));
            } else {
                Join<Service, User> serviceUserJoin = root.join("provider");
                Join<User, Address> userAddressJoin = serviceUserJoin.join("address");
                Join<Address, Federation> addressFederationJoin = userAddressJoin.join("federation");

                predicates.add(criteriaBuilder.equal(addressFederationJoin.get("uf"), Long.valueOf(servicesFilter.stateId())));
            }
        }
        if (servicesFilter.regionId() != null) {
            if (root.get("address") != null) {
                Join<Service, Address> serviceAddressJoin = root.join("address");
                Join<Address, Federation> addressFederationJoin = serviceAddressJoin.join("federation");

                predicates.add(criteriaBuilder.equal(addressFederationJoin.get("microrregiaoGeografica"), Long.valueOf(servicesFilter.regionId())));
            } else {
                Join<Service, User> serviceUserJoin = root.join("provider");
                Join<User, Address> userAddressJoin = serviceUserJoin.join("address");
                Join<Address, Federation> addressFederationJoin = userAddressJoin.join("federation");

                predicates.add(criteriaBuilder.equal(addressFederationJoin.get("microrregiaoGeografica"), Long.valueOf(servicesFilter.regionId())));
            }
        }
        if (servicesFilter.countyId() != null) {
            if (root.get("address") != null) {
                Join<Service, Address> serviceAddressJoin = root.join("address");
                Join<Address, Federation> addressFederationJoin = serviceAddressJoin.join("federation");

                predicates.add(criteriaBuilder.equal(addressFederationJoin.get("codigoMunicipioCompleto"), Long.valueOf(servicesFilter.countyId())));
            } else {
                Join<Service, User> serviceUserJoin = root.join("provider");
                Join<User, Address> userAddressJoin = serviceUserJoin.join("address");
                Join<Address, Federation> addressFederationJoin = userAddressJoin.join("federation");

                predicates.add(criteriaBuilder.equal(addressFederationJoin.get("codigoMunicipioCompleto"), Long.valueOf(servicesFilter.countyId())));
            }
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[]{}));
    }
}
