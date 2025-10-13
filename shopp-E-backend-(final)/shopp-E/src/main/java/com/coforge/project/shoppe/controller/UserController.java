package com.coforge.project.shoppe.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.coforge.project.shoppe.model.User;
import com.coforge.project.shoppe.repository.UserRepository;

import java.util.List;
import java.util.Optional;
// http://localhost:8088/product_db/api/users/register
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ GET all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ POST register a new user
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
//        if (userRepository.existsByEmail(user.getEmail())) {
//            return ResponseEntity.badRequest().body("Email already exists!");
//        }
//        User savedUser = userRepository.save(user);
//        return ResponseEntity.ok(savedUser);
//    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }
    
    // 🟡 Login
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email!");
        }

        User user = userOptional.get();

        // Simple password check (no encryption yet)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password!");
        }

        // Optional: You can choose what to return. For now, only success message.
        return ResponseEntity.ok("Login successful!");
    }
}
