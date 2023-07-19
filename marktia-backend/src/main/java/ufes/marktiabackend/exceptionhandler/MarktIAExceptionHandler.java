package ufes.marktiabackend.exceptionhandler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
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
import ufes.marktiabackend.exceptionhandler.custom.*;

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
        ex.printStackTrace();

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

    @ExceptionHandler({ RuntimeException.class })
    public ResponseEntity<Object> runtimeExceptionHandler(RuntimeException ex, WebRequest request) {
        ex.printStackTrace();

        String userMessage = messageSource.getMessage("resource.runtime-error", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler({ EmptyResultDataAccessException.class })
    public ResponseEntity<Object> handleEmptyResultDataAccessException(EmptyResultDataAccessException ex, WebRequest request) {

        String mensagemUsuario = messageSource.getMessage("resource.not-found", null, LocaleContextHolder.getLocale());
        String mensagemDesenvolvedor = ex.toString();
        List<Error> erros = List.of(new Error(mensagemUsuario, mensagemDesenvolvedor));

        return handleExceptionInternal(ex, erros, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler({ DataIntegrityViolationException.class })
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest request) {
        ex.printStackTrace();

        String userMessage = messageSource.getMessage("resource.operation-not-allowed", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ NonFinishedSchedulingException.class })
    public ResponseEntity<Object> handleNonFinishedSchedulingException(NonFinishedSchedulingException ex, WebRequest request) {
        ex.printStackTrace();

        String userMessage = messageSource.getMessage("resource.operation-not-allowed", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler({ MalformedJwtException.class })
    public ResponseEntity<Object> malformedJwtExceptionHandler(MalformedJwtException ex, WebRequest request) {
        String userMessage = messageSource.getMessage("resource.malformed-jwt", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler({ ExpiredJwtException.class })
    public ResponseEntity<Object> expiredJwtExceptionHandler(ExpiredJwtException ex, WebRequest request) {
        String userMessage = messageSource.getMessage("resource.expired-token", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler({CustomExpiredJwtException.class})
    public ResponseEntity<Object> customExpiredJwtExceptionHandler(CustomExpiredJwtException ex, WebRequest request) {
        String userMessage = messageSource.getMessage("resource.expired-token", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }

    @ExceptionHandler({ NonAvailableTokenException.class })
    public ResponseEntity<Object> handleNonAvailableTokenException(NonAvailableTokenException ex, WebRequest request) {
        String userMessage = messageSource.getMessage("resource.non-available-token", null, LocaleContextHolder.getLocale());
        String developerMessage = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
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

    @ExceptionHandler({InvalidSchedulingStatusUpdateException.class})
    public ResponseEntity<Object> handleInvalidSchedulingStatusUpdateException(InvalidSchedulingStatusUpdateException ex) {
        String userMessage = messageSource.getMessage(ex.getMessage(), null, LocaleContextHolder.getLocale());
        String developerMessage = ex.toString();
        List<MarktIAExceptionHandler.Error> errors = List.of(new MarktIAExceptionHandler.Error(userMessage, developerMessage));

        return ResponseEntity.badRequest().body(errors);
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
