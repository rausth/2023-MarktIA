package ufes.marktiabackend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequestDTO {
    private String providerId;

    private String addressId;

    private String title;

    private Integer type;

    private String description;

    private Double price;

    private String picpayUser;
}
