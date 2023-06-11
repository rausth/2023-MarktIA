package ufes.marktiabackend.controllers;

import jakarta.validation.Valid;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.requests.UserRequestDTO;
import ufes.marktiabackend.dtos.responses.UserResponseDTO;
import ufes.marktiabackend.exceptionhandler.MarktIAExceptionHandler;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.repositories.UserRepository;
import ufes.marktiabackend.services.UserService;
import ufes.marktiabackend.services.exception.NonExistentAddressException;
import ufes.marktiabackend.services.exception.NullAddressIdException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final MessageSource messageSource;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher publisher;

    public UserController(UserService userService, MessageSource messageSource, UserRepository userRepository, ApplicationEventPublisher publisher) {
        this.userService = userService;
        this.messageSource = messageSource;
        this.userRepository = userRepository;
        this.publisher = publisher;
    }

    @GetMapping("/{user-id}")
    public ResponseEntity<UserResponseDTO> getById(@PathVariable("user-id") String userId) {
        Optional<User> userOptional = userRepository.findById(Long.valueOf(userId));

        if (userOptional.isPresent()) {
            UserResponseDTO userDTO = userService.project(userOptional.get());
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
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
        userRepository.deleteById(Long.valueOf(userId));
    }

    @ExceptionHandler({ NonExistentAddressException.class })
    public ResponseEntity<Object> handleNonExistentAddressException(NonExistentAddressException ex) {
        String userMessage = messageSource.getMessage("resource.non-existent-address", null, LocaleContextHolder.getLocale());
        String developerMessage = ex.toString();
        List<MarktIAExceptionHandler.Error> errors = List.of(new MarktIAExceptionHandler.Error(userMessage, developerMessage));

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler({ NullAddressIdException.class })
    public ResponseEntity<Object> handleNullAddressIdException(NullAddressIdException ex) {
        String userMessage = messageSource.getMessage("resource.null-address-id", null, LocaleContextHolder.getLocale());
        String developerMessage = ex.toString();
        List<MarktIAExceptionHandler.Error> errors = List.of(new MarktIAExceptionHandler.Error(userMessage, developerMessage));

        return ResponseEntity.badRequest().body(errors);
    }
}
