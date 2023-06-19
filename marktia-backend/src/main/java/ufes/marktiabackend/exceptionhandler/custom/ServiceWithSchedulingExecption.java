package ufes.marktiabackend.exceptionhandler.custom;

public class ServiceWithSchedulingExecption extends RuntimeException {

    public ServiceWithSchedulingExecption(String message) {
        super(message);
    }
}
