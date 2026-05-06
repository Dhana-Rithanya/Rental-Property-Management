package com.rental.backend.service;

import com.rental.backend.model.User;
import com.rental.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String name, String email, String password, String role) {
        if (name == null || name.trim().isEmpty())
            throw new RuntimeException("Name is required");
        if (!EMAIL_PATTERN.matcher(email).matches())
            throw new RuntimeException("Invalid email format");
        if (!PASSWORD_PATTERN.matcher(password).matches())
            throw new RuntimeException("Password must be at least 8 characters with uppercase, lowercase, and a number");
        if (!role.equals("Tenant") && !role.equals("Owner"))
            throw new RuntimeException("Role must be Tenant or Owner");
        if (userRepository.existsByEmail(email))
            throw new RuntimeException("Email already in use");

        User user = new User();
        user.setName(name.trim());
        user.setEmail(email.toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        return userRepository.save(user);
    }

    public Optional<User> login(String email, String password) {
        if (email == null || password == null) return Optional.empty();
        return userRepository.findByEmail(email.toLowerCase())
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
}
