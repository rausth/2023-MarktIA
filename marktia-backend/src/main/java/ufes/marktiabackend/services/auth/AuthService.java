package ufes.marktiabackend.services.auth;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.auth.AuthRequestDTO;
import ufes.marktiabackend.dtos.requests.auth.RegisterRequestDTO;
import ufes.marktiabackend.dtos.responses.auth.AuthResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.Federation;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.UserRole;
import ufes.marktiabackend.repositories.UserRepository;
import ufes.marktiabackend.services.FederationService;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final FederationService federationService;

    private final JWTService jwtService;
    private final UserRepository userRepository;

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        Federation federation = federationService.getByCounty(Long.valueOf(registerRequestDTO.getAddress().getCountyId()));

        Address address = Address.builder()
                .federation(federation)
                .district(registerRequestDTO.getAddress().getDistrict())
                .publicPlace(registerRequestDTO.getAddress().getPublicPlace())
                .number(registerRequestDTO.getAddress().getNumber())
                .complement(registerRequestDTO.getAddress().getComplement())
                .build();

        User user = User.builder()
                .userRole(UserRole.fromInteger(registerRequestDTO.getUserRole()))
                .name(registerRequestDTO.getName())
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .cpf(registerRequestDTO.getCpf())
                .cnpj(registerRequestDTO.getCnpj())
                .telephone(registerRequestDTO.getTelephone())
                .address(address)
                .imageUrl(registerRequestDTO.getImageURL())
                .build();

        userRepository.save(user);

        return AuthResponseDTO.builder()
                .id(user.getId().toString())
                .name(user.getName())
                .token(jwtService.generateToken(user))
                .build();
    }

    public AuthResponseDTO authenticate(AuthRequestDTO authRequestDTO) {
        User user = userRepository.findByEmail(authRequestDTO.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Usuário com as credenciais fornecidas não encontrado."));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequestDTO.getEmail(),
                            authRequestDTO.getPassword())
            );
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }

        return AuthResponseDTO.builder()
                .id(user.getId().toString())
                .name(user.getName())
                .token(jwtService.generateToken(user))
                .build();
    }
}
