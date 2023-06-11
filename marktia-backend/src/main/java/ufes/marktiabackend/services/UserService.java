package ufes.marktiabackend.services;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.UserRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.UserResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.repositories.AddressRepository;
import ufes.marktiabackend.repositories.UserRepository;
import ufes.marktiabackend.services.exception.NonExistentAddressException;
import ufes.marktiabackend.services.exception.NullAddressIdException;

import java.util.Optional;

@Service
public class UserService {

    AddressRepository addressRepository;
    UserRepository userRepository;

    public UserService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    public UserResponseDTO verifyAndSave(@Valid User user) {
        Long id = user.getAddress().getId();
        if (id == null) throw new NullAddressIdException();

        Optional<Address> address = addressRepository.findById(id);

        if (address.isEmpty()) throw new NonExistentAddressException();

        User savedUser = userRepository.save(user);

        return project(savedUser);
    }

    public UserResponseDTO project(@Valid User user) {
        return UserResponseDTO.builder()
                .id(user.getId().toString())
                .name(user.getName())
                .email(user.getEmail())
                .cpf(user.getCpf())
                .cnpj(user.getCnpj())
                .telephone(user.getTelephone())
                .address(AddressResponseDTO.builder()
                        .id(user.getAddress().getId().toString())
                        .state(user.getAddress().getState())
                        .county(user.getAddress().getCounty())
                        .district(user.getAddress().getDistrict())
                        .publicPlace(user.getAddress().getPublic_place())
                        .number(user.getAddress().getNumber())
                        .complement(user.getAddress().getComplement())
                        .build())
                .userRole(user.getUserRole().getValue())
                .creationDate(user.getCreationDate().toString())
                .updateDate(user.getUpdateDate().toString())
                .build();
    }

    public UserResponseDTO update(String userId, UserRequestDTO userRequestDTO) {
        /**
         * [TODO
         */
        return null;
    }
}
