package com.coforge.project.shoppe.controller;
import com.coforge.project.shoppe.model.CartItem;
import com.coforge.project.shoppe.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200") // adjust for your frontend origin
public class CartController {
    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    // add to cart
    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem item) {
        if (item.getUserId() == null || item.getProductId() == null) {
            return ResponseEntity.badRequest().build();
        }
        CartItem saved = service.addToCart(item);
        return ResponseEntity.ok(saved);
    }

    // get cart items for user
    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@RequestParam Long userId) {
        List<CartItem> items = service.getCartForUser(userId);
        return ResponseEntity.ok(items);
    }

    // remove item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remove(@PathVariable Long id) {
        service.remove(id);
        return ResponseEntity.noContent().build();
    }
}