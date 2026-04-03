package csd230.repositories;
import csd230.entities.ShoesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoesRepository extends JpaRepository<ShoesEntity, Long> {}