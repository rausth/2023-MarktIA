package ufes.marktiabackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.enums.UserRole;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String email;
    private String cpf;
    private String cnpj;
    private String telephone;
    private Address address;
    private UserRole userRole;
    private LocalDate creationDate;
    private LocalDate updateDate;

}
