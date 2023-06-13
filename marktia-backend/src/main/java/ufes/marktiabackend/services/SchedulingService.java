package ufes.marktiabackend.services;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.SchedulingRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.SchedulingStatus;
import ufes.marktiabackend.repositories.SchedulingRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final UserService userService;
    private final ServiceService serviceService;
    private final SchedulingRepository schedulingRepository;

    public List<SchedulingBasicResponseDTO> getAll(String userId, Boolean asConsumer, Integer schedulingStatus) {
        /**
         * [TODO]
         */
        return new LinkedList<>();
    }

    public SchedulingResponseDTO getById(String schedulingId) {
        Optional<Scheduling> scheduling = schedulingRepository.findById(Long.valueOf(schedulingId));

        return scheduling.map(this::project).orElse(null);
    }

    private SchedulingResponseDTO project(Scheduling scheduling) {

        return SchedulingResponseDTO.builder()
                .id(scheduling.getId().toString())
                .serviceId(scheduling.getService().getId().toString())
                .consumer(UserResponseDTO.builder()
                        .id(scheduling.getConsumer().getId().toString())
                        .name(scheduling.getConsumer().getName())
                        .email(scheduling.getConsumer().getEmail())
                        .cpf(scheduling.getConsumer().getCpf())
                        .cnpj(scheduling.getConsumer().getCnpj())
                        .telephone(scheduling.getConsumer().getTelephone())
                        .address(AddressResponseDTO.builder()
                                .id(scheduling.getConsumer().getAddress().getId().toString())
                                .state(scheduling.getConsumer().getAddress().getFederation().getState())
                                .county(scheduling.getConsumer().getAddress().getFederation().getCounty())
                                .district(scheduling.getConsumer().getAddress().getDistrict())
                                .publicPlace(scheduling.getConsumer().getAddress().getPublicPlace())
                                .number(scheduling.getConsumer().getAddress().getNumber())
                                .complement(scheduling.getConsumer().getAddress().getComplement())
                                .build())
                        .userRole(scheduling.getConsumer().getUserRole().getValue())
                        .creationDate(scheduling.getConsumer().getCreationDate().toString())
                        .updateDate(scheduling.getConsumer().getUpdateDate().toString())
                        .build())
                .build();
    }

    public SchedulingResponseDTO create(@Valid SchedulingRequestDTO schedulingRequestDTO) {

        Optional<ufes.marktiabackend.entities.Service> optService = serviceService.serviceById(schedulingRequestDTO.getServiceId());
        Optional<User> optConsumer = userService.userById(schedulingRequestDTO.getConsumerId());

        if (optService.isEmpty() || optConsumer.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }

        User provider = optService.get().getProvider();

        Scheduling scheduling = Scheduling.builder()
                .service(optService.get())
                .consumer(optConsumer.get())
                .provider(provider)
                .status(SchedulingStatus.OPENED)
                .build();

        Scheduling savedSchedule = schedulingRepository.save(scheduling);

        return project(savedSchedule);
    }

    public SchedulingResponseDTO updateStatus(String schedulingId, String userId) {
        /**
         * [TODO]
         */
        return null;
    }
}
