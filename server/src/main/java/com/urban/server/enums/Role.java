package com.urban.server.enums;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("Admin"),
    OWNER("Owner");

    private final String roleName;

    Role(String roleName) {
        this.roleName = roleName;
    }
}
