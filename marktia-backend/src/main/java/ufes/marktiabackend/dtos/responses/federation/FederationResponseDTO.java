package ufes.marktiabackend.dtos.responses.federation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FederationResponseDTO {
    private FederationFieldResponseDTO state;

    private FederationFieldResponseDTO region;

    private FederationFieldResponseDTO county;
}
