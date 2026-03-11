//package com.addressbook.backend.repository;
//
//
//
//import com.addressbook.backend.model.Contact;
//import org.springframework.stereotype.Repository;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Repository
//public class ContactRepository {
//
//    private List<Contact> contacts = new ArrayList<>();
//
//    public List<Contact> getAllContacts() {
//        return contacts;
//    }
//
//    public void addContact(Contact contact) {
//        contacts.add(contact);
//    }
//
//    public void deleteContact(String firstName) {
//        contacts.removeIf(c -> c.getFirstName().equalsIgnoreCase(firstName));
//    }
//
//    public Contact findContact(String firstName) {
//        return contacts.stream()
//                .filter(c -> c.getFirstName().equalsIgnoreCase(firstName))
//                .findFirst()
//                .orElse(null);
//    }
//}

package com.addressbook.backend.repository;

import com.addressbook.backend.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findByUserId(Long userId);

}