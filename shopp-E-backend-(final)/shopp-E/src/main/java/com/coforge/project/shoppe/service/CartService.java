package com.coforge.project.shoppe.service;
import com.coforge.project.shoppe.model.CartItem;
import com.coforge.project.shoppe.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartItemRepository repo;

    public CartService(CartItemRepository repo) {
        this.repo = repo;
    }

    public CartItem addToCart(CartItem item) {
        // simple logic: you can expand to merge quantities if same product exists
        return repo.save(item);
    }

    public List<CartItem> getCartForUser(Long userId) {
        return repo.findByUserId(userId);
    }

    public void remove(Long id) {
        repo.deleteById(id);
    }

    public Optional<CartItem> findById(Long id) {
        return repo.findById(id);
    }
}