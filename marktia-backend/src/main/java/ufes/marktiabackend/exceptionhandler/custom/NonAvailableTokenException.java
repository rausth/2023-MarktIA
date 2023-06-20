package ufes.marktiabackend.exceptionhandler.custom;

public class NonAvailableTokenException extends RuntimeException {
    public NonAvailableTokenException(String message) {
        super(message);
    }
}
