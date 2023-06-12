package ufes.marktiabackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ufes.marktiabackend.enums.ServiceType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "service")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "provider_id")
    private User provider;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @NotNull
    @Size(min = 5, max = 50)
    private String title;

    @NotNull
    private ServiceType type;

    @NotNull
    private String description;

    @NotNull
    private Double price;

    @NotNull
    @Size(min = 5, max = 100)
    @Column(name = "picpay_user")
    private String picpayUser;

}
