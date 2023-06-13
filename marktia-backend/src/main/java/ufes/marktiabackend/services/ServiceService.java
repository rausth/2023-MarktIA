package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.ServiceRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserBasicResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.ServiceType;
import ufes.marktiabackend.filters.servicesfilter.ServicesFilter;
import ufes.marktiabackend.filters.servicesfilter.ServicesFilterSpecification;
import ufes.marktiabackend.repositories.ServiceRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final UserService userService;
    private final AddressService addressService;
    private final SchedulingService schedulingService;

    private final ServiceRepository serviceRepository;
    private final FederationService federationService;

    public List<ServiceBasicResponseDTO> getAll(String providerId, String name, Integer type,
                                                String stateId, String regionId, String countyId) {

        ServicesFilter servicesFilter = ServicesFilter.builder()
                .providerId(!providerId.isBlank() ? providerId : null)
                .name(!name.isBlank() ? name : null)
                .type(type)
                .stateId(!stateId.isBlank() ? stateId : null)
                .regionId(!regionId.isBlank() ? regionId : null)
                .countyId(!countyId.isBlank() ? countyId : null)
                .build();

        List<ufes.marktiabackend.entities.Service> services = serviceRepository.findAll(new ServicesFilterSpecification(servicesFilter));

        return services.stream()
                .map(service -> ServiceBasicResponseDTO.builder()
                        .id(service.getId().toString())
                        .title(service.getTitle())
                        .provider(UserBasicResponseDTO.builder()
                                .id(service.getProvider().getId().toString())
                                .name(service.getProvider().getName())
                                .imageURL(service.getProvider().getImageUrl())
                                .build())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public Optional<ufes.marktiabackend.entities.Service> serviceById(String serviceId) {
        return serviceRepository.findById(Long.valueOf(serviceId));
    }

    public ServiceResponseDTO responseDTOById(String serviceId) {
        Optional<ufes.marktiabackend.entities.Service> service = serviceRepository.findById(Long.valueOf(serviceId));

        return service.map(this::project).orElse(null);
    }

    public ServiceResponseDTO create(@Valid ServiceRequestDTO serviceRequestDTO) {
        Optional<User> optUser = userService.userById(serviceRequestDTO.getProviderId());

        if (optUser.isEmpty()) {
            throw new EntityNotFoundException("Usuário não encontrado.");
        }
        User provider = optUser.get();

        Address address = provider.getAddress();
        if (serviceRequestDTO.getAddress() != null) {
            Federation federation = federationService.getByCounty(Long.valueOf(serviceRequestDTO.getAddress().getCountyId()));

            address = Address.builder()
                    .federation(federation)
                    .district(serviceRequestDTO.getAddress().getDistrict())
                    .publicPlace(serviceRequestDTO.getAddress().getPublicPlace())
                    .number(serviceRequestDTO.getAddress().getNumber())
                    .complement(serviceRequestDTO.getAddress().getComplement())
                    .build();
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

    public ServiceResponseDTO project(@Valid ufes.marktiabackend.entities.Service service) {
        AddressResponseDTO addressResponseDTO = null;
        if (service.getAddress() != null) {
            addressResponseDTO = addressService.project(service.getAddress());
        }

        return ServiceResponseDTO.builder()
                .id(service.getId().toString())
                .provider(userService.project(service.getProvider()))
                .address(addressResponseDTO)
                .title(service.getTitle())
                .type(service.getType().getValue())
                .description(service.getDescription())
                .price(service.getPrice())
                .picpayUser(service.getPicpayUser())
                .schedulings(service.getSchedulings()
                        .stream()
                        .map(scheduling -> schedulingService.project(scheduling))
                        .collect(Collectors.toList())
                )
                .build();
    }
}
