package ufes.marktiabackend.services;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.ServiceRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.ServiceType;
import ufes.marktiabackend.repositories.ServiceRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final UserService userService;
    private final AddressService addressService;
    private final ServiceRepository serviceRepository;
    private final FederationService federationService;

    public List<ServiceBasicResponseDTO> getAll(Boolean myServices, String name, String addressId, Integer type) {
        /**
         * [TODO]
         */
        return new LinkedList<>();
    }

    public ServiceResponseDTO getById(String serviceId) {
        Optional<ufes.marktiabackend.entities.Service> service = serviceRepository.findById(Long.valueOf(serviceId));

        return service.map(this::project).orElse(null);
    }

    private ServiceResponseDTO project(@Valid ufes.marktiabackend.entities.Service service) {
        return ServiceResponseDTO.builder()
                .id(service.getId().toString())
                .provider(UserResponseDTO.builder()
                        .id(service.getProvider().getId().toString())
                        .name(service.getProvider().getName())
                        .email(service.getProvider().getEmail())
                        .cpf(service.getProvider().getCpf())
                        .cnpj(service.getProvider().getCnpj())
                        .telephone(service.getProvider().getTelephone())
                        .address(AddressResponseDTO.builder()
                                .id(service.getProvider().getAddress().getId().toString())
                                .state(service.getProvider().getAddress().getFederation().getState())
                                .county(service.getProvider().getAddress().getFederation().getCounty())
                                .district(service.getProvider().getAddress().getDistrict())
                                .publicPlace(service.getProvider().getAddress().getPublicPlace())
                                .number(service.getProvider().getAddress().getNumber())
                                .complement(service.getProvider().getAddress().getComplement())
                                .build())
                        .userRole(service.getProvider().getUserRole().getValue())
                        .creationDate(service.getProvider().getCreationDate().toString())
                        .updateDate(service.getProvider().getUpdateDate().toString())
                        .build())
                .address(AddressResponseDTO.builder()
                        .id(service.getAddress().getId().toString())
                        .state(service.getProvider().getAddress().getFederation().getState())
                        .county(service.getProvider().getAddress().getFederation().getCounty())
                        .district(service.getAddress().getDistrict())
                        .publicPlace(service.getAddress().getPublicPlace())
                        .number(service.getAddress().getNumber())
                        .complement(service.getAddress().getComplement())
                        .build())
                .title(service.getTitle())
                .type(service.getType().getValue())
                .description(service.getDescription())
                .price(service.getPrice())
                .picpayUser(service.getPicpayUser())
                .build();
    }

    public ServiceResponseDTO create(@Valid ServiceRequestDTO serviceRequestDTO) {
        User provider = userService.getById(Long.valueOf(serviceRequestDTO.getProviderId()));
        Address address;

        if (serviceRequestDTO.getAddress() != null) {
            Federation federation = federationService.getByCounty(Long.valueOf(serviceRequestDTO.getAddress().getCountyId()));

            address = Address.builder()
                    .federation(federation)
                    .district(serviceRequestDTO.getAddress().getDistrict())
                    .publicPlace(serviceRequestDTO.getAddress().getPublicPlace())
                    .number(serviceRequestDTO.getAddress().getNumber())
                    .complement(serviceRequestDTO.getAddress().getComplement())
                    .build();
        } else {
            address = addressService.getById(provider.getAddress().getId());
        }

        ufes.marktiabackend.entities.Service service =
                ufes.marktiabackend.entities.Service.builder()
                        .provider(provider)
                        .address(address)
                        .title(serviceRequestDTO.getTitle())
                        .type(ServiceType.fromInteger(serviceRequestDTO.getType()))
                        .description(serviceRequestDTO.getDescription())
                        .price(serviceRequestDTO.getPrice())
                        .picpayUser(serviceRequestDTO.getPicpayUser())
                        .build();

        ufes.marktiabackend.entities.Service savedService = serviceRepository.save(service);

        return project(savedService);
    }
}
