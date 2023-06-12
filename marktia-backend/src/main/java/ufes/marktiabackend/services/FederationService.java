package ufes.marktiabackend.services;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.repositories.FederationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FederationService {

    private final FederationRepository federationRepository;

    public FederationService(FederationRepository federationRepository) {
        this.federationRepository = federationRepository;
    }

    public Federation getById(Long federation_id) {
        Optional<Federation> federation = federationRepository.findById(federation_id);

        if (federation.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }

        return federation.get();
    }

    public List<String> getDistinctUf() {
        return null;
    }
}
