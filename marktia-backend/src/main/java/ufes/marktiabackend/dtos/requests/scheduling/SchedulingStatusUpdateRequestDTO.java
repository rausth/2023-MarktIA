package ufes.marktiabackend.dtos.requests.scheduling;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ufes.marktiabackend.dtos.requests.EvaluationRequestDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingStatusUpdateRequestDTO {
    @NotBlank(message = "O id do usuário não pode ser vazio.")
    private String userId;

    private EvaluationRequestDTO evaluation;
}
