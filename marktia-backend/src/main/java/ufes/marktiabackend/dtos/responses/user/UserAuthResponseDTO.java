package ufes.marktiabackend.dtos.responses.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAuthResponseDTO {
    private String id;

    private String name;

    private Integer userRole;
}
