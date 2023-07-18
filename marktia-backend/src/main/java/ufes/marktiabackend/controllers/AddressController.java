package ufes.marktiabackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ufes.marktiabackend.services.AddressService;

import java.util.List;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping("/states")
    public ResponseEntity<List<String>> getStates() {
        return ResponseEntity.ok(addressService.getStates());
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getCities(@RequestParam String state) {
        return ResponseEntity.ok(addressService.getCities(state));
    }
}
