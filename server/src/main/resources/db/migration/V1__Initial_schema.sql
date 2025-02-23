CREATE TABLE _admin (
    id BIGSERIAL PRIMARY KEY,
    division_id BIGINT,
    email VARCHAR(256) NOT NULL UNIQUE,
    image VARCHAR(255),
    is_email_verified BOOLEAN,
    mobile VARCHAR(255),
    name VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    role VARCHAR(255) CHECK (role IN ('ADMIN','OWNER'))
);

CREATE TABLE _auth_token (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked BOOLEAN NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    admin_id BIGINT NOT NULL REFERENCES _admin(id)
);