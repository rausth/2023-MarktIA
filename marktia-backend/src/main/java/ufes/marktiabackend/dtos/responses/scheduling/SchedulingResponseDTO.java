package ufes.marktiabackend.dtos.responses.scheduling;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;

@Data
@Builder
public class SchedulingResponseDTO {
    private String id;

    private String serviceId;

    private UserResponseDTO consumer;
}
