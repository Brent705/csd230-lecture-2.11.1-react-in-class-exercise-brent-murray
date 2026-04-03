package csd230.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("MAGAZINE")
public class MagazineEntity extends PublicationEntity {
    private int orderQty;
    private LocalDateTime currentIssue;

    // Default constructor needed by JPA and Jackson
    public MagazineEntity() {}

    // Force Jackson to IGNORE this constructor and use the empty one + setters
    @JsonIgnore
    public MagazineEntity(String t, double p, int c, int o, LocalDateTime d) {
        super(t, p, c);
        this.orderQty = o;
        this.currentIssue = d;
    }

    public int getOrderQty() { return orderQty; }
    public void setOrderQty(int o) { this.orderQty = o; }

    public LocalDateTime getCurrentIssue() { return currentIssue; }
    public void setCurrentIssue(LocalDateTime d) { this.currentIssue = d; }

    @Override
    public String toString() {
        return "Mag{issue=" + currentIssue + ", " + super.toString() + "}";
    }
}