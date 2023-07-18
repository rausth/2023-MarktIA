package ufes.marktiabackend.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.jena.base.Sys;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.apache.jena.rdf.model.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
import ufes.marktiabackend.services.FederationService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/federations")
@RequiredArgsConstructor
public class FederationController {
    private final FederationService federationService;

    @GetMapping("/states")
    public ResponseEntity<List<FederationFieldResponseDTO>> getStates() {
        /**
         * Consulta SPARQL
         */
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

        while (results.hasNext()) {
            try {
                QuerySolution querySolution = results.next();
                Literal literal = querySolution.getLiteral("name");

                Object state = literal.getValue();
                System.out.println(state);
            } catch (Exception ignored) {}
        }
        System.out.println("Espírito Santo");

        return ResponseEntity.ok(null);
    }

    @GetMapping("/cities")
    public ResponseEntity<List<FederationFieldResponseDTO>> getCities(@RequestParam String state) {
        /**
         * Consulta SPARQL
         */
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

        while (results.hasNext()) {
            try {
                QuerySolution querySolution = results.next();
                Literal literal = querySolution.getLiteral("city");

                Object city = literal.getValue();
                System.out.println(city);
            } catch (Exception ignored) {}
        }

        return ResponseEntity.ok(null);
    }
}
