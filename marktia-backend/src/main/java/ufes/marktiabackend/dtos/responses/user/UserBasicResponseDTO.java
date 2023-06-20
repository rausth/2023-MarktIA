package ufes.marktiabackend.dtos.responses.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserBasicResponseDTO {
    private String id;

    private String name;

    private String imageURL;
}
