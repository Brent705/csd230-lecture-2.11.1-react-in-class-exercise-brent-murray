package csd230.controllers;

import csd230.entities.HeadgearEntity;
import csd230.repositories.HeadgearRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rest/headgear")
@CrossOrigin(origins = "*")
public class HeadgearController {
    private final HeadgearRepository headgearRepository;

    public HeadgearController(HeadgearRepository headgearRepository) { this.headgearRepository = headgearRepository; }

    @GetMapping
    public List<HeadgearEntity> getAll() { return headgearRepository.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<HeadgearEntity> getById(@PathVariable Long id) {
        return headgearRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public HeadgearEntity create(@RequestBody HeadgearEntity item) { return headgearRepository.save(item); }

    @PutMapping("/{id}")
    public ResponseEntity<HeadgearEntity> update(@PathVariable Long id, @RequestBody HeadgearEntity details) {
        return headgearRepository.findById(id).map(item -> {
            item.setSize(details.getSize());
            item.setBrand(details.getBrand());
            item.setPrice(details.getPrice());
            item.setType(details.getType());
            return ResponseEntity.ok(headgearRepository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (headgearRepository.existsById(id)) { headgearRepository.deleteById(id); return ResponseEntity.ok().build(); }
        return ResponseEntity.notFound().build();
    }
}