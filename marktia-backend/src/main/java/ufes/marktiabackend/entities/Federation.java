package ufes.marktiabackend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "federation")
public class Federation {

    @Id
    private Long id;

    private Long uf;

    @Column(name = "nome_uf")
    private String state;

    @Column(name = "regiao_geografica_intermediaria")
    private Long regiaoGeograficaIntermediaria;

    @Column(name = "nome_regiao_geografica_intermediaria")
    private String nomeRegiaoGeograficaIntermediaria;

    @Column(name = "regiao_geografica_imediata")
    private Long regiaoGeograficaImediata;

    @Column(name = "nome_regiao_geografica_imediata")
    private String nomeRegiaoGeograficaImediata;

    @Column(name = "mesorregiao_geografica")
    private Long mesorregiaoGeografica;

    @Column(name = "nome_mesorregiao")
    private String nomeMesorregiao;

    @Column(name = "microrregiao_geografica")
    private Long microrregiaoGeografica;

    @Column(name = "nome_microrregiao")
    private String nomeMicrorregiao;

    private Long municipio;

    @Column(name = "codigo_municipio_completo")
    private Long codigoMunicipioCompleto;

    @Column(name = "nome_municipio")
    private String county;

}
