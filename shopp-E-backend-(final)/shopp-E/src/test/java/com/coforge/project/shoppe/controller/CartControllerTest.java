package com.coforge.project.shoppe.controller;

import com.coforge.project.shoppe.model.CartItem;
import com.coforge.project.shoppe.service.CartService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CartController.class)
class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CartService service;

    @Test
    void testAddToCart() throws Exception {
        CartItem item = new CartItem();
        item.setId(1L);
        item.setUserId(10L);
        item.setProductId(5L);

        when(service.addToCart(item)).thenReturn(item);

        mockMvc.perform(post("/api/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userId\":10, \"productId\":5}"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetCart() throws Exception {
        CartItem item = new CartItem();
        item.setId(1L);
        item.setUserId(10L);
        item.setProductId(5L);

        when(service.getCartForUser(10L)).thenReturn(Arrays.asList(item));

        mockMvc.perform(get("/api/cart").param("userId", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].productId").value(5));
    }
}
