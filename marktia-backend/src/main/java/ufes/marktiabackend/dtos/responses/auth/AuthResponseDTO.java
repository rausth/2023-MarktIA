package ufes.marktiabackend.dtos.responses.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private String id;

    private String name;

    private Integer userRole;

    private String token;
}
