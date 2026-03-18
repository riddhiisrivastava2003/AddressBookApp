//package com.addressbook.backend.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name="users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String username;
//    private String email;
//    private String password;
//    private String role; // USER or ADMIN
//
//    public User() {}
//
//    // Getters & Setters
//    public Long getId() { return id; }
//    public String getUsername() { return username; }
//    public String getEmail() { return email; }
//    public String getPassword() { return password; }
//    public String getRole() { return role; }
//
//    public void setId(Long id) { this.id = id; }
//    public void setUsername(String username) { this.username = username; }
//    public void setEmail(String email) { this.email = email; }
//    public void setPassword(String password) { this.password = password; }
//    public void setRole(String role) { this.role = role; }
//}



package com.addressbook.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(nullable = false)
    private String role = "USER"; // default USER

    // 🔥 One user → many contacts
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contact> contacts;

    public User() {}

    // Getters & Setters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public List<Contact> getContacts() { return contacts; }

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setContacts(List<Contact> contacts) { this.contacts = contacts; }
}