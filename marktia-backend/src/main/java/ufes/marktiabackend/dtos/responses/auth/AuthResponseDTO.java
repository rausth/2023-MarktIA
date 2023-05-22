package ufes.marktiabackend.dtos.responses.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private String name;

    private String email;

    private String token;
}
