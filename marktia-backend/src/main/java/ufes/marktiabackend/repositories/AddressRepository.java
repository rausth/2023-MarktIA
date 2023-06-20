package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
