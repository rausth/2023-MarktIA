package ufes.marktiabackend.repositories.user;

import ufes.marktiabackend.dtos.UserDTO;

import java.util.List;

public interface UserRepositoryQuery {
    List<UserDTO> resume();
}
