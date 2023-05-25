package ufes.marktiabackend.repositories.federation;

import ufes.marktiabackend.dtos.FederationDTO;

import java.util.List;

public interface FederationRepositoryQuery {

    List<FederationDTO> distinctUf();

    List<FederationDTO> distinctImmediateGeographicRegion(Long uf);
}
