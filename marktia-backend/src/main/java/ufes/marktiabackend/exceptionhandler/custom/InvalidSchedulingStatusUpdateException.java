package ufes.marktiabackend.exceptionhandler.custom;

public class InvalidSchedulingStatusUpdateException extends RuntimeException {
    public InvalidSchedulingStatusUpdateException(String message) {
        super(message);
    }
}
