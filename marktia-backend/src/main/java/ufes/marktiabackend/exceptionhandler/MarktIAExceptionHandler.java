package ufes.marktiabackend.exceptionhandler;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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

        String userMessage = messageSource.getMessage("mensagem.invalida", null, LocaleContextHolder.getLocale());
        String developerMessage = Optional.ofNullable(ex.getCause()).orElse(ex).toString();
        List<Error> errors = List.of(new Error(userMessage, developerMessage));

        return handleExceptionInternal(ex, errors, headers, HttpStatus.BAD_REQUEST, request);
    }

        public record Error(String userMessage, String developerMessage) {}
}
