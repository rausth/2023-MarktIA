package ufes.marktiabackend.services;

import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.SchedulingRequestDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.scheduling.SchedulingResponseDTO;

import java.util.LinkedList;
import java.util.List;

@Service
public class SchedulingService {
    public List<SchedulingBasicResponseDTO> getAll(String userId, Boolean asConsumer, Integer schedulingStatus) {
        /**
         * [TODO]
         */
        return new LinkedList<>();
    }

    public SchedulingResponseDTO getById(String schedulingId) {
        /**
         * [TODO]
         */
        return null;
    }

    public SchedulingResponseDTO create(SchedulingRequestDTO schedulingRequestDTO) {
        /**
         * [TODO]
         */
        return null;
    }

    public SchedulingResponseDTO updateStatus(String schedulingId, String userId) {
        /**
         * [TODO]
         */
        return null;
    }
}
