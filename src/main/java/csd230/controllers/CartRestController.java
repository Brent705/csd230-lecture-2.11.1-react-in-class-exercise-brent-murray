package csd230.controllers;

import csd230.entities.CartEntity;
import csd230.entities.ProductEntity;
import csd230.repositories.CartEntityRepository;
import csd230.repositories.ProductEntityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rest/cart")
@CrossOrigin(origins = "*")
public class CartRestController {
    private final CartEntityRepository cartRepository;
    private final ProductEntityRepository productRepository;

    public CartRestController(CartEntityRepository cartRepository, ProductEntityRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    // Helper method to safely get or create a default cart
    private CartEntity getDefaultCart() {
        List<CartEntity> carts = cartRepository.findAll();
        if (carts.isEmpty()) {
            CartEntity newCart = new CartEntity();
            // Do NOT set the ID manually here; let the Database auto-generate it.
            return cartRepository.save(newCart);
        }
        return carts.get(0); // Return the first available cart
    }

    @GetMapping
    public CartEntity getCart() {
        return getDefaultCart();
    }

    @PostMapping("/add/{productId}")
    public CartEntity addToCart(@PathVariable Long productId) {
        CartEntity cart = getDefaultCart();
        ProductEntity product = productRepository.findById(productId).orElseThrow();
        cart.addProduct(product);
        return cartRepository.save(cart);
    }

    @DeleteMapping("/remove/{productId}")
    public CartEntity removeFromCart(@PathVariable Long productId) {
        CartEntity cart = getDefaultCart();
        ProductEntity product = productRepository.findById(productId).orElseThrow();
        cart.getProducts().remove(product);
        return cartRepository.save(cart);
    }
}