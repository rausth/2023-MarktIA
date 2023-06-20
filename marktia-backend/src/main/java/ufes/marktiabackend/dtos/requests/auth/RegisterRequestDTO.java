package ufes.marktiabackend.dtos.requests.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ufes.marktiabackend.dtos.requests.AddressRequestDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    private Integer userRole;

    private String name;

    private String email;

    private String password;

    private String cpf;

    private String cnpj;

    private String telephone;

    private AddressRequestDTO address;

    private String imageURL;
}
