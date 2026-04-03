package csd230.controllers;

import csd230.entities.ShoesEntity;
import csd230.repositories.ShoesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rest/shoes") // FIXED: Added /rest
@CrossOrigin(origins = "*") // FIXED: Allow all origins
public class ShoesController {

    private final ShoesRepository shoesRepository;

    public ShoesController(ShoesRepository shoesRepository) {
        this.shoesRepository = shoesRepository;
    }

    @GetMapping
    public List<ShoesEntity> getAllShoes() {
        return shoesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShoesEntity> getShoesById(@PathVariable Long id) {
        return shoesRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ShoesEntity createShoes(@RequestBody ShoesEntity shoes) {
        return shoesRepository.save(shoes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShoesEntity> updateShoes(@PathVariable Long id, @RequestBody ShoesEntity shoesDetails) {
        return shoesRepository.findById(id).map(shoes -> {
            shoes.setSize(shoesDetails.getSize());
            shoes.setBrand(shoesDetails.getBrand());
            shoes.setPrice(shoesDetails.getPrice());
            shoes.setHighTop(shoesDetails.isHighTop());
            return ResponseEntity.ok(shoesRepository.save(shoes));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShoes(@PathVariable Long id) {
        if (shoesRepository.existsById(id)) {
            shoesRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}