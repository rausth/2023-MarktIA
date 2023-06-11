package ufes.marktiabackend.enums;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Objects;

@RequiredArgsConstructor
public enum ServiceType {
    DESIGN_GRAFICO(0),
    MARKETING_DIGITAL(1),
    REDACAO_TRADUCAO(2),
    VIDEO_ANIMACAO(3),
    MUSICA_AUDIO(4),
    PROGRAMACAO_TECNOLOGIA(5),
    FOTOGRAFIA(6),
    NEGOCIOS(7),
    SERVICOS_IA(8);

    private final Integer value;

    public static ServiceType fromInteger(Integer value) throws IllegalArgumentException {
        return Arrays.stream(ServiceType.values())
                .filter(serviceType -> Objects.equals(serviceType.value, value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Não foi encontrado um ServiceType cujo valor seja: " + value));
    }

    public Integer getValue() {
        return value;
    }
}
