package ufes.marktiabackend.dtos.responses;

import lombok.*;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.enums.UserRole;

import java.time.LocalDate;

@Data
@Builder
public class UserResponseDTO {
    private String id;

    private String name;

    private String email;

    private String cpf;

    private String cnpj;

    private String telephone;

    private AddressResponseDTO address;

    private Integer userRole;

    private String creationDate;

    private String updateDate;

    private String imageURL;
}
