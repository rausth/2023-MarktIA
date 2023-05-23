package ufes.marktiabackend.controllers;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.event.ResourceCreatedEvent;
import ufes.marktiabackend.repositories.AddressRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/address")
public class AddressController {

    private final AddressRepository addressRepository;
    private final ApplicationEventPublisher publisher;

    public AddressController(AddressRepository addressRepository, ApplicationEventPublisher publisher) {
        this.addressRepository = addressRepository;
        this.publisher = publisher;
    }

    @GetMapping
    public List<Address> list() {
        return addressRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Address> searchById(@PathVariable Long id) {
        Optional<Address> address = addressRepository.findById(id);

        return address.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Address> create(@Valid @RequestBody Address address, HttpServletResponse response) {
        Address savedAddress = addressRepository.save(address);

        publisher.publishEvent(new ResourceCreatedEvent(this, response, savedAddress.getId()));

        return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        addressRepository.deleteById(id);
    }
}
