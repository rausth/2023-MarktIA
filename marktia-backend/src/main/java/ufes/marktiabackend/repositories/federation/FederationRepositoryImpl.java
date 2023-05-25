package ufes.marktiabackend.repositories.federation;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import ufes.marktiabackend.dtos.FederationDTO;
import ufes.marktiabackend.entities.Federation;

import java.util.List;

public class FederationRepositoryImpl implements FederationRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<FederationDTO> distinctUf() {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<FederationDTO> criteria = builder.createQuery(FederationDTO.class);
        Root<Federation> root = criteria.from(Federation.class);

        criteria.select(builder.construct(FederationDTO.class, root.get("uf"), root.get("nomeUf")));
        criteria.distinct(true);

        TypedQuery<FederationDTO> typedQuery = manager.createQuery(criteria);

        return typedQuery.getResultList();
    }

    @Override
    public List<FederationDTO> distinctImmediateGeographicRegion(Long uf) {
        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<FederationDTO> criteria = builder.createQuery(FederationDTO.class);
        Root<Federation> root = criteria.from(Federation.class);

        criteria.select(builder.construct(FederationDTO.class,
                root.get("uf"),
                root.get("nomeUf"),
                root.get("regiaoGeograficaImediata"),
                root.get("nomeRegiaoGeograficaImediata")));
        criteria.distinct(true);

        criteria.where(builder.equal(root.get("uf"), uf));

        TypedQuery<FederationDTO> typedQuery = manager.createQuery(criteria);

        return typedQuery.getResultList();
    }
}
