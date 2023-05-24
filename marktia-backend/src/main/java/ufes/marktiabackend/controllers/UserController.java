package ufes.marktiabackend.controllers;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ufes.marktiabackend.dtos.UserDTO;
import ufes.marktiabackend.event.ResourceCreatedEvent;
import ufes.marktiabackend.exceptionhandler.MarktIAExceptionHandler;
import ufes.marktiabackend.entities.User;
import ufes.marktiabackend.repositories.UserRepository;
import ufes.marktiabackend.services.UserService;
import ufes.marktiabackend.services.exception.NonExistentAddressException;
import ufes.marktiabackend.services.exception.NullAddressIdException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
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

    @GetMapping
    public List<UserDTO> list() {
        return userRepository.resume();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> searchById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            UserDTO userDTO = userService.project(userOptional.get());
            return ResponseEntity.ok(userDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<UserDTO> create(@Valid @RequestBody User user, HttpServletResponse response) {
        UserDTO savedUser = userService.verifyAndSave(user);

        publisher.publishEvent(new ResourceCreatedEvent(this, response, savedUser.getId()));

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remove(@PathVariable Long id) {
        userRepository.deleteById(id);
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
