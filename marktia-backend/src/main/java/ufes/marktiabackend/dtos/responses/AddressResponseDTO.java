package ufes.marktiabackend.dtos.responses;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
import ufes.marktiabackend.dtos.responses.federation.FederationResponseDTO;

@Data
@Builder
public class AddressResponseDTO {
    private String id;

    private FederationResponseDTO federation;

    private String district;

    private String publicPlace;

    private String number;

    private String complement;
}
