package ufes.marktiabackend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
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

    public AddressResponseDTO project(Address address) {
        return AddressResponseDTO.builder()
                .id(address.getId().toString())
                .state(FederationFieldResponseDTO.builder()
                        .id(address.getFederation().getUf().toString())
                        .name(address.getFederation().getState())
                        .build())
                .region(FederationFieldResponseDTO.builder()
                        .id(address.getFederation().getMicrorregiaoGeografica().toString())
                        .name(address.getFederation().getNomeMicrorregiao())
                        .build())
                .county(FederationFieldResponseDTO.builder()
                        .id(address.getFederation().getCodigoMunicipioCompleto().toString())
                        .name(address.getFederation().getCounty())
                        .build())
                .district(address.getDistrict())
                .publicPlace(address.getPublicPlace())
                .number(address.getNumber())
                .complement(address.getComplement())
                .build();
    }
}
