package csd230.controllers;

import csd230.entities.DiscMagEntity;
import csd230.repositories.DiscMagRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discmags")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite React App
public class DiscMagController {

    private final DiscMagRepository discMagRepository;

    public DiscMagController(DiscMagRepository discMagRepository) {
        this.discMagRepository = discMagRepository;
    }

    // GET all discmags
    @GetMapping
    public List<DiscMagEntity> getAllDiscMags() {
        return discMagRepository.findAll();
    }

    // GET single discmag
    @GetMapping("/{id}")
    public ResponseEntity<DiscMagEntity> getDiscMagById(@PathVariable Long id) {
        return discMagRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST create discmag
    @PostMapping
    public DiscMagEntity createDiscMag(@RequestBody DiscMagEntity discMag) {
        return discMagRepository.save(discMag);
    }

    // PUT update discmag
    @PutMapping("/{id}")
    public ResponseEntity<DiscMagEntity> updateDiscMag(@PathVariable Long id, @RequestBody DiscMagEntity discMagDetails) {
        return discMagRepository.findById(id).map(discMag -> {
            // Inherited from PublicationEntity
            discMag.setTitle(discMagDetails.getTitle());
            discMag.setPrice(discMagDetails.getPrice());
            discMag.setCopies(discMagDetails.getCopies());

            // Inherited from MagazineEntity
            discMag.setOrderQty(discMagDetails.getOrderQty());
            discMag.setCurrentIssue(discMagDetails.getCurrentIssue());

            // Specific to DiscMagEntity
            discMag.setHasDisc(discMagDetails.isHasDisc());

            return ResponseEntity.ok(discMagRepository.save(discMag));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE discmag
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscMag(@PathVariable Long id) {
        if (discMagRepository.existsById(id)) {
            discMagRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}