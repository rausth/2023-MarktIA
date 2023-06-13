package ufes.marktiabackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.repositories.federation.FederationRepositoryQuery;

import java.util.List;
import java.util.Optional;

@Repository
public interface FederationRepository extends JpaRepository<Federation, Long>, FederationRepositoryQuery {
    @Query("SELECT DISTINCT uf, state FROM federation")
    List<Object[]> findDistinctUf();

    @Query("SELECT DISTINCT microrregiaoGeografica, nomeMicrorregiao FROM federation WHERE uf = :uf")
    List<Object[]> findDistinctMicrorregiaoGeograficaByUf(Long uf);

    @Query("SELECT DISTINCT codigoMunicipioCompleto, county FROM federation WHERE uf = :uf AND microrregiaoGeografica = :microrregiaoGeografica")
    List<Object[]> findDistinctCodigoMunicipioCompletoByMicrorregiaoGeografica(Long uf, Long microrregiaoGeografica);

    Optional<Federation> findByCodigoMunicipioCompleto(Long codigoMunicipioCompleto);
}
