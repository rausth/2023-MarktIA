package ufes.marktiabackend.services;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.SchedulingRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.SchedulingStatus;
import ufes.marktiabackend.filters.schedulingsfilter.SchedulingsFilter;
import ufes.marktiabackend.filters.schedulingsfilter.SchedulingsFilterSpecification;
import ufes.marktiabackend.repositories.SchedulingRepository;
import ufes.marktiabackend.repositories.ServiceRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final UserService userService;
    private final SchedulingRepository schedulingRepository;
    private final ServiceRepository serviceRepository;

    public List<SchedulingBasicResponseDTO> getAll(String userId, Boolean asConsumer, Integer schedulingStatus) {
        SchedulingsFilter schedulingsFilter = SchedulingsFilter.builder()
                .userId(userId)
                .asConsumer(asConsumer)
                .schedulingStatus(schedulingStatus)
                .build();

        List<Scheduling> schedulings = schedulingRepository.findAll(new SchedulingsFilterSpecification(schedulingsFilter));

        return schedulings.stream()
                .map(scheduling -> SchedulingBasicResponseDTO.builder()
                        .id(scheduling.getId().toString())
                        .provider(UserBasicResponseDTO.builder()
                                .id(scheduling.getProvider().getId().toString())
                                .name(scheduling.getProvider().getName())
                                .imageURL(scheduling.getProvider().getImageUrl())
                                .build())
                        .consumer(UserBasicResponseDTO.builder()
                                .id(scheduling.getConsumer().getId().toString())
                                .name(scheduling.getConsumer().getName())
                                .imageURL(scheduling.getConsumer().getImageUrl())
                                .build())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public SchedulingResponseDTO getById(String schedulingId) {
        Optional<Scheduling> scheduling = schedulingRepository.findById(Long.valueOf(schedulingId));

        return scheduling.map(this::project).orElse(null);
    }

    public SchedulingResponseDTO create(@Valid SchedulingRequestDTO schedulingRequestDTO) {
        Optional<ufes.marktiabackend.entities.Service> optService = serviceRepository.findById(Long.valueOf(schedulingRequestDTO.getServiceId()));
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

    public SchedulingResponseDTO project(Scheduling scheduling) {
        return SchedulingResponseDTO.builder()
                .id(scheduling.getId().toString())
                .serviceId(scheduling.getService().getId().toString())
                .consumer(userService.project(scheduling.getConsumer()))
                .status(scheduling.getStatus().getValue())
                .creationDate(scheduling.getCreationDate().toString())
                .completionDate(scheduling.getCompletionDate() != null ? scheduling.getCompletionDate().toString() : null)
                .build();
    }

    public SchedulingResponseDTO updateStatus(String schedulingId, String userId) {
        /**
         * [TODO]
         */
        return null;
    }
}
