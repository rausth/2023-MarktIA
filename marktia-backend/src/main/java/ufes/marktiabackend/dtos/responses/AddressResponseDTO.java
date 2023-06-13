package ufes.marktiabackend.dtos.responses;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;

@Data
@Builder
public class AddressResponseDTO {
    private String id;

    private FederationFieldResponseDTO state;

    private FederationFieldResponseDTO region;

    private FederationFieldResponseDTO county;

    private String district;

    private String publicPlace;

    private String number;

    private String complement;
}
