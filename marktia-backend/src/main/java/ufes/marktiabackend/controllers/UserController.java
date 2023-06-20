package ufes.marktiabackend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.UserRequestDTO;
import ufes.marktiabackend.dtos.responses.AddressResponseDTO;
import ufes.marktiabackend.dtos.responses.user.UserResponseDTO;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.repositories.UserRepository;
import ufes.marktiabackend.services.UserService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/{user-id}")
    public ResponseEntity<UserResponseDTO> getById(@PathVariable("user-id") String userId) {
        Optional<User> userOptional = userRepository.findById(Long.valueOf(userId));

        if (userOptional.isPresent()) {
            UserResponseDTO userDTO = userService.project(userOptional.get());
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{user-id}/address")
    public ResponseEntity<AddressResponseDTO> getAddress(@PathVariable("user-id") String userId) {
        return ResponseEntity.ok(userService.getAddress(userId));
    }

    @PutMapping("/{user-id}")
    public ResponseEntity<UserResponseDTO> update(
            @PathVariable("user-id") String userId,
            @RequestBody @Valid UserRequestDTO userRequestDTO
    ) {
        return ResponseEntity.ok(userService.update(userId, userRequestDTO));
    }

    @DeleteMapping("/{user-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("user-id") String userId) {
        userService.deleteById(userId);
    }
}
