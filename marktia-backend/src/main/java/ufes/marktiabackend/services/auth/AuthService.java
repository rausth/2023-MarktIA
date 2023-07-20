package ufes.marktiabackend.services.auth;

import io.jsonwebtoken.MalformedJwtException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ufes.marktiabackend.dtos.requests.auth.AuthRequestDTO;
import ufes.marktiabackend.dtos.requests.auth.RegisterRequestDTO;
import ufes.marktiabackend.dtos.responses.user.UserAuthResponseDTO;
import ufes.marktiabackend.entities.Address;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.enums.UserRole;
import ufes.marktiabackend.exceptionhandler.custom.CustomExpiredJwtException;
import ufes.marktiabackend.repositories.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    private final JWTService jwtService;
    private final UserRepository userRepository;

    public String authenticate(AuthRequestDTO authRequestDTO) {
        Optional<User> user = userRepository.findByEmail(authRequestDTO.getEmail());

        if (user.isEmpty() || !passwordEncoder.matches(authRequestDTO.getPassword(), user.get().getPassword())) {
            throw new EntityNotFoundException("Usuário com as credenciais fornecidas não encontrado.");
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequestDTO.getEmail(),
                            authRequestDTO.getPassword())
            );
        } catch (AuthenticationException e) {
            e.printStackTrace();
        }

        return jwtService.generateToken(user.get());
    }

    public void register(RegisterRequestDTO registerRequestDTO) {
        Address address = Address.builder()
                .state(registerRequestDTO.getAddress().getState())
                .city(registerRequestDTO.getAddress().getCity())
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
                .cnpj((registerRequestDTO.getCnpj() != null && !registerRequestDTO.getCnpj().isBlank()) ? registerRequestDTO.getCnpj() : null)
                .telephone(registerRequestDTO.getTelephone())
                .address(address)
                .imageUrl((registerRequestDTO.getImageURL() != null && !registerRequestDTO.getImageURL().isBlank()) ? registerRequestDTO.getImageURL() : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png")
                .build();

        userRepository.save(user);
    }

    public UserAuthResponseDTO getUserFromToken(String token) {
        if (jwtService.isTokenExpired(token)) {
            throw new CustomExpiredJwtException("Token expirado.");
        }

        String subject = jwtService.getSubject(token);
        if (subject != null && SecurityContextHolder.getContext().getAuthentication() != null) {
            User user = userRepository.findByEmail(subject)
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado."));

            return UserAuthResponseDTO.builder()
                    .id(user.getId().toString())
                    .name(user.getName())
                    .userRole(user.getUserRole().getValue())
                    .build();
        } else {
            throw new MalformedJwtException("Token inválido");
        }
    }
}
