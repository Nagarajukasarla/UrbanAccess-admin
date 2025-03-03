package com.urban.server.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.urban.server.models.Route;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class RouteJsonConverter implements AttributeConverter<Route, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Route route) {
        if (route == null) return null;
        try {
            return objectMapper.writeValueAsString(route);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Route to JSON", e);
        }
    }

    @Override
    public Route convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) return null;
        try {
            return objectMapper.readValue(dbData, Route.class);
        } catch (Exception e) {
            throw new RuntimeException("Error converting JSON to Route", e);
        }
    }
}
