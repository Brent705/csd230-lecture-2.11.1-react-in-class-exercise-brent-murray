package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;

@Entity
public abstract class BoxingGearEntity extends ProductEntity {
    private String size;

    public BoxingGearEntity() {
    }

    @JsonIgnore
    public BoxingGearEntity(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    @Override
    public String toString() {
        return "BoxingGearEntity{size='" + size + "', " + super.toString() + "}";
    }
}