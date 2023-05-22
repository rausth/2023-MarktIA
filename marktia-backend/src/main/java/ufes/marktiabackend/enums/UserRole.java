package ufes.marktiabackend.enums;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Objects;

@RequiredArgsConstructor
public enum UserRole {
    NORMAL(0),
    PRESTADOR(1);

    private final Integer value;

    public static UserRole fromInteger(Integer value) throws IllegalArgumentException {
        return Arrays.stream(UserRole.values())
                .filter(userRole -> Objects.equals(userRole.value, value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Não foi encontrado um UserRole cujo valor seja: " + value));
    }

    public Integer getValue() {
        return value;
    }
}
