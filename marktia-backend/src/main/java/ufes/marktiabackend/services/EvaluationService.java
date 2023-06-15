package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.EvaluationRequestDTO;
import ufes.marktiabackend.dtos.responses.EvaluationResponseDTO;
import ufes.marktiabackend.entities.Evaluation;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.enums.SchedulingStatus;
import ufes.marktiabackend.exceptionhandler.custom.NonFinishedSchedulingException;
import ufes.marktiabackend.repositories.EvaluationRepository;
import ufes.marktiabackend.repositories.SchedulingRepository;
import ufes.marktiabackend.repositories.ServiceRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final ServiceRepository serviceRepository;
    private final EvaluationRepository evaluationRepository;
    private final SchedulingRepository schedulingRepository;

    public List<EvaluationResponseDTO> getByService(String serviceId) {
        Optional<ufes.marktiabackend.entities.Service> service = serviceRepository.findById(Long.valueOf(serviceId));

        if (service.isEmpty()) {
            throw new EntityNotFoundException("Serviço não encontrado.");
        }

        List<Evaluation> evaluations = evaluationRepository.EvaluationByServiceId(Long.valueOf(serviceId));

        return evaluations.stream()
                .filter(Objects::nonNull)
                .map(this::project)
                .collect(Collectors.toList());
    }

    private EvaluationResponseDTO project(Evaluation evaluation) {
        return EvaluationResponseDTO.builder()
                .id(evaluation.getId().toString())
                .rating(evaluation.getRating())
                .assessment(evaluation.getAssessment())
                .schedulingId(evaluation.getScheduling().getId().toString())
                .build();
    }

    public EvaluationResponseDTO create(@Valid EvaluationRequestDTO evaluationRequestDTO) {
        Optional<Scheduling> scheduling = schedulingRepository.findById(Long.valueOf(evaluationRequestDTO.getSchedulingId()));

        if (scheduling.isEmpty()) {
            throw new EntityNotFoundException("Agendamento não encontrado.");
        }

        if (scheduling.get().getStatus() != SchedulingStatus.FINISHED) {
            throw new NonFinishedSchedulingException("Agendamento não finalizado");
        }

        Evaluation evaluation = Evaluation.builder()
                .scheduling(scheduling.get())
                .rating(evaluationRequestDTO.getRating())
                .assessment(evaluationRequestDTO.getAssessment())
                .build();

        Evaluation savedEvaluation = evaluationRepository.save(evaluation);

        return project(savedEvaluation);
    }
}
