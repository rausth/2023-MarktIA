package ufes.marktiabackend.event.listener;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ufes.marktiabackend.event.ResourceCreatedEvent;

import java.net.URI;

@Component
public class ResouceCreatedListener implements ApplicationListener<ResourceCreatedEvent> {

    @Override
    public void onApplicationEvent(ResourceCreatedEvent event) {
        HttpServletResponse response = event.getResponse();
        Long id = event.getId();

        setHeaderLocation(id, response);
    }

    private void setHeaderLocation(Long id, HttpServletResponse response) {
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(id).toUri();
        response.setHeader("Location", uri.toASCIIString());
    }
}
