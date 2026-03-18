//
//
//package com.addressbook.backend.model;
//
//import jakarta.persistence.*; //jpa annotations import krta h  iska use database mapping ke liye hota h
//
//@Entity //Ye class database table hai.
////Agar @Entity nahi lagate to Hibernate is class ko database me map nahi karega
//@Table(name = "contacts")  //Database table ka naam:
//public class Contact {
//
//    @Id //Ye primary key hoti hai
//    @GeneratedValue(strategy = GenerationType.IDENTITY) // @GeneratedValue ->Ye batata hai ki ID automatically generate hogi  IDENTITY-> MySQL auto increment karega.
//    private Long id;
//
//    private String firstName;
//    private String lastName;
//    private String address;
//    private String city;
//    private String state;
//    private String zip;
//    private String phoneNumber;
//    private String email;
//
//
//    //Relationships
//    @ManyToOne
//    //Many Contacts → One User...User ke multiple contacts ho sakte hain
//    @JoinColumn(name = "user_id")//Ye database me foreign key column banata hai.
//    private User user;
//
//    public Contact(){} //Spring Boot aur Hibernate ko empty constructor chahiye hota hai. Agar ye nahi hoga to entity create nahi hogi.
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public String getState() {
//        return state;
//    }
//
//    public String getZip() {
//        return zip;
//    }
//
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
//    public void setState(String state) {
//        this.state = state;
//    }
//
//    public void setZip(String zip) {
//        this.zip = zip;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//}


package com.addressbook.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String state;
    private String zip;

    @Column(name = "phone")
    private String phoneNumber;

    private String email;

    // 🔥 Many contacts → one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Contact(){}

    // Getters
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getAddress() { return address; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getZip() { return zip; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getEmail() { return email; }
    public User getUser() { return user; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setAddress(String address) { this.address = address; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setZip(String zip) { this.zip = zip; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setEmail(String email) { this.email = email; }
    public void setUser(User user) { this.user = user; }
}