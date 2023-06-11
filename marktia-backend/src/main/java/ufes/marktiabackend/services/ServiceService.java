package ufes.marktiabackend.services;

import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.ServiceRequestDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceResponseDTO;

import java.util.LinkedList;
import java.util.List;

@Service
public class ServiceService {
    public List<ServiceBasicResponseDTO> getAll(Boolean myServices, String name, String addressId, Integer type) {
        /**
         * [TODO]
         */
        return new LinkedList<>();
    }

    public ServiceResponseDTO getById(String serviceId) {
        /**
         * [TODO]
         */
        return null;
    }

    public ServiceResponseDTO create(ServiceRequestDTO serviceRequestDTO) {
        /**
         * [TODO]
         */
        return null;
    }
}
