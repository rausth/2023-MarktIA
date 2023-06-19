package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.scheduling.SchedulingRequestDTO;
import ufes.marktiabackend.dtos.requests.scheduling.SchedulingStatusUpdateRequestDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserBasicResponseDTO;
import ufes.marktiabackend.entities.Evaluation;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.SchedulingStatus;
import ufes.marktiabackend.exceptionhandler.custom.InvalidSchedulingStatusUpdateException;
import ufes.marktiabackend.filters.schedulingsfilter.SchedulingsFilter;
import ufes.marktiabackend.filters.schedulingsfilter.SchedulingsFilterSpecification;
import ufes.marktiabackend.repositories.SchedulingRepository;
import ufes.marktiabackend.repositories.ServiceRepository;
import ufes.marktiabackend.repositories.UserRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final EvaluationService evaluationService;
    private final UserService userService;
    private final SchedulingRepository schedulingRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

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

        if (optConsumer.isEmpty()) {
            throw new EntityNotFoundException("Usuário não encontrado.");
        }

        if (optService.isEmpty()) {
            throw new EntityNotFoundException("Serviço não encontrado.");
        }

        User provider = optService.get().getProvider();

        Scheduling scheduling = Scheduling.builder()
                .service(optService.get())
                .consumer(optConsumer.get())
                .provider(provider)
                .status(SchedulingStatus.OPENED)
                .creationDate(LocalDate.now())
                .build();

        Scheduling savedSchedule = schedulingRepository.save(scheduling);

        return project(savedSchedule);
    }

    public SchedulingResponseDTO updateStatus(String schedulingId, SchedulingStatusUpdateRequestDTO schedulingStatusUpdateRequestDTO) {
        Scheduling scheduling = schedulingRepository.findById(Long.valueOf(schedulingId))
                .orElseThrow(() -> new EntityNotFoundException("Agendamento não encontrado."));

        User user = userRepository.findById(Long.valueOf(schedulingStatusUpdateRequestDTO.getUserId()))
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

        if (scheduling.getStatus() == SchedulingStatus.OPENED) {
            if (Objects.equals(user.getId(), scheduling.getProvider().getId())) {
                scheduling.setStatus(SchedulingStatus.DELIVERED);
            } else {
                throw new InvalidSchedulingStatusUpdateException("Um usuário que não é o provedor de um agendamento aberto" +
                        "não pode alterar seu status");
            }
        } else if (scheduling.getStatus() == SchedulingStatus.DELIVERED) {
            if (Objects.equals(user.getId(), scheduling.getConsumer().getId())) {
                Evaluation evaluation = evaluationService.create(schedulingStatusUpdateRequestDTO.getEvaluation());

                scheduling.setEvaluation(evaluation);
                scheduling.setStatus(SchedulingStatus.FINISHED);
            } else {
                throw new InvalidSchedulingStatusUpdateException("Um usuário que não é o consumidor de um agendamento entregue" +
                        "não pode alterar seu status");
            }
        }

        schedulingRepository.save(scheduling);

        return project(scheduling);
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
}
