package ufes.marktiabackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.repositories.AddressRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public Address getById(Long address_id) {
        Optional<Address> address = addressRepository.findById(address_id);

        if (address.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }

        return address.get();
    }

    public Address save(Address address) {
        return addressRepository.save(address);
    }

}
