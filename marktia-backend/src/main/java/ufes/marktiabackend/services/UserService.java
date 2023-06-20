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
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.SchedulingStatus;
import ufes.marktiabackend.enums.UserRole;
import ufes.marktiabackend.exceptionhandler.custom.ServiceWithSchedulingExecption;
import ufes.marktiabackend.repositories.FederationRepository;
import ufes.marktiabackend.repositories.SchedulingRepository;
import ufes.marktiabackend.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AddressService addressService;

    private final UserRepository userRepository;
    private final FederationRepository federationRepository;
    private final SchedulingRepository schedulingRepository;

    public Optional<User> userById(String userId) {
        return userRepository.findById(Long.valueOf(userId));
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

    public void deleteById(String userId) {
        checkUserForOpenSchedulings(userId);
        userRepository.deleteById(Long.valueOf(userId));
    }

    private void checkUserForOpenSchedulings(String userId) {
        Optional<User> user = userById(userId);

        if (user.isEmpty()) {
            throw new EntityNotFoundException("Usuário não encontrado.");
        }

        List<Scheduling> schedulings = schedulingRepository.findAllByProviderAndStatusIsNot(user.get(), SchedulingStatus.FINISHED);

        if (!schedulings.isEmpty()) {
            throw new ServiceWithSchedulingExecption("Provedor tem serviços com agendamentos não finalizados.");
        }
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
                .imageURL(user.getImageUrl())
                .build();
    }
}
