package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.repositories.federation.FederationRepositoryQuery;

@Repository
public interface FederationRepository extends JpaRepository<Federation, Long>, FederationRepositoryQuery {
}
