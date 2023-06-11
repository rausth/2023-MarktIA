package ufes.marktiabackend.dtos.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EvaluationResponseDTO {
    private String id;

    private Double rating;

    private String assessment;

    private String schedulingId;
}
