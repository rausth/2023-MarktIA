package ufes.marktiabackend.dtos.responses.scheduling;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.user.UserBasicResponseDTO;

@Data
@Builder
public class SchedulingBasicResponseDTO {
    private String id;

    private UserBasicResponseDTO provider;

    private UserBasicResponseDTO consumer;
}
