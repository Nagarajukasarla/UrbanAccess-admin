package com.urban.server.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.urban.server.dto.NativeUserDto;
import com.urban.server.dto.UserPassDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class PassApplicationRequest {
    @JsonProperty("user")
    public NativeUserDto nativeUserDto;

    @JsonProperty("pass")
    public UserPassDto userPassDto;
}
