package ufes.marktiabackend.controllers;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.apache.jena.vocabulary.RDFS;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.ServiceRequestDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceBasicResponseDTO;
import ufes.marktiabackend.dtos.responses.service.ServiceResponseDTO;
import ufes.marktiabackend.entities.Service;
import ufes.marktiabackend.services.ServiceService;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping(value = "/asRDF", produces = MediaType.APPLICATION_XML_VALUE)
    public void getAllAsRDF(HttpServletResponse response) {
        List<Service> services = serviceService.getAllAsRDF();

        Model model = ModelFactory.createDefaultModel();

        String myNS = "http://localhost:8080/services/asRDF/";
        String grNS = "http://purl.org/goodrelations/v1#";

        model.setNsPrefix("gr", grNS);

        Resource grOffering = ResourceFactory.createResource(grNS + "Offering");

        Resource grPriceSpecification = ResourceFactory.createResource(grNS + "PriceSpecification");
        Property grHasPriceSpecification = ResourceFactory.createProperty(grNS + "hasPriceSpecification");
        Property grHasCurrencyValue = ResourceFactory.createProperty(grNS + "hasCurrencyValue");

        for (Service service : services) {
            model.createResource(myNS + service.getId())
                    .addProperty(RDF.type, grOffering)
                    .addProperty(RDFS.label, service.getTitle())
                    .addProperty(RDFS.comment, service.getDescription())
                    .addProperty(grHasPriceSpecification, model.createResource()
                            .addProperty(RDF.type, grPriceSpecification)
                            .addLiteral(grHasCurrencyValue, service.getPrice())
                    );
        }

        try (PrintWriter out = response.getWriter()) {
            model.write(out, "RDF/XML");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ResponseEntity<List<ServiceBasicResponseDTO>> getAll(
            @RequestParam(required = false) String providerId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer type,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String city
    ) {
        return ResponseEntity.ok(serviceService.getAll(providerId, name, type, state, city));
    }

    @GetMapping("/{service-id}")
    public ResponseEntity<ServiceResponseDTO> getById(@PathVariable("service-id") String serviceId) {
        ServiceResponseDTO serviceResponseDTO = serviceService.responseDTOById(serviceId);

        if (serviceResponseDTO != null) {
            return ResponseEntity.ok(serviceResponseDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ServiceResponseDTO> create(@RequestBody @Valid ServiceRequestDTO serviceRequestDTO) {
        return ResponseEntity.ok(serviceService.create(serviceRequestDTO));
    }
}
