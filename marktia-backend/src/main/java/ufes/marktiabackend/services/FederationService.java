package ufes.marktiabackend.services;

import org.springframework.stereotype.Service;
import ufes.marktiabackend.repositories.FederationRepository;

import java.util.List;

@Service
public class FederationService {

    private final FederationRepository federationRepository;

    public FederationService(FederationRepository federationRepository) {
        this.federationRepository = federationRepository;
    }

    public List<String> getDistinctUf() {
        return null;
    }
}
