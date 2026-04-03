package csd230.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping({
            "/",
            "/login",
            "/logout",
            "/inventory",
            "/add",
            "/magazines",
            "/add-magazine",
            "/gloves",
            "/add-gloves",
            "/shoes",
            "/add-shoes",
            "/cart"
    })
    public String forwardToSpa() {
        return "forward:/index.html";
    }
}