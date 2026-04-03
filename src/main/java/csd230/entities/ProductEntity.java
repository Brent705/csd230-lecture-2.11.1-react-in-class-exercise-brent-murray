package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import csd230.pojos.SaleableItem;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "products")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING)
public abstract class ProductEntity implements Serializable, SaleableItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToMany(mappedBy = "products")
    private Set<CartEntity> carts = new HashSet<>();

    public Set<CartEntity> getCarts() {
        return carts;
    }

    public void setCarts(Set<CartEntity> carts) {
        this.carts = carts;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public abstract void sellItem();
    public abstract Double getPrice();

    @Override
    public String toString() {
        return "ProductEntity{" +
                "id=" + id +
                "} : "+super.toString();
    }

    public String getProductType() {
        return this.getClass().getSimpleName();
    }

    // FIXED: Safely detaches this product from all carts before deletion
    // preventing 500 Foreign Key Constraint errors.
    @PreRemove
    private void removeProductFromCarts() {
        for (CartEntity cart : carts) {
            cart.getProducts().remove(this);
        }
    }
}