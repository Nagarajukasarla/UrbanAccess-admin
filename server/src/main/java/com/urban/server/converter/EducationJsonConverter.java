package com.urban.server.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.urban.server.models.Education;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EducationJsonConverter implements AttributeConverter<Education, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Education education) {
        if (education == null) return null;
        try {
            return objectMapper.writeValueAsString(education);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Education to JSON", e);
        }
    }

    @Override
    public Education convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) return null;
        try {
            return objectMapper.readValue(dbData, Education.class);
        } catch (Exception e) {
            throw new RuntimeException("Error converting JSON to Education", e);
        }
    }
}
