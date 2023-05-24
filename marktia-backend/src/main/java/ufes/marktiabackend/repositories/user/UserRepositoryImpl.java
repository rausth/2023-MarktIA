package ufes.marktiabackend.repositories.user;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import ufes.marktiabackend.dtos.UserDTO;
import ufes.marktiabackend.entities.User;

import java.util.List;

public class UserRepositoryImpl implements UserRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<UserDTO> resume() {

        CriteriaBuilder builder = manager.getCriteriaBuilder();
        CriteriaQuery<UserDTO> criteria = builder.createQuery(UserDTO.class);
        Root<User> root = criteria.from(User.class);

        criteria.select(builder.construct(UserDTO.class
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

        TypedQuery<UserDTO> query = manager.createQuery(criteria);

        return query.getResultList();
    }
}
