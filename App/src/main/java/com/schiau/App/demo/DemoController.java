package com.schiau.App.demo;

import com.schiau.App.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class DemoController {
    private final UserService service;
    @GetMapping("")
    public ResponseEntity<String> role(){
        return ResponseEntity.ok(service.getRole().name());
    }
}
