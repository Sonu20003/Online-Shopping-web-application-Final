package com.coforge.project.shoppe.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.coforge.project.shoppe.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}