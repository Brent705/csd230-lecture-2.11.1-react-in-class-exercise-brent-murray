package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("GLOVES")
public class GlovesEntity extends BoxingGearEntity {
    private String brand;

    @Column(name = "gloves_price")
    private double price;

    @Column(name = "weight_oz")
    private int weightOz;

    public GlovesEntity() {
    }

    @JsonIgnore
    public GlovesEntity(String size, String brand, double price, int weightOz) {
        super(size);
        this.brand = brand;
        this.price = price;
        this.weightOz = weightOz;
    }

    @Override
    public void sellItem() {
        System.out.println("Selling Boxing Gloves: " + brand + " " + weightOz + "oz, Size " + getSize() + " for $" + price);
    }

    @Override
    public Double getPrice() {
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

    public int getWeightOz() {
        return weightOz;
    }

    public void setWeightOz(int weightOz) {
        this.weightOz = weightOz;
    }

    @Override
    public String toString() {
        return "GlovesEntity{brand='" + brand + "', price=" + price + ", weightOz=" + weightOz + ", " + super.toString() + "}";
    }
}