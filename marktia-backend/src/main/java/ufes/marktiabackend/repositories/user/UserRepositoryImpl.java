package ufes.marktiabackend.repositories.user;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import ufes.marktiabackend.dtos.responses.UserResponseDTO;
import ufes.marktiabackend.entities.User;

import java.util.List;

public class UserRepositoryImpl implements UserRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<UserResponseDTO> resume() {

        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<UserResponseDTO> criteria = builder.createQuery(UserResponseDTO.class);
        Root<User> root = criteria.from(User.class);

        criteria.select(builder.construct(UserResponseDTO.class
            , root.get("id")
            , root.get("name")
            , root.get("email")
            , root.get("cpf")
            , root.get("cnpj")
            , root.get("telephone")
            , root.get("address")
            , root.get("userRole")
            , root.get("creationDate")
            , root.get("updateDate")));

        TypedQuery<UserResponseDTO> query = manager.createQuery(criteria);

        return query.getResultList();
    }
}
