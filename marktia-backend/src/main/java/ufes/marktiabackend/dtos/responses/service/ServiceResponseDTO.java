package ufes.marktiabackend.dtos.responses.service;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;

import java.util.List;

@Data
@Builder
public class ServiceResponseDTO {
    private String id;

    private UserResponseDTO provider;

    private AddressResponseDTO address;

    private String title;

    private Integer type;

    private String description;

    private Double price;

    private String picpayUser;

    private List<SchedulingResponseDTO> schedulings;
}
