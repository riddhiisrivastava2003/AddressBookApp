

package com.addressbook.backend.repository;

import com.addressbook.backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;//Tumhe SQL queries manually likhne ki zarurat nahi hoti
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> { //ContactRepository → JpaRepository ko extend karta hai
    //Contact	Entity class
    //Long	Primary key ka datatype

    List<Contact> findByUserId(Long userId);

}