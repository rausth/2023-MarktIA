package ufes.marktiabackend.exceptionhandler.custom;

public class CustomExpiredJwtException extends RuntimeException {
    public CustomExpiredJwtException(String message) {
        super(message);
    }
}
