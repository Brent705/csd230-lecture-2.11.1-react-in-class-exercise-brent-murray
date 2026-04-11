package csd230.repositories;
import csd230.entities.HandWrapsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HandWrapsRepository extends JpaRepository<HandWrapsEntity, Long> {}