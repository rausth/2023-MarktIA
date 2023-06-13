package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.UserRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.repositories.AddressRepository;
import ufes.marktiabackend.repositories.UserRepository;
import ufes.marktiabackend.exceptionhandler.custom.NonExistentAddressException;
import ufes.marktiabackend.exceptionhandler.custom.NullAddressIdException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AddressService addressService;

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public Optional<User> userById(String userId) {
        return userRepository.findById(Long.valueOf(userId));
    }
    public UserResponseDTO responseDTOById(String userId) {
        Optional<User> user = userRepository.findById(Long.valueOf(userId));

        return user.map(this::project).orElse(null);
    }

    public UserResponseDTO verifyAndSave(@Valid User user) {
        Long id = user.getAddress().getId();
        if (id == null) throw new NullAddressIdException();

        Optional<Address> address = addressRepository.findById(id);

        if (address.isEmpty()) throw new NonExistentAddressException();

        User savedUser = userRepository.save(user);

        return project(savedUser);
    }

    public AddressResponseDTO getAddress(String userId) {
        User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        return addressService.project(user.getAddress());
    }

    public UserResponseDTO project(@Valid User user) {
        return UserResponseDTO.builder()
                .id(user.getId().toString())
                .name(user.getName())
                .email(user.getEmail())
                .cpf(user.getCpf())
                .cnpj(user.getCnpj())
                .telephone(user.getTelephone())
                .address(addressService.project(user.getAddress()))
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
