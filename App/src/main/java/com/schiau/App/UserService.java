package com.schiau.App;

import com.schiau.App.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    public Role getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Role) authentication.getCredentials();
    }
}
