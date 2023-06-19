package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.UserRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.UserRole;
import ufes.marktiabackend.repositories.AddressRepository;
import ufes.marktiabackend.repositories.FederationRepository;
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
    private final FederationRepository federationRepository;

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

    public UserResponseDTO update(String userId, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(Long.valueOf(userId))
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        Federation federation = federationRepository.findByCodigoMunicipioCompleto(Long.valueOf(userRequestDTO.getAddress().getCountyId()))
                .orElseThrow(() -> new EntityNotFoundException("Federação não encontrada."));

        Address address = user.getAddress();

        address.setFederation(federation);
        address.setDistrict(userRequestDTO.getAddress().getDistrict());
        address.setPublicPlace(userRequestDTO.getAddress().getPublicPlace());
        address.setNumber(userRequestDTO.getAddress().getNumber());
        address.setComplement(userRequestDTO.getAddress().getComplement());

        user.setImageUrl(userRequestDTO.getImageURL());

        user.setUserRole(UserRole.fromInteger(userRequestDTO.getUserRole()));
        user.setName(userRequestDTO.getName());
        user.setEmail(userRequestDTO.getEmail());
        user.setTelephone(userRequestDTO.getTelephone());
        user.setCpf(userRequestDTO.getCpf());
        user.setCnpj(userRequestDTO.getCnpj());

        user.setAddress(address);

        userRepository.save(user);

        return project(user);
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
}
