package csd230.repositories;

import csd230.entities.DiscMagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscMagEntityRepository extends JpaRepository<DiscMagEntity, Long> {
}