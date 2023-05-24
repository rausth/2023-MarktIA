package ufes.marktiabackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ufes.marktiabackend.enums.UserRole;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    @Size(min = 11, max = 11)
    private String cpf;

    @Size(min = 14, max = 14)
    private String cnpj;

    @NotNull
    @Size(max = 15)
    private String telephone;

    @NotNull
    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @NotNull
    @Column(name = "role")
    private UserRole userRole;

    @Column(name = "dt_creation", insertable = false)
    private LocalDate creationDate;

    @Column(name = "dt_update", insertable = false)
    private LocalDate updateDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
