--liquibase formatted sql
--changeset urban:002-add-otp-procedure
--comment: Add OTP table and verification procedure

-- Create the _otp table
CREATE TABLE _otp (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(256) NOT NULL,
    otp VARCHAR(5) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP GENERATED ALWAYS AS (created_at + INTERVAL '1 minute') STORED
);
