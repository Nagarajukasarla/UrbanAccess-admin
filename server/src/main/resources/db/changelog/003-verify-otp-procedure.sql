--liquibase formatted sql
--changeset urban:003-verify-otp-procedure splitStatements:false stripComments:false
--comment: Convert OTP verification function to procedure with OUT parameter

CREATE OR REPLACE PROCEDURE verify_otp(
    IN p_email VARCHAR,
    IN p_otp VARCHAR,
    OUT is_valid BOOLEAN
) AS $$
BEGIN
    -- Check if OTP exists and is not expired
SELECT COUNT(*) > 0 INTO is_valid
FROM _otp
WHERE email = p_email
  AND otp = p_otp
  AND expires_at > CURRENT_TIMESTAMP;

IF is_valid THEN
        -- Delete the used OTP
DELETE FROM _otp
WHERE email = p_email AND otp = p_otp;
END IF;
END;
$$ LANGUAGE plpgsql;
