package ufes.marktiabackend.exceptionhandler.custom;

public class NonFinishedSchedulingException extends RuntimeException {

    public NonFinishedSchedulingException(String message) {
        super(message);
    }

}
