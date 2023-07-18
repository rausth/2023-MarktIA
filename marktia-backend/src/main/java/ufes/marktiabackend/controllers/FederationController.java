package ufes.marktiabackend.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.jena.query.QueryExecution;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.apache.jena.rdf.model.Literal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.responses.federation.FederationFieldResponseDTO;
import ufes.marktiabackend.services.FederationService;

import java.util.List;

@RestController
@RequestMapping("/federations")
@RequiredArgsConstructor
public class FederationController {
    private final FederationService federationService;

    @GetMapping("/states")
    public ResponseEntity<List<FederationFieldResponseDTO>> getStates() {
//        return ResponseEntity.ok(federationService.getStates());

        /**
         * Consulta SPARQL
         */
        String query = "PREFIX dbo: <http://dbpedia.org/ontology/>\n"
                + "PREFIX dbp: <http://dbpedia.org/property/>\n"
                + "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n"
                + "select ?desc\n"
                + "where {\n"
                + "    ?uri a dbo:City ;\n"
                + "        dbp:name \"Rio de Janeiro\"@en ;\n"
                + "        rdfs:comment ?desc .\n"
                + "FILTER(langMatches(lang(?desc), \"EN\"))\n"
                + "}";

        QueryExecution queryExecution = QueryExecution
                .service("https://dbpedia.org/sparql")
                .query(query)
                .build();

        ResultSet results = queryExecution.execSelect();

        if (results.hasNext()) {
            QuerySolution querySolution = results.next();
            Literal literal = querySolution.getLiteral("desc");

            System.out.println(literal.getValue());
        }

        return ResponseEntity.ok(null);
    }

    @GetMapping("/regions")
    public ResponseEntity<List<FederationFieldResponseDTO>> getRegionsByState(@RequestParam String stateId) {
        return ResponseEntity.ok(federationService.getRegionsByState(Long.valueOf(stateId)));
    }

    @GetMapping("/countys")
    public ResponseEntity<List<FederationFieldResponseDTO>> getCountysByRegion(@RequestParam String stateId, @RequestParam String regionId) {
        return ResponseEntity.ok(federationService.getCountysByRegion(Long.valueOf(stateId), Long.valueOf(regionId)));
    }
}
