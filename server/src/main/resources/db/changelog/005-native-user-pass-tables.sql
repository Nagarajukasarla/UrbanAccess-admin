-- Liquibase formatted sql
--changeset urban:005-native-user-pass-tables runOnChange:true splitStatements:false stripComments:false
--comment: Create tables for NativeUser and UserPass with Long type IDs

-- Create table for NativeUser
CREATE TABLE _native_user (
    id BIGSERIAL PRIMARY KEY,
    surname VARCHAR,
    lastname VARCHAR,
    date_of_birth VARCHAR,
    gender VARCHAR,
    guardian VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    aadhar VARCHAR,
    house_number VARCHAR,
    street VARCHAR,
    area VARCHAR,
    district VARCHAR,
    city VARCHAR,
    state VARCHAR,
    country VARCHAR,
    pincode VARCHAR,
    route jsonb,
    education jsonb,
    image_uri VARCHAR
);


-- Create table for UserPass
CREATE TABLE _user_pass (
    id BIGSERIAL PRIMARY KEY,
    native_user_id BIGINT NOT NULL,
    mrn VARCHAR,
    name VARCHAR,
    age INTEGER,
    gender VARCHAR,
    phone VARCHAR,
    validity VARCHAR,
    type VARCHAR,
    dob VARCHAR,
    status VARCHAR,
    division_id VARCHAR,
    admin_id VARCHAR,
    processed_at VARCHAR,
    CONSTRAINT fk_native_user FOREIGN KEY (native_user_id)
        REFERENCES _native_user (id)
);
