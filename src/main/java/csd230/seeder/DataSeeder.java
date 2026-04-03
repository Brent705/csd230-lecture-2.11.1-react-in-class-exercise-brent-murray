package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.BookRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.GlovesRepository;
import csd230.repositories.ShoesRepository;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final GlovesRepository glovesRepository;
    private final ShoesRepository shoesRepository;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      GlovesRepository glovesRepository,
                      ShoesRepository shoesRepository) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.glovesRepository = glovesRepository;
        this.shoesRepository = shoesRepository;
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        // Only seed if the database is empty
        if (bookRepository.count() == 0) {
            seedBooks();
            seedMagazines();
            seedGloves();
            seedShoes();
        }
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),                // Title
                    faker.number().randomDouble(2, 10, 100), // Price
                    faker.number().numberBetween(1, 50), // Copies
                    faker.book().author()                // Author
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        System.out.println("Seeding Magazines...");
        for (int i = 0; i < 5; i++) {
            // Convert Faker Date to LocalDateTime
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly", // Using publisher as magazine title
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500), // Order Qty
                    issueDate
            );
            magazineRepository.save(mag);
        }
    }

    private void seedGloves() {
        System.out.println("Seeding Gloves...");
        String[] brands = {"Everlast", "Winning", "Cleto Reyes", "Rival", "Hayabusa", "Venum", "Grant", "Sting", "Adidas", "Green Hill"};
        String[] sizes = {"S", "M", "L", "XL"};
        int[] weights = {8, 10, 12, 14, 16};

        for (int i = 0; i < 5; i++) {
            GlovesEntity gloves = new GlovesEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],     // Random size
                    brands[faker.number().numberBetween(0, brands.length)],   // Random brand
                    faker.number().randomDouble(2, 30, 250),      // Price
                    weights[faker.number().numberBetween(0, weights.length)]  // Weight in oz
            );
            glovesRepository.save(gloves);
        }
    }

    private void seedShoes() {
        System.out.println("Seeding Shoes...");
        String[] brands = {"Nike Machomai 3", "Adidas Boxhog 2", "Nike Hyperko 2", "Everlast Elite", "Hayabusa Pro"};
        String[] sizes = {"8", "8.5", "9", "9.5", "10", "10.5", "11", "12"};

        for (int i = 0; i < 5; i++) {
            ShoesEntity shoes = new ShoesEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],     // Random size
                    brands[faker.number().numberBetween(0, brands.length)],   // Random brand
                    faker.number().randomDouble(2, 50, 200),      // Price
                    faker.bool().bool()                                       // Random boolean for highTop
            );
            shoesRepository.save(shoes);
        }
    }
}