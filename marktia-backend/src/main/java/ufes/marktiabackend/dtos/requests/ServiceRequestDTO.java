package ufes.marktiabackend.dtos.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequestDTO {
    @NotNull
    private String providerId;

    @Valid
    private AddressRequestDTO address;

    @NotNull
    private String title;

    @NotNull
    private Integer type;

    @NotNull
    private String description;

    @NotNull
    private Double price;

    @NotNull
    private String picpayUser;
}
