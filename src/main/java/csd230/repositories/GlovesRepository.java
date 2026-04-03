package csd230.repositories;
import csd230.entities.GlovesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GlovesRepository extends JpaRepository<GlovesEntity, Long> {}