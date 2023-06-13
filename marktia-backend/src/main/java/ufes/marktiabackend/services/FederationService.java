package ufes.marktiabackend.services;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
import ufes.marktiabackend.dtos.responses.federation.FederationResponseDTO;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.repositories.FederationRepository;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FederationService {

    private final FederationRepository federationRepository;

    public List<FederationFieldResponseDTO> getStates() {
        List<Object[]> federations = federationRepository.findDistinctUf();

        return federations.stream()
                .map(federation -> FederationFieldResponseDTO.builder()
                        .id(federation[0].toString())
                        .name(federation[1].toString())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public List<FederationFieldResponseDTO> getRegionsByState(Long uf) {
        List<Object[]> federations = federationRepository.findDistinctMicrorregiaoGeograficaByUf(uf);

        return federations.stream()
                .map(federation -> FederationFieldResponseDTO.builder()
                        .id(federation[0].toString())
                        .name(federation[1].toString())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public List<FederationFieldResponseDTO> getCountysByRegion(Long uf, Long microrregiaoGeografica) {
        List<Object[]> federations = federationRepository.findDistinctCodigoMunicipioCompletoByMicrorregiaoGeografica(uf, microrregiaoGeografica);

        return federations.stream()
                .map(federation -> FederationFieldResponseDTO.builder()
                        .id(federation[0].toString())
                        .name(federation[1].toString())
                        .build()
                )
                .collect(Collectors.toList());
    }

    public Federation getByCounty(Long codigoMunicipioCompleto) {
        return federationRepository.findByCodigoMunicipioCompleto(codigoMunicipioCompleto)
                .orElseThrow(() -> new EntityNotFoundException("Federação não encontrada."));
    }

    public FederationResponseDTO project(Federation federation) {
        return FederationResponseDTO.builder()
                .state(FederationFieldResponseDTO.builder()
                        .id(federation.getUf().toString())
                        .name(federation.getState())
                        .build())
                .region(FederationFieldResponseDTO.builder()
                        .id(federation.getMicrorregiaoGeografica().toString())
                        .name(federation.getNomeMicrorregiao())
                        .build())
                .county(FederationFieldResponseDTO.builder()
                        .id(federation.getCodigoMunicipioCompleto().toString())
                        .name(federation.getCounty())
                        .build())
                .build();
    }
}
