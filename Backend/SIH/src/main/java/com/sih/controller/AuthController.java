package com.sih.controller;

import com.sih.model.User;
import com.sih.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        // Simulate phone number-based login. In a real app, this would involve OTP verification.
        return userService.getUserByPhone(phone)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (userService.getUserByPhone(user.getPhone()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        user.setTotalTrips(0);
        user.setTotalSpent(0.0);
        User newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    }
}
