package ufes.marktiabackend.exceptionhandler;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ControllerAdvice
public class MarktIAExceptionHandler extends ResponseEntityExceptionHandler {

    private final MessageSource messageSource;

    public MarktIAExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {

        String userMessage = messageSource.getMessage("invalid.message", null, LocaleContextHolder.getLocale());
        String developerMessage = Optional.ofNullable(ex.getCause()).orElse(ex).toString();
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, headers, HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {

        List<Error> errors = createErrorList(ex.getBindingResult());

        return handleExceptionInternal(ex, errors, headers, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ DataIntegrityViolationException.class })
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest request) {
        String userMessage = messageSource.getMessage("resource.operation-not-allowed", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    private List<Error> createErrorList(BindingResult bindingResult) {
        List<Error> errors = new ArrayList<>();

        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            String userMessage = messageSource.getMessage(fieldError, LocaleContextHolder.getLocale());
            String developerMessage = fieldError.toString();

            errors.add(new Error(userMessage, developerMessage));
        }

        return errors;
    }

    public record Error(String userMessage, String developerMessage) {}
}
