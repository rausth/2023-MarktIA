package ufes.marktiabackend.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FederationDTO {
    private Long uf;
    private String nomeUf;
    private Long regiaoGeograficaImediata;
    private String nomeRegiaoGeograficaImediata;
    private Long municipio;
    private Long codigoMunicipioCompleto;
    private String nome_municipio;

    public FederationDTO(Long uf, String nomeUf) {
        this.uf = uf;
        this.nomeUf = nomeUf;
    }

    public FederationDTO(Long uf, String nomeUf, Long regiaoGeograficaImediata, String nomeRegiaoGeograficaImediata) {
        this.uf = uf;
        this.nomeUf = nomeUf;
        this.regiaoGeograficaImediata = regiaoGeograficaImediata;
        this.nomeRegiaoGeograficaImediata = nomeRegiaoGeograficaImediata;
    }

    public FederationDTO(Long uf, String nomeUf, Long regiaoGeograficaImediata, String nomeRegiaoGeograficaImediata, Long municipio, Long codigoMunicipioCompleto, String nome_municipio) {
        this.uf = uf;
        this.nomeUf = nomeUf;
        this.regiaoGeograficaImediata = regiaoGeograficaImediata;
        this.nomeRegiaoGeograficaImediata = nomeRegiaoGeograficaImediata;
        this.municipio = municipio;
        this.codigoMunicipioCompleto = codigoMunicipioCompleto;
        this.nome_municipio = nome_municipio;
    }
}
