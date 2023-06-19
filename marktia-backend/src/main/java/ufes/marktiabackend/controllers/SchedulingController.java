package ufes.marktiabackend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.scheduling.SchedulingRequestDTO;
import ufes.marktiabackend.dtos.requests.scheduling.SchedulingStatusUpdateRequestDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingResponseDTO;
import ufes.marktiabackend.services.SchedulingService;

import java.util.List;

@RestController
@RequestMapping("/schedulings")
@RequiredArgsConstructor
public class SchedulingController {
    private final SchedulingService schedulingService;

    @GetMapping
    public ResponseEntity<List<SchedulingBasicResponseDTO>> getAll(
            @RequestParam String userId,
            @RequestParam Boolean asConsumer,
            @RequestParam Integer schedulingStatus
    ) {
        return ResponseEntity.ok(schedulingService.getAll(userId, asConsumer, schedulingStatus));
    }

    @GetMapping("/{scheduling-id}")
    public ResponseEntity<SchedulingResponseDTO> getById(@PathVariable("scheduling-id") String schedulingId) {
        return ResponseEntity.ok(schedulingService.getById(schedulingId));
    }

    @PostMapping
    public ResponseEntity<SchedulingResponseDTO> create(@RequestBody @Valid SchedulingRequestDTO schedulingRequestDTO) {
        return ResponseEntity.ok(schedulingService.create(schedulingRequestDTO));
    }

    @PutMapping("/{scheduling-id}")
    public ResponseEntity<SchedulingResponseDTO> updateStatus(
            @PathVariable("scheduling-id") String schedulingId,
            @RequestBody @Valid SchedulingStatusUpdateRequestDTO schedulingStatusUpdateRequestDTO
    ) {
        return ResponseEntity.ok(schedulingService.updateStatus(schedulingId, schedulingStatusUpdateRequestDTO));
    }
}
