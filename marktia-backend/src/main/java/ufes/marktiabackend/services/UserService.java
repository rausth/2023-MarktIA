package ufes.marktiabackend.services;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.UserDTO;
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

    public UserDTO verifyAndSave(@Valid User user) {
        Long id = user.getAddress().getId();
        if (id == null) throw new NullAddressIdException();

        Optional<Address> address = addressRepository.findById(id);

        if (address.isEmpty()) throw new NonExistentAddressException();

        User savedUser = userRepository.save(user);

        return project(savedUser);
    }

    public UserDTO project(@Valid User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getCpf(),
                user.getCnpj(),
                user.getTelephone(),
                user.getAddress(),
                user.getUserRole(),
                user.getCreationDate(),
                user.getUpdateDate());
    }

}
