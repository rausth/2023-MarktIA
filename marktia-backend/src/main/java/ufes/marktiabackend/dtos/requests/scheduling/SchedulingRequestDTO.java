package ufes.marktiabackend.dtos.requests.scheduling;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchedulingRequestDTO {

    @NotNull
    private String serviceId;

    @NotNull
    private String consumerId;
}
