package csd230.seeder;

import csd230.entities.*;
import csd230.repositories.*;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.concurrent.TimeUnit;

@Component
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final MagazineRepository magazineRepository;
    private final DiscMagRepository discMagRepository;
    private final GlovesRepository glovesRepository;
    private final HeadgearRepository headgearRepository;
    private final HandWrapsRepository handWrapsRepository;
    private final ShoesRepository shoesRepository;
    private final UserEntityRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Faker faker;

    public DataSeeder(BookRepository bookRepository,
                      MagazineRepository magazineRepository,
                      DiscMagRepository discMagRepository,
                      GlovesRepository glovesRepository,
                      HeadgearRepository headgearRepository,
                      HandWrapsRepository handWrapsRepository,
                      ShoesRepository shoesRepository,
                      UserEntityRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.magazineRepository = magazineRepository;
        this.discMagRepository = discMagRepository;
        this.glovesRepository = glovesRepository;
        this.headgearRepository = headgearRepository;
        this.handWrapsRepository = handWrapsRepository;
        this.shoesRepository = shoesRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
            seedDiscMags();
            seedGloves();
            seedShoes();
            seedHeadgear();
            seedHandWraps();
        }
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            System.out.println("Seeding Users...");
            UserEntity admin = new UserEntity("admin", passwordEncoder.encode("admin"), "ADMIN");
            UserEntity user = new UserEntity("user", passwordEncoder.encode("user"), "USER");
            userRepository.save(admin);
            userRepository.save(user);
        }
    }

    private void seedBooks() {
        System.out.println("Seeding Books...");
        // Increased from 10 to 40
        for (int i = 0; i < 40; i++) {
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
        // Increased from 5 to 25
        for (int i = 0; i < 25; i++) {
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

    private void seedDiscMags() {
        System.out.println("Seeding DiscMags...");
        // Increased from 5 to 25
        for (int i = 0; i < 25; i++) {
            LocalDateTime issueDate = faker.date().past(365, TimeUnit.DAYS)
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();

            DiscMagEntity discMag = new DiscMagEntity(
                    faker.book().publisher() + " Monthly + Disc", // title
                    faker.number().randomDouble(2, 15, 30),       // price
                    faker.number().numberBetween(10, 50),         // copies
                    faker.number().numberBetween(50, 200),        // orderQty
                    issueDate,                                    // currentIssue
                    faker.bool().bool()                           // hasDisc
            );
            discMagRepository.save(discMag);
        }
    }

    private void seedGloves() {
        System.out.println("Seeding Gloves...");
        // Retained originals, added Title, Sanabul, Fairtex, Twins, Ring to Cage, RDX, Fly, Phenom, Ringside
        String[] brands = {"Everlast", "Winning", "Cleto Reyes", "Rival", "Hayabusa", "Venum", "Grant", "Sting",
                "Adidas", "Green Hill", "Title Boxing", "Sanabul", "Fairtex", "Twins Special",
                "Ring to Cage", "RDX", "Fly", "Phenom", "Ringside"};
        String[] sizes = {"S", "M", "L", "XL"};
        int[] weights = {8, 10, 12, 14, 16, 18};

        // Increased from 5 to 30
        for (int i = 0; i < 30; i++) {
            GlovesEntity gloves = new GlovesEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 30, 350),
                    weights[faker.number().numberBetween(0, weights.length)]
            );
            glovesRepository.save(gloves);
        }
    }

    private void seedShoes() {
        System.out.println("Seeding Shoes...");
        // Retained originals, added more specific boxing shoe models
        String[] brands = {"Nike Machomai 3", "Adidas Boxhog 2", "Nike Hyperko 2", "Everlast Elite", "Hayabusa Pro",
                "Rival RSX-Genesis", "Mizuno Finisher", "Title Speed-Flex", "Venum Elite",
                "Under Armour Project Rock", "Cleto Reyes High Top", "Asics Aggressor",
                "Adidas Speedex 23", "Ringside Diablo", "Adams V Pro"};
        String[] sizes = {"7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"};

        // Increased from 5 to 30
        for (int i = 0; i < 30; i++) {
            ShoesEntity shoes = new ShoesEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 50, 250),
                    faker.bool().bool()
            );
            shoesRepository.save(shoes);
        }
    }

    private void seedHeadgear() {
        System.out.println("Seeding Headgear...");
        // Retained originals, added Hayabusa, Venum, Phenom, Fly, Ring to Cage, RDX, Sanabul, Fairtex, Ringside, Grant
        String[] brands = {"Winning", "Cleto Reyes", "Rival", "Title", "Everlast", "Hayabusa", "Venum",
                "Phenom", "Fly", "Ring to Cage", "RDX", "Sanabul", "Fairtex", "Ringside", "Grant"};
        String[] sizes = {"S", "M", "L", "XL"};
        String[] types = {"Face Saver", "Open Face", "Cheek Protectors", "Full Training"};

        // Increased from 5 to 30
        for (int i = 0; i < 30; i++) {
            HeadgearEntity headgear = new HeadgearEntity(
                    sizes[faker.number().numberBetween(0, sizes.length)],
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 50, 450),
                    types[faker.number().numberBetween(0, types.length)]
            );
            headgearRepository.save(headgear);
        }
    }

    private void seedHandWraps() {
        System.out.println("Seeding HandWraps...");
        // Retained originals, added RDX, Venum, Rival, Fairtex, Twins, Pro Impact, Ringside, Hawk Boxing
        String[] brands = {"Meister", "Everlast", "Title", "Hayabusa", "Sanabul", "RDX", "Venum",
                "Rival", "Fairtex", "Twins Special", "Pro Impact", "Ringside", "Hawk Boxing"};
        String[] lengths = {"108in", "120in", "180in", "200in"};

        // Increased from 5 to 30
        for (int i = 0; i < 30; i++) {
            HandWrapsEntity wraps = new HandWrapsEntity(
                    lengths[faker.number().numberBetween(0, lengths.length)],
                    brands[faker.number().numberBetween(0, brands.length)],
                    faker.number().randomDouble(2, 5, 25),
                    faker.bool().bool()
            );
            handWrapsRepository.save(wraps);
        }
    }
}