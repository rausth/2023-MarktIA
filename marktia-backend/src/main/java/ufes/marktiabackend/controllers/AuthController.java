package ufes.marktiabackend.controllers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.auth.AuthRequestDTO;
import ufes.marktiabackend.dtos.requests.auth.RegisterRequestDTO;
import ufes.marktiabackend.dtos.responses.user.UserAuthResponseDTO;
import ufes.marktiabackend.services.auth.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody @Valid AuthRequestDTO authRequestDTO) {
        return ResponseEntity.ok(authService.authenticate(authRequestDTO));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequestDTO registerRequestDTO) {
        authService.register(registerRequestDTO);

        return ResponseEntity.ok("Usuário criado com sucesso.");
    }

    @GetMapping("/user")
    public ResponseEntity<UserAuthResponseDTO> getUserFromToken(@RequestParam @NotBlank String token) {
        return ResponseEntity.ok(authService.getUserFromToken(token));
    }
}
