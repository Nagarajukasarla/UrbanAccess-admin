-- Liquibase changelog for Urban Access Server
--liquibase formatted sql
--changeset urban:001-initial-schema
--comment: Initial database schema

-- Create the _admin table
CREATE TABLE _admin (
    id BIGSERIAL PRIMARY KEY,
    firstname VARCHAR(256),
    lastname VARCHAR(256),
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    mobile VARCHAR(15),
    image VARCHAR(256),
    is_email_verified BOOLEAN DEFAULT FALSE,
    role VARCHAR(10),
    division_id BIGINT
);

-- Create the _auth_token table
CREATE TABLE _auth_token (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    revoked BOOLEAN NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    admin_id BIGINT NOT NULL REFERENCES _admin(id)
);
