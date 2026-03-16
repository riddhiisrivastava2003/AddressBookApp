//package com.addressbook.backend.service;
//
//import com.addressbook.backend.model.Contact;//Ye Contact entity class ko import karta hai. Iska use hum database data ke liye karte hain
//import com.addressbook.backend.repository.ContactRepository; //Ye repository layer ko import karta hai. Repository database operations perform karta hai.
//import org.springframework.stereotype.Service; //Ye Spring annotation hai jo class ko Service Layer component banata hai
//
//import java.util.List;
//
//@Service //Spring ko batata hai ki ye service component hai.
//public class ContactService {
//
//    private final ContactRepository repository; //Ye repository object hai jo database operations karega
//
//    public ContactService(ContactRepository repository) {
//        this.repository = repository;
//       // Spring automatically ContactRepository ka object pass karta hai
//    }
//
////    public Contact addContact(Contact contact) {
////        return repository.save(contact);
////        //database me new contact save karna
////    }
//
//    public Contact addContact(Contact contact) {
//
//        boolean duplicate = repository.findAll()
//                .stream()
//                .anyMatch(c ->
//                        c.getFirstName().equalsIgnoreCase(contact.getFirstName()) &&
//                                c.getLastName().equalsIgnoreCase(contact.getLastName())
//                );
//
//        if (duplicate) {
//            throw new RuntimeException("Duplicate Contact Not Allowed");
//        }
//
//        return repository.save(contact);
//    }
//
//    public List<Contact> getContacts() {
//        return repository.findAll();
//        //database se saare contacts fetch karna
//    }
//
//    public void deleteContact(Long id) {
//        repository.deleteById(id);
//    }
//
//    // UC7 Search by City
//    public List<Contact> searchByCity(String city) {
//        return repository.findByCity(city);
//    }
//
//    // UC7 Search by State
//    public List<Contact> searchByState(String state) {
//        return repository.findByState(state);
//    }
//
//    // UC9 Count by City
//    public long countByCity(String city) {
//        return repository.countByCity(city);
//    }
//
//    // UC9 Count by State
//    public long countByState(String state) {
//        return repository.countByState(state);
//    }
//
//    // UC10 Sort by Name
//    public List<Contact> sortByName() {
//        return repository.findAll(org.springframework.data.domain.Sort.by("firstName"));
//    }
//
//    // UC11 Sort by City
//    public List<Contact> sortByCity() {
//        return repository.findAll(org.springframework.data.domain.Sort.by("city"));
//    }
//
//    // UC11 Sort by State
//    public List<Contact> sortByState() {
//        return repository.findAll(org.springframework.data.domain.Sort.by("state"));
//    }
//
//    // UC11 Sort by Zip
//    public List<Contact> sortByZip() {
//        return repository.findAll(org.springframework.data.domain.Sort.by("zip"));
//    }
//
//
//
//
//
//    public Contact editContact(Long id, Contact updatedContact) {
//
//        Contact contact = repository.findById(id).orElse(null); //Database se contact search karta hai.
//
//        if(contact != null){ //null return karega
//
//            contact.setFirstName(updatedContact.getFirstName());
//            contact.setLastName(updatedContact.getLastName());
//            contact.setAddress(updatedContact.getAddress());
//            contact.setCity(updatedContact.getCity());
//            contact.setState(updatedContact.getState());
//            contact.setZip(updatedContact.getZip());
//            contact.setPhoneNumber(updatedContact.getPhoneNumber());
//            contact.setEmail(updatedContact.getEmail());
//
//            repository.save(contact);
//        }
//
//        return contact;
//    }
//}


package com.addressbook.backend.service;

import com.addressbook.backend.model.Contact;
import com.addressbook.backend.repository.ContactRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    // Add Contact + Duplicate Check
    public Contact addContact(Contact contact) {

        boolean duplicate = repository.findAll()
                .stream()
                .anyMatch(c ->
                        c.getFirstName().equalsIgnoreCase(contact.getFirstName()) &&
                                c.getLastName().equalsIgnoreCase(contact.getLastName())
                );

        if (duplicate) {
            throw new RuntimeException("Duplicate Contact Not Allowed");
        }

        return repository.save(contact);
    }

    // Get All Contacts
    public List<Contact> getContacts() {
//        return repository.findAll();

        return repository.findAll(Sort.by("firstName").ascending());
    }

    // Delete Contact
    public void deleteContact(Long id) {
        repository.deleteById(id);
    }

    // Edit Contact
    public Contact editContact(Long id, Contact updatedContact) {

        Contact contact = repository.findById(id).orElse(null);

        if (contact != null) {

            contact.setFirstName(updatedContact.getFirstName());
            contact.setLastName(updatedContact.getLastName());
            contact.setAddress(updatedContact.getAddress());
            contact.setCity(updatedContact.getCity());
            contact.setState(updatedContact.getState());
            contact.setZip(updatedContact.getZip());
            contact.setPhoneNumber(updatedContact.getPhoneNumber());
            contact.setEmail(updatedContact.getEmail());

            repository.save(contact);
        }

        return contact;
    }

    // Search by City
    public List<Contact> searchByCity(String city) {

        return repository.findAll()
                .stream()
                .filter(c -> c.getCity().equalsIgnoreCase(city))
                .toList();
    }

    // Search by State
    public List<Contact> searchByState(String state) {

        return repository.findAll()
                .stream()
                .filter(c -> c.getState().equalsIgnoreCase(state))
                .toList();
    }

    // Count by City
    public long countByCity(String city) {

        return repository.findAll()
                .stream()
                .filter(c -> c.getCity().equalsIgnoreCase(city))
                .count();
    }

    // Count by State
    public long countByState(String state) {

        return repository.findAll()
                .stream()
                .filter(c -> c.getState().equalsIgnoreCase(state))
                .count();
    }

    // Sort by Name
    public List<Contact> sortByName() {

        return repository.findAll()
                .stream()
                .sorted(Comparator.comparing(Contact::getFirstName, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    // Sort by City
    public List<Contact> sortByCity() {

        return repository.findAll()
                .stream()
                .sorted(Comparator.comparing(Contact::getCity, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    // Sort by State
    public List<Contact> sortByState() {

        return repository.findAll()
                .stream()
                .sorted(Comparator.comparing(Contact::getState, String.CASE_INSENSITIVE_ORDER))

                .toList();
    }

    // Sort by Zip
    public List<Contact> sortByZip() {

        return repository.findAll()
                .stream()
                .sorted(Comparator.comparing(Contact::getZip))
                .toList();
    }

}