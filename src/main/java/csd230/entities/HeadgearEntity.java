package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("HEADGEAR")
public class HeadgearEntity extends BoxingGearEntity {
    private String brand;
    private double price;
    private String type; // e.g., "Face Saver", "Open Face"

    public HeadgearEntity() {}

    @JsonIgnore
    public HeadgearEntity(String size, String brand, double price, String type) {
        super(size);
        this.brand = brand;
        this.price = price;
        this.type = type;
    }

    @Override
    public void sellItem() {
        System.out.println("Selling Headgear: " + brand + " " + type + ", Size " + getSize() + " for $" + price);
    }

    @Override
    public Double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}