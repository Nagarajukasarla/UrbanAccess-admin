CREATE TABLE _admin (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    email VARCHAR(256) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    mobile VARCHAR(15),
    image VARCHAR(256),
    is_email_verified BOOLEAN,
    division_id BIGINT
); 