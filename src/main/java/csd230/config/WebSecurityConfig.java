package csd230.config;

import csd230.auth.JwtAuthorizationFilter;
import csd230.services.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    public WebSecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthorizationFilter jwtAuthorizationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        // 1. Allow Vite Assets, the SPA index, and ALL React Router paths
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/assets/**",
                                "/*.svg",
                                "/login",
                                "/logout",
                                "/inventory",
                                "/add",
                                "/magazines",
                                "/add-magazine",
                                "/gloves",
                                "/add-gloves",
                                "/shoes",
                                "/add-shoes",
                                "/cart"
                        ).permitAll()

                        // 2. Allow Public Endpoints (Login, H2 Console, Swagger)
                        .requestMatchers("/api/rest/auth/**").permitAll()
                        .requestMatchers("/h2-console/**", "/error").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        // 3. Secure the REST API
                        .requestMatchers("/api/rest/**").hasAnyRole("USER", "ADMIN")

                        // 4. Secure the old Thymeleaf Admin views (if still used)
                        .requestMatchers("/books/add", "/books/edit/**", "/books/delete/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                // Handle unauthorized REST requests by returning 401 instead of redirecting
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, authException) -> {
                            if (request.getRequestURI().startsWith("/api/rest/")) {
                                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            } else {
                                response.sendRedirect("/login");
                            }
                        })
                )
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)

                // IMPORTANT: Disable Spring's built-in form login & logout so React can do it
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable());

        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        // Since we are using stateless JWTs, we can safely disable CSRF entirely
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
}