package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.EvaluationRequestDTO;
import ufes.marktiabackend.dtos.responses.EvaluationResponseDTO;
import ufes.marktiabackend.entities.Evaluation;
import ufes.marktiabackend.entities.Scheduling;
import ufes.marktiabackend.repositories.ServiceRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EvaluationService {

    private final ServiceRepository serviceRepository;

    public List<EvaluationResponseDTO> getByService(String serviceId) {
        Optional<ufes.marktiabackend.entities.Service> service = serviceRepository.findById(Long.valueOf(serviceId));

        if (service.isEmpty()) {
            throw new EntityNotFoundException("Serviço não encontrado.");
        }

        List<Scheduling> schedulings = service.get().getSchedulings();

        return schedulings.stream()
                .filter(scheduling -> scheduling.getEvaluation() != null)
                .map(scheduling -> project(scheduling.getEvaluation()))
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

    public EvaluationResponseDTO create(EvaluationRequestDTO evaluationRequestDTO) {
        /**
         * [TODO]
         */
        return null;
    }
}
