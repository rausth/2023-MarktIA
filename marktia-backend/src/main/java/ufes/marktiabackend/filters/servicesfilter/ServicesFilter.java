package ufes.marktiabackend.filters.servicesfilter;

import lombok.Builder;

@Builder
public record ServicesFilter(String providerId, String name, Integer type, String stateId, String regionId, String countyId) { }
