package ufes.marktiabackend.configs.doc;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {
    @Bean
    public OpenAPI gestorCidadaoOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("MarktIA API")
                                .description("API do Sistema MartkIA")
                                .version("v0.0.1")
                                .license(
                                        new License()
                                                .name("Apache 2.0")
                                                .url("https://springdoc.org")
                                )
                );
    }
}
