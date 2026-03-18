//////////package com.addressbook.backend.config;
//////////
//////////import com.addressbook.backend.service.UserDetailsServiceImpl;
//////////import org.springframework.beans.factory.annotation.Autowired;
//////////import org.springframework.context.annotation.Bean;
//////////import org.springframework.context.annotation.Configuration;
//////////import org.springframework.security.authentication.AuthenticationManager;
//////////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//////////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//////////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//////////import org.springframework.security.crypto.password.PasswordEncoder;
//////////import org.springframework.security.web.SecurityFilterChain;
//////////
//////////@Configuration
//////////public class SecurityConfig {
//////////
//////////    @Autowired
//////////    private UserDetailsServiceImpl userDetailsService;
//////////
//////////
//////////    @Bean
//////////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//////////        http
//////////                .csrf(csrf -> csrf.disable())
//////////                .authorizeHttpRequests(auth -> auth
//////////                        .requestMatchers("/auth/**").permitAll()
//////////                        .requestMatchers("/admin/**").hasRole("ADMIN")
//////////                        .anyRequest().authenticated()
//////////                )
//////////                .userDetailsService(userDetailsService);
//////////
//////////        return http.build();
//////////    }
//////////
//////////    @Bean
//////////    public PasswordEncoder passwordEncoder() {
//////////        return new BCryptPasswordEncoder();
//////////    }
//////////
//////////    @Bean
//////////    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//////////        return config.getAuthenticationManager();
//////////    }
//////////}
////////
////////
////////package com.addressbook.backend.config;
////////
////////import com.addressbook.backend.service.UserDetailsServiceImpl;
////////import org.springframework.beans.factory.annotation.Autowired;
////////import org.springframework.context.annotation.Bean;
////////import org.springframework.context.annotation.Configuration;
////////import org.springframework.security.authentication.AuthenticationManager;
////////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
////////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////////import org.springframework.security.crypto.password.PasswordEncoder;
////////import org.springframework.security.web.SecurityFilterChain;
////////
////////@Configuration
////////public class SecurityConfig {
////////
////////    @Autowired
////////    private UserDetailsServiceImpl userDetailsService;
////////
////////    @Bean
////////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////////        http
////////                .csrf(csrf -> csrf.disable())
////////                .authorizeHttpRequests(auth -> auth
////////                        .requestMatchers("/auth/**").permitAll()
////////                        .requestMatchers("/contacts/**").permitAll() // 🔥 ADD THIS
////////                        .requestMatchers("/admin/**").hasRole("ADMIN")
////////                        .anyRequest().authenticated()
////////                )
////////                .userDetailsService(userDetailsService);
////////
////////        return http.build();
////////    }
////////
////////    @Bean
////////    public PasswordEncoder passwordEncoder() {
////////        return new BCryptPasswordEncoder();
////////    }
////////
////////    @Bean
////////    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
////////        return config.getAuthenticationManager();
////////    }
////////}
//////
//////package com.addressbook.backend.config;
//////
//////import com.addressbook.backend.service.UserDetailsServiceImpl;
//////import org.springframework.beans.factory.annotation.Autowired;
//////import org.springframework.context.annotation.Bean;
//////import org.springframework.context.annotation.Configuration;
//////import org.springframework.security.authentication.AuthenticationManager;
//////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//////import org.springframework.security.config.http.SessionCreationPolicy;
//////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//////import org.springframework.security.crypto.password.PasswordEncoder;
//////import org.springframework.security.web.SecurityFilterChain;
//////
//////@Configuration
//////public class SecurityConfig {
//////
//////    @Autowired
//////    private UserDetailsServiceImpl userDetailsService;
//////
//////    @Bean
//////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//////
//////        http
//////                .csrf(csrf -> csrf.disable())
//////
//////                // ✅ CORS enable
//////                .cors(cors -> {})
//////
//////                .authorizeHttpRequests(auth -> auth
//////                        // ✅ public endpoints
//////                        .requestMatchers("/auth/**").permitAll()
//////
//////                        // (temporary allow for testing)
//////                        .requestMatchers("/contacts/**").permitAll()
//////
//////                        .requestMatchers("/admin/**").hasRole("ADMIN")
//////
//////                        .anyRequest().authenticated()
//////                )
//////
//////                // ✅ IMPORTANT (stateless for API)
//////                .sessionManagement(session ->
//////                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//////                )
//////
//////                // ✅ attach user service
//////                .userDetailsService(userDetailsService)
//////
//////                // ❌ disable default login form
//////                .formLogin(form -> form.disable())
//////
//////                // ❌ disable http basic popup
//////                .httpBasic(basic -> basic.disable());
//////
//////        return http.build();
//////    }
//////
//////    @Bean
//////    public PasswordEncoder passwordEncoder() {
//////        return new BCryptPasswordEncoder();
//////    }
//////
//////    @Bean
//////    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//////        return config.getAuthenticationManager();
//////    }
//////}
////
////
////package com.addressbook.backend.config;
////
////import com.addressbook.backend.service.UserDetailsServiceImpl;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.http.SessionCreationPolicy;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////
////@Configuration
////public class SecurityConfig {
////
////    @Autowired
////    private UserDetailsServiceImpl userDetailsService;
////
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////
////        http
////                .csrf(csrf -> csrf.disable())
////                .cors(cors -> {})
////
////                .authorizeHttpRequests(auth -> auth
////                        .requestMatchers("/auth/**").permitAll()
////                        .requestMatchers("/contacts/**").permitAll()
////                        .requestMatchers("/admin/**").hasRole("ADMIN")
////                        .anyRequest().authenticated()
////                )
////
////                .sessionManagement(session ->
////                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                )
////
////                .userDetailsService(userDetailsService)
////
////                .formLogin(form -> form.disable())
////                .httpBasic(basic -> basic.disable());
////
////        return http.build();
////    }
////
////    // ✅ PASSWORD ENCODER
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////
////    // 🔥🔥🔥 MAIN FIX (CUSTOM AUTH MANAGER)
////    @Bean
////    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
////
////        return http.getSharedObject(AuthenticationManagerBuilder.class)
////                .userDetailsService(userDetailsService)
////                .passwordEncoder(passwordEncoder())
////                .and()
////                .build();
////    }
////}
//
//package com.addressbook.backend.config;
//
//import com.addressbook.backend.service.UserDetailsServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////
////        http
////                .csrf(csrf -> csrf.disable())   // ✅ disable CSRF
////                .cors(cors -> {})
////
////                .authorizeHttpRequests(auth -> auth
////                        .requestMatchers("/auth/**").permitAll()
////                        .requestMatchers("/contacts/**").permitAll()
////                        .anyRequest().permitAll()   // ✅ allow everything (for now)
////                )
////
////                .sessionManagement(session ->
////                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
////                )
////
////                // ❌ REMOVE userDetailsService (IMPORTANT FIX)
////
////                .formLogin(form -> form.disable())
////                .httpBasic(basic -> basic.disable());
////
////        return http.build();
////    }
//@Bean
//public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//    http
//            .csrf(csrf -> csrf.disable())
//            .cors(cors -> {})
//
//            .authorizeHttpRequests(auth -> auth
//                    .requestMatchers("/auth/**").permitAll()
//                    .requestMatchers("/contacts/**").permitAll()
//                    .anyRequest().permitAll()
//            )
//
//            .userDetailsService(userDetailsService) // ✅ ADD THIS LINE
//
//            .sessionManagement(session ->
//                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//            )
//
//            .formLogin(form -> form.disable())
//            .httpBasic(basic -> basic.disable());
//
//    return http.build();
//}
//
//    @Autowired
//    private UserDetailsServiceImpl userDetailsService;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    // ✅ modern way
//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration config) throws Exception {
//        return config.getAuthenticationManager();
//    }
//}

package com.addressbook.backend.config;

import com.addressbook.backend.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/contacts/**").permitAll()
                        .anyRequest().permitAll()
                )

                .userDetailsService(userDetailsService)

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}