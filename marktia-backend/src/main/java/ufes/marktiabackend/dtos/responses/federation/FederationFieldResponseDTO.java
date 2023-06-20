package ufes.marktiabackend.dtos.responses.federation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FederationFieldResponseDTO {
    private String id;

    private String name;
}
