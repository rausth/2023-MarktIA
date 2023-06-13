package ufes.marktiabackend.filters.schedulingsfilter;

import lombok.Builder;

@Builder
public record SchedulingsFilter(String userId, Boolean asConsumer, Integer schedulingStatus) { }
