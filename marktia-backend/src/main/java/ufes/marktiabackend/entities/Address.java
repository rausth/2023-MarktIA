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

    @OneToOne
    @JoinColumn(name = "federation_id")
    private Federation federation;

    @NotNull
    private String district;

    @NotNull
    @Column(name = "public_place")
    private String publicPlace;

    @NotNull
    private String number;

    private String complement;
}
