package csd230.controllers;

import csd230.entities.DiscMagEntity;
import csd230.repositories.DiscMagEntityRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "DiscMag REST API", description = "JSON API for managing disc magazines")
@RestController
@RequestMapping("/api/rest/discmags")
@CrossOrigin(origins = "*") // Allows your Vite React app to access this
public class DiscMagRestController {

    private final DiscMagEntityRepository discMagRepository;

    public DiscMagRestController(DiscMagEntityRepository discMagRepository) {
        this.discMagRepository = discMagRepository;
    }

    @Operation(summary = "Get all disc magazines as JSON")
    @GetMapping
    public List<DiscMagEntity> all() {
        return discMagRepository.findAll();
    }

    @Operation(summary = "Get a single disc magazine by ID")
    @GetMapping("/{id}")
    public DiscMagEntity getDiscMag(@PathVariable Long id) {
        return discMagRepository.findById(id).orElseThrow();
    }

    @Operation(summary = "Create a new disc magazine")
    @PostMapping
    public DiscMagEntity newDiscMag(@RequestBody DiscMagEntity newDiscMag) {
        return discMagRepository.save(newDiscMag);
    }

    @Operation(summary = "Update or Replace a disc magazine")
    @PutMapping("/{id}")
    public DiscMagEntity replaceDiscMag(@RequestBody DiscMagEntity newMag, @PathVariable Long id) {
        return discMagRepository.findById(id)
                .map(mag -> {
                    // Inherited from PublicationEntity
                    mag.setTitle(newMag.getTitle());
                    mag.setPrice(newMag.getPrice());
                    mag.setCopies(newMag.getCopies());

                    // Inherited from MagazineEntity
                    mag.setOrderQty(newMag.getOrderQty());
                    mag.setCurrentIssue(newMag.getCurrentIssue());

                    // Specific to DiscMagEntity
                    mag.setHasDisc(newMag.isHasDisc());

                    return discMagRepository.save(mag);
                })
                .orElseGet(() -> {
                    newMag.setId(id);
                    return discMagRepository.save(newMag);
                });
    }

    @Operation(summary = "Delete a disc magazine")
    @DeleteMapping("/{id}")
    public void deleteDiscMag(@PathVariable Long id) {
        discMagRepository.deleteById(id);
    }
}