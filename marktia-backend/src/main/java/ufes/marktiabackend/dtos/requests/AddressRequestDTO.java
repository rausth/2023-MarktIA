package ufes.marktiabackend.dtos.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequestDTO {
    @NotNull
    private String countyId;

    @NotNull
    private String district;

    @NotNull
    private String publicPlace;

    @NotNull
    private String number;

    private String complement;
}
