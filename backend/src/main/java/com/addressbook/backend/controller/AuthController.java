//package com.addressbook.backend.controller;
//
//import com.addressbook.backend.model.User;
//import com.addressbook.backend.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    // REGISTER
//    @PostMapping("/register")
//    public String registerUser(@RequestBody User user){
//        user.setRole("USER"); // default role
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//        return "User registered successfully";
//    }
//
//    // LOGIN
//    @PostMapping("/login")
//    public String login(@RequestBody User user){
//        try {
//            Authentication auth = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
//            );
//            if(auth.isAuthenticated()){
//                return "Login successful for user: " + user.getUsername();
//            }
//        } catch (Exception e){
//            return "Invalid credentials";
//        }
//        return "Invalid credentials";
//    }
//
//    // LOGOUT
//    @PostMapping("/logout")
//    public String logout(){
//        return "Logout successful";
//    }
//}
package com.addressbook.backend.controller;

import com.addressbook.backend.model.User;
import com.addressbook.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    // REGISTER
    @PostMapping("/register")
    public User registerUser(@RequestBody User user){
        // Default role if not provided
        if(user.getRole() == null || user.getRole().isEmpty()){
            user.setRole("USER");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User user){
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        if(auth.isAuthenticated()){
            // Fetch full user details to return
            User loggedInUser = userRepository.findByUsername(user.getUsername());
            loggedInUser.setPassword(null); // remove password from response
            return loggedInUser;
        }
        return null;
    }
}