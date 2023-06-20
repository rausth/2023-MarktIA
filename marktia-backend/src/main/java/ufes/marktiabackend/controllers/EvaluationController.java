package ufes.marktiabackend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.EvaluationRequestDTO;
import ufes.marktiabackend.dtos.responses.EvaluationResponseDTO;
import ufes.marktiabackend.services.EvaluationService;

import java.util.List;

@RestController
@RequestMapping("/evaluations")
@RequiredArgsConstructor
public class EvaluationController {
    private final EvaluationService evaluationService;

    @GetMapping
    public ResponseEntity<List<EvaluationResponseDTO>> getByService(@RequestParam String serviceId) {
        return ResponseEntity.ok(evaluationService.getByService(serviceId));
    }
}
