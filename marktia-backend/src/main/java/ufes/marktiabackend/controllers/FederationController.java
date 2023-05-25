package ufes.marktiabackend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ufes.marktiabackend.dtos.FederationDTO;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.repositories.FederationRepository;
import ufes.marktiabackend.services.FederationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/federation")
public class FederationController {

    private final FederationService federationService;
    private final FederationRepository federationRepository;

    public FederationController(FederationService federationService, FederationRepository federationRepository) {
        this.federationService = federationService;
        this.federationRepository = federationRepository;
    }

    @GetMapping
    public List<Federation> list() {
        return federationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Federation> searchById(@PathVariable Long id) {
        Optional<Federation> federation = federationRepository.findById(id);

        return federation.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/uf")
    public List<FederationDTO> retrieveDistinctUf() {
        return federationRepository.distinctUf();
    }

    @GetMapping("/uf/{id}/immediate_geographic_region")
    public List<FederationDTO> retrieveDistinctImmediateGeographicRegion(@PathVariable Long id) {
        return federationRepository.distinctImmediateGeographicRegion(id);
    }
}
