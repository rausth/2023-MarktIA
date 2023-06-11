package ufes.marktiabackend.dtos.responses.service;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.user.UserBasicResponseDTO;

@Data
@Builder
public class ServiceBasicResponseDTO {
    private String id;

    private String title;

    private UserBasicResponseDTO provider;
}
