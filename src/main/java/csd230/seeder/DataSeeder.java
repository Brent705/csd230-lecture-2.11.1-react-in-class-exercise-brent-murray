package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.BookRepository;
import csd230.repositories.MagazineRepository;
import csd230.repositories.GlovesRepository;
import csd230.repositories.ShoesRepository;
import csd230.repositories.UserEntityRepository; // NEW
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder; // NEW
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
    private final UserEntityRepository userRepository; // NEW
    private final PasswordEncoder passwordEncoder;     // NEW
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      GlovesRepository glovesRepository,
                      ShoesRepository shoesRepository,
                      UserEntityRepository userRepository,     // NEW
                      PasswordEncoder passwordEncoder) {       // NEW
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.glovesRepository = glovesRepository;
        this.shoesRepository = shoesRepository;
        this.userRepository = userRepository;                  // NEW
        this.passwordEncoder = passwordEncoder;                // NEW
        this.faker = new Faker();
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed users first
        seedUsers();

        // 2. Only seed inventory if the database is empty
        if (bookRepository.count() == 0) {
            seedBooks();
            seedMagazines();
            seedGloves();
            seedShoes();
        }
    }

    // NEW: Creates the initial admin and user accounts
    private void seedUsers() {
        if (userRepository.count() == 0) {
            System.out.println("Seeding Users...");
            // Notice: Spring Security auto-prepends "ROLE_" to these values internally
            UserEntity admin = new UserEntity("admin", passwordEncoder.encode("admin"), "ADMIN");
            UserEntity user = new UserEntity("user", passwordEncoder.encode("user"), "USER");
            userRepository.save(admin);
            userRepository.save(user);
        }
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        for (int i = 0; i < 10; i++) {
            BookEntity book = new BookEntity(
                    faker.book().title(),
                    faker.number().randomDouble(2, 10, 100),
                    faker.number().numberBetween(1, 50),
                    faker.book().author()
            );
            bookRepository.save(book);
        }
    }

    private void seedMagazines() {
        System.out.println("Seeding Magazines...");
        for (int i = 0; i < 5; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            MagazineEntity mag = new MagazineEntity(
                    faker.book().publisher() + " Weekly",
                    faker.number().randomDouble(2, 5, 20),
                    faker.number().numberBetween(10, 100),
                    faker.number().numberBetween(100, 500),
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
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 30, 250),
                    weights[faker.number().numberBetween(0, weights.length)]
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
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 50, 200),
                    faker.bool().bool()
            );
            shoesRepository.save(shoes);
        }
    }
}