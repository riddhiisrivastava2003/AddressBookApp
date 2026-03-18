//
//
//package com.addressbook.backend.repository;
//
//import com.addressbook.backend.model.Contact;
//import org.springframework.data.jpa.repository.JpaRepository;//Tumhe SQL queries manually likhne ki zarurat nahi hoti
//import java.util.List;
//
//public interface ContactRepository extends JpaRepository<Contact, Long> { //ContactRepository → JpaRepository ko extend karta hai
//    //Contact	Entity class
//    //Long	Primary key ka datatype
//
////    List<Contact> findByUserId(Long userId);
////
////    List<Contact> findByCity(String city);
////
////    List<Contact> findByState(String state);
////
////    long countByCity(String city);
////
////    long countByState(String state);
//
//}


package com.addressbook.backend.repository;

import com.addressbook.backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    // 🔥 Sirf logged-in user ke contacts
    List<Contact> findByUserId(Long userId);

    // 🔥 Admin ke liye (optional, but useful)
    List<Contact> findAll();

}