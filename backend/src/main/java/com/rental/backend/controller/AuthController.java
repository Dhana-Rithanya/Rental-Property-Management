package com.rental.backend.controller;

import com.rental.backend.model.User;
import com.rental.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body, HttpServletRequest request) {
        try {
            User user = authService.register(
                body.get("name"),
                body.get("email"),
                body.get("password"),
                body.get("role")
            );
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getId());
            session.setAttribute("userRole", user.getRole());
            session.setMaxInactiveInterval(86400);
            return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body, HttpServletRequest request) {
        Optional<User> user = authService.login(body.get("email"), body.get("password"));
        if (user.isPresent()) {
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.get().getId());
            session.setAttribute("userRole", user.get().getRole());
            session.setMaxInactiveInterval(86400);
            return ResponseEntity.ok(Map.of(
                "id", user.get().getId(),
                "name", user.get().getName(),
                "email", user.get().getEmail(),
                "role", user.get().getRole()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null)
            return ResponseEntity.status(401).body(Map.of("error", "Not logged in"));
        return ResponseEntity.ok(Map.of(
            "userId", userId,
            "role", session.getAttribute("userRole")
        ));
    }
}
