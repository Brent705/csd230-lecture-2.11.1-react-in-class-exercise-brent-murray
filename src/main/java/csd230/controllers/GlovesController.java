package csd230.controllers;

import csd230.entities.GlovesEntity;
import csd230.repositories.GlovesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gloves")
@CrossOrigin(origins = "http://localhost:5173")
public class GlovesController {

    private final GlovesRepository glovesRepository;

    public GlovesController(GlovesRepository glovesRepository) {
        this.glovesRepository = glovesRepository;
    }

    @GetMapping
    public List<GlovesEntity> getAllGloves() {
        return glovesRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GlovesEntity> getGlovesById(@PathVariable Long id) {
        return glovesRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GlovesEntity createGloves(@RequestBody GlovesEntity gloves) {
        return glovesRepository.save(gloves);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GlovesEntity> updateGloves(@PathVariable Long id, @RequestBody GlovesEntity glovesDetails) {
        return glovesRepository.findById(id).map(gloves -> {
            gloves.setSize(glovesDetails.getSize()); // Inherited
            gloves.setBrand(glovesDetails.getBrand());
            gloves.setPrice(glovesDetails.getPrice());
            gloves.setWeightOz(glovesDetails.getWeightOz());
            return ResponseEntity.ok(glovesRepository.save(gloves));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGloves(@PathVariable Long id) {
        if (glovesRepository.existsById(id)) {
            glovesRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}