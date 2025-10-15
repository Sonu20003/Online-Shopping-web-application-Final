package com.coforge.project.shoppe.controller;

import com.coforge.project.shoppe.model.User;
import com.coforge.project.shoppe.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @Test
    void testRegisterUserSuccess() throws Exception {
        when(userRepository.existsByEmail("abc@gmail.com")).thenReturn(false);

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"abc@gmail.com\", \"password\":\"123\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully!"));
    }

    @Test
    void testRegisterUserEmailExists() throws Exception {
        when(userRepository.existsByEmail("abc@gmail.com")).thenReturn(true);

        mockMvc.perform(post("/api/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"abc@gmail.com\", \"password\":\"123\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testLoginSuccess() throws Exception {
        User user = new User();
        user.setEmail("abc@gmail.com");
        user.setPassword("123");

        when(userRepository.findByEmail("abc@gmail.com")).thenReturn(Optional.of(user));

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"abc@gmail.com\", \"password\":\"123\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string("Login successful!"));
    }

    @Test
    void testLoginInvalidPassword() throws Exception {
        User user = new User();
        user.setEmail("abc@gmail.com");
        user.setPassword("123");

        when(userRepository.findByEmail("abc@gmail.com")).thenReturn(Optional.of(user));

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"abc@gmail.com\", \"password\":\"wrong\"}"))
                .andExpect(status().isBadRequest());
    }
}
