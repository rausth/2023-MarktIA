package ufes.marktiabackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
import ufes.marktiabackend.services.FederationService;

import java.util.List;

@RestController
@RequestMapping("/federations")
@RequiredArgsConstructor
public class FederationController {
    private final FederationService federationService;

    @GetMapping("/states")
    public ResponseEntity<List<FederationFieldResponseDTO>> getStates() {
        return ResponseEntity.ok(federationService.getStates());
    }

    @GetMapping("/regions")
    public ResponseEntity<List<FederationFieldResponseDTO>> getRegionsByState(@RequestParam String stateId) {
        return ResponseEntity.ok(federationService.getRegionsByState(Long.valueOf(stateId)));
    }

    @GetMapping("/countys")
    public ResponseEntity<List<FederationFieldResponseDTO>> getCountysByRegion(@RequestParam String stateId, @RequestParam String regionId) {
        return ResponseEntity.ok(federationService.getCountysByRegion(Long.valueOf(stateId), Long.valueOf(regionId)));
    }
}
