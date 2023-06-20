package ufes.marktiabackend.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationRequestDTO {

    @NotNull
    private String schedulingId;

    @NotNull
    private Double rating;

    private String assessment;
}
