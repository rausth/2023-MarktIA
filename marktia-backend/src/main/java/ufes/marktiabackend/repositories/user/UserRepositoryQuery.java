package ufes.marktiabackend.repositories.user;

import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;

import java.util.List;

public interface UserRepositoryQuery {
    List<UserResponseDTO> resume();
}
