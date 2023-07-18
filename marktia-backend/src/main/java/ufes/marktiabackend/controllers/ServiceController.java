package ufes.marktiabackend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.ServiceRequestDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceResponseDTO;
import ufes.marktiabackend.services.ServiceService;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping
    public ResponseEntity<List<ServiceBasicResponseDTO>> getAll(
            @RequestParam(required = false) String providerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer type,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String city
    ) {
        return ResponseEntity.ok(serviceService.getAll(providerId, name, type, state, city));
    }

    @GetMapping("/{service-id}")
    public ResponseEntity<ServiceResponseDTO> getById(@PathVariable("service-id") String serviceId) {
        ServiceResponseDTO serviceResponseDTO = serviceService.responseDTOById(serviceId);

        if (serviceResponseDTO != null) {
            return ResponseEntity.ok(serviceResponseDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ServiceResponseDTO> create(@RequestBody @Valid ServiceRequestDTO serviceRequestDTO) {
        return ResponseEntity.ok(serviceService.create(serviceRequestDTO));
    }
}
