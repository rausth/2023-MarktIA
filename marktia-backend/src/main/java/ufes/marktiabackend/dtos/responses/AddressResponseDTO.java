package ufes.marktiabackend.dtos.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressResponseDTO {
    private String id;

    private String state;

    private String city;

    private String district;

    private String publicPlace;

    private String number;

    private String complement;
}
