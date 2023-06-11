package ufes.marktiabackend.dtos.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String name;

    private String email;

    private String cpf;

    private String cnpj;

    private String telephone;

    private String addressId;

    private String imageURL;
}
