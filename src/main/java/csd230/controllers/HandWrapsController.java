package csd230.controllers;

import csd230.entities.HandWrapsEntity;
import csd230.repositories.HandWrapsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rest/handwraps")
@CrossOrigin(origins = "*")
public class HandWrapsController {
    private final HandWrapsRepository handWrapsRepository;

    public HandWrapsController(HandWrapsRepository handWrapsRepository) { this.handWrapsRepository = handWrapsRepository; }

    @GetMapping
    public List<HandWrapsEntity> getAll() { return handWrapsRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<HandWrapsEntity> getById(@PathVariable Long id) {
        return handWrapsRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public HandWrapsEntity create(@RequestBody HandWrapsEntity item) { return handWrapsRepository.save(item); }

    @PutMapping("/{id}")
    public ResponseEntity<HandWrapsEntity> update(@PathVariable Long id, @RequestBody HandWrapsEntity details) {
        return handWrapsRepository.findById(id).map(item -> {
            item.setSize(details.getSize());
            item.setBrand(details.getBrand());
            item.setPrice(details.getPrice());
            item.setElastic(details.isElastic());
            return ResponseEntity.ok(handWrapsRepository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (handWrapsRepository.existsById(id)) { handWrapsRepository.deleteById(id); return ResponseEntity.ok().build(); }
        return ResponseEntity.notFound().build();
    }
}