package ufes.marktiabackend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String state;

    @NotNull
    private String city;

    @NotNull
    private String district;

    @NotNull
    @Column(name = "public_place")
    private String publicPlace;

    @NotNull
    private String number;

    private String complement;
}
