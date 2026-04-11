package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("HANDWRAPS")
public class HandWrapsEntity extends BoxingGearEntity {
    private String brand;
    private double price;
    private boolean elastic; // true = Mexican style (stretch), false = Traditional

    public HandWrapsEntity() {}

    @JsonIgnore
    public HandWrapsEntity(String size, String brand, double price, boolean elastic) {
        super(size); // For wraps, size could be length, e.g., "180in"
        this.brand = brand;
        this.price = price;
        this.elastic = elastic;
    }

    @Override
    public void sellItem() {
        System.out.println("Selling HandWraps: " + brand + ", Size " + getSize() + " for $" + price);
    }

    @Override
    public Double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public boolean isElastic() { return elastic; }
    public void setElastic(boolean elastic) { this.elastic = elastic; }
}