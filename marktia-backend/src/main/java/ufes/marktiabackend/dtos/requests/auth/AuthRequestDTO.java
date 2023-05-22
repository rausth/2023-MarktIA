package ufes.marktiabackend.dtos.requests.auth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthRequestDTO {
    private final String email;

    private final String password;
}
