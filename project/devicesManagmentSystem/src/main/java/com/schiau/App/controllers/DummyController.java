package com.schiau.App.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DummyController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
