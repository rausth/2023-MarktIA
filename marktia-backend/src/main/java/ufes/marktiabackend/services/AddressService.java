package ufes.marktiabackend.services;

import lombok.RequiredArgsConstructor;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.entities.Address;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    public List<String> getStates() {
        String query = "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                "PREFIX dbp: <http://dbpedia.org/property/>\n" +
                "PREFIX dbr: <http://dbpedia.org/resource/>\n" +
                "SELECT ?name\n" +
                "WHERE {\n" +
                "    {\n" +
                "        ?state dbo:type dbr:States_of_Brazil .\n" +
                "    } UNION {\n" +
                "        ?state dbo:type dbr:Federative_units_of_Brazil .\n" +
                "    } UNION {\n" +
                "        ?state dbo:isoCodeRegion \"BR-DF\" .\n" +
                "    }\n" +
                "    ?state dbp:name ?name\n" +
                "}";

        QueryExecution queryExecution = QueryExecution
                .service("https://dbpedia.org/sparql")
                .query(query)
                .build();

        ResultSet results = queryExecution.execSelect();
        List<String> states = new LinkedList<>();

        while (results.hasNext()) {
            try {
                QuerySolution querySolution = results.next();
                Literal literal = querySolution.getLiteral("name");

                Object state = literal.getValue();
                states.add(state.toString());
            } catch (Exception ignored) {}
        }
        states.add("Espírito Santo");

        return states;
    }

    public List<String> getCities(String state) {
        String query = "PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
                "PREFIX dbp: <http://dbpedia.org/property/>\n" +
                "PREFIX dbr: <http://dbpedia.org/resource/>\n" +
                "SELECT ?city\n" +
                "WHERE {\n" +
                "    ?state dbp:name \"" + state + "\"@en .\n" +
                "    ?state dbp:city ?city\n" +
                "}";

        QueryExecution queryExecution = QueryExecution
                .service("https://dbpedia.org/sparql")
                .query(query)
                .build();

        ResultSet results = queryExecution.execSelect();
        List<String> cities = new LinkedList<>();

        while (results.hasNext()) {
            try {
                QuerySolution querySolution = results.next();
                Literal literal = querySolution.getLiteral("city");

                Object city = literal.getValue();
                cities.add(city.toString().split("\\,")[0]);
            } catch (Exception ignored) {}
        }

        return cities;
    }

    public AddressResponseDTO project(Address address) {
        return AddressResponseDTO.builder()
                .id(address.getId().toString())
                .state(address.getState())
                .city(address.getCity())
                .district(address.getDistrict())
                .publicPlace(address.getPublicPlace())
                .number(address.getNumber())
                .complement(address.getComplement())
                .build();
    }
}
