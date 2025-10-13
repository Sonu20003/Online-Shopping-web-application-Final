package com.coforge.project.shoppe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.coforge.project.shoppe.model.Product;
import com.coforge.project.shoppe.repository.ProductRepository;

import java.util.List;


// http://localhost:8088/product_db/api/products

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Allow requests from any origin
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // GET all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}