package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

/**
 * JPA Entity for boxing shoes.
 */
@Entity
@DiscriminatorValue("SHOES")
public class ShoesEntity extends BoxingGearEntity {
    private String brand;

    @Column(name = "shoes_price")
    private double price;

    @Column(name = "high_top")
    private boolean highTop;

    public ShoesEntity() {
    }

    @JsonIgnore
    public ShoesEntity(String size, String brand, double price, boolean highTop) {
        super(size);
        this.brand = brand;
        this.price = price;
        this.highTop = highTop;
    }

    @Override
    public void sellItem() {
        String type = highTop ? "High-Top" : "Low-Top";
        System.out.println("Selling Boxing Shoes: " + brand + " " + type + ", Size " + getSize() + " for $" + price);
    }

    @Override
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public boolean isHighTop() {
        return highTop;
    }

    public void setHighTop(boolean highTop) {
        this.highTop = highTop;
    }

    @Override
    public String toString() {
        return "ShoesEntity{brand='" + brand + "', price=" + price + ", highTop=" + highTop + ", " + super.toString() + "}";
    }
}