package ufes.marktiabackend.event;

import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class ResourceCreatedEvent extends ApplicationEvent {

    private HttpServletResponse response;
    private long id;

    public ResourceCreatedEvent(Object source, HttpServletResponse response, long id) {
        super(source);
        this.response = response;
        this.id = id;
    }

}
