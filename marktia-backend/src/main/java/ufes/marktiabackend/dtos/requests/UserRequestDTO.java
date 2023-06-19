package ufes.marktiabackend.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private String imageURL;

    @NotNull(message = "O papel não pode ser vazio.")
    private Integer userRole;

    @NotBlank(message = "O nome não pode ser vazio.")
    private String name;

    @NotBlank(message = "O email não pode ser vazio.")
    private String email;

    @NotBlank(message = "O telefone não pode ser vazio.")
    private String telephone;

    @NotBlank(message = "O CPF não pode ser vazio.")
    private String cpf;

    private String cnpj;

    @NotNull(message = "O endereço não pode ser vazio.")
    private AddressRequestDTO address;
}
