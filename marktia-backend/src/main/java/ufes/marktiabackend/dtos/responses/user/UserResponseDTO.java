package ufes.marktiabackend.dtos.responses.user;

import lombok.Builder;
import lombok.Data;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;

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
