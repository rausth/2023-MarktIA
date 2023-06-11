package ufes.marktiabackend.enums;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Objects;

@RequiredArgsConstructor
public enum SchedulingStatus {
    OPENED(0),
    DELIVERED(1),
    FINISHED(2);

    private final Integer value;

    public static SchedulingStatus fromInteger(Integer value) throws IllegalArgumentException {
        return Arrays.stream(SchedulingStatus.values())
                .filter(schedulingStatus -> Objects.equals(schedulingStatus.value, value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Não foi encontrado um SchedulingStatus cujo valor seja: " + value));
    }

    public Integer getValue() {
        return value;
    }
}
