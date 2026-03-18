package com.addressbook.backend.service;

import com.addressbook.backend.model.Contact;
import com.addressbook.backend.model.User;
import com.addressbook.backend.repository.ContactRepository;
import com.addressbook.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repository;
    private final UserRepository userRepository; // 🔥 NEW

    public ContactService(ContactRepository repository, UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    // 🔥 ADMIN → sab contacts
    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    // 🔥 USER → sirf apne contacts
    public List<Contact> getContactsByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    // 🔥 ADD CONTACT (FIXED)
    public Contact addContact(Contact contact) {

        // 🔥 USER NULL CHECK
        if (contact.getUser() == null || contact.getUser().getId() == null) {
            throw new RuntimeException("User is required");
        }

        Long userId = contact.getUser().getId();

        // 🔥 FETCH USER FROM DB (IMPORTANT)
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        contact.setUser(user);

        // 🔥 NULL SAFE DUPLICATE CHECK
        boolean duplicate = repository.findByUserId(userId)
                .stream()
                .anyMatch(c ->
                        c.getFirstName() != null &&
                                contact.getFirstName() != null &&
                                c.getFirstName().equalsIgnoreCase(contact.getFirstName()) &&

                                c.getLastName() != null &&
                                contact.getLastName() != null &&
                                c.getLastName().equalsIgnoreCase(contact.getLastName())
                );

        if (duplicate) {
            throw new RuntimeException("Duplicate Contact Not Allowed for this user");
        }

        return repository.save(contact);
    }

    // DELETE
    public void deleteContact(Long id) {
        repository.deleteById(id);
    }

    // UPDATE
    public Contact editContact(Long id, Contact updatedContact) {

        Contact contact = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        contact.setFirstName(updatedContact.getFirstName());
        contact.setLastName(updatedContact.getLastName());
        contact.setAddress(updatedContact.getAddress());
        contact.setCity(updatedContact.getCity());
        contact.setState(updatedContact.getState());
        contact.setZip(updatedContact.getZip());
        contact.setPhoneNumber(updatedContact.getPhoneNumber());
        contact.setEmail(updatedContact.getEmail());

        return repository.save(contact);
    }

    // 🔍 SEARCH
    public List<Contact> searchByCity(Long userId, String city) {
        return repository.findByUserId(userId)
                .stream()
                .filter(c -> c.getCity() != null && city.equalsIgnoreCase(c.getCity()))
                .toList();
    }

    public List<Contact> searchByState(Long userId, String state) {
        return repository.findByUserId(userId)
                .stream()
                .filter(c -> c.getState() != null && state.equalsIgnoreCase(c.getState()))
                .toList();
    }

    // 🔢 COUNT
    public long countByCity(Long userId, String city) {
        return repository.findByUserId(userId)
                .stream()
                .filter(c -> c.getCity() != null && city.equalsIgnoreCase(c.getCity()))
                .count();
    }

    public long countByState(Long userId, String state) {
        return repository.findByUserId(userId)
                .stream()
                .filter(c -> c.getState() != null && state.equalsIgnoreCase(c.getState()))
                .count();
    }

    // 🔽 SORT
    public List<Contact> sortByName(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .sorted(Comparator.comparing(Contact::getFirstName,
                        Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)))
                .toList();
    }

    public List<Contact> sortByCity(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .sorted(Comparator.comparing(Contact::getCity,
                        Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)))
                .toList();
    }

    public List<Contact> sortByState(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .sorted(Comparator.comparing(Contact::getState,
                        Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)))
                .toList();
    }

    public List<Contact> sortByZip(Long userId) {
        return repository.findByUserId(userId)
                .stream()
                .sorted(Comparator.comparing(Contact::getZip,
                        Comparator.nullsLast(String::compareTo)))
                .toList();
    }
}


//package com.addressbook.backend.service;
//
//import com.addressbook.backend.model.Contact;
//import com.addressbook.backend.repository.ContactRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.Comparator;
//import java.util.List;
//
//@Service
//public class ContactService {
//
//    private final ContactRepository repository;
//
//    public ContactService(ContactRepository repository) {
//        this.repository = repository;
//    }
//
//    // 🔥 ADMIN → sab contacts
//    public List<Contact> getAllContacts() {
//        return repository.findAll();
//    }
//
//    // 🔥 USER → sirf apne contacts
//    public List<Contact> getContactsByUser(Long userId) {
//        return repository.findByUserId(userId);
//    }
//
//   //  🔥 ADD CONTACT (duplicate check per user)
//    public Contact addContact(Contact contact) {
//
//        Long userId = contact.getUser().getId();
//
//        boolean duplicate = repository.findByUserId(userId)
//                .stream()
//                .anyMatch(c ->
//                        c.getFirstName().equalsIgnoreCase(contact.getFirstName()) &&
//                                c.getLastName().equalsIgnoreCase(contact.getLastName())
//                );
//
//        if (duplicate) {
//            throw new RuntimeException("Duplicate Contact Not Allowed for this user");
//        }
//
//        return repository.save(contact);
//    }
//
//
//
//    // DELETE
//    public void deleteContact(Long id) {
//        repository.deleteById(id);
//    }
//
//    // UPDATE
//    public Contact editContact(Long id, Contact updatedContact) {
//
//        Contact contact = repository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Contact not found"));
//
//        contact.setFirstName(updatedContact.getFirstName());
//        contact.setLastName(updatedContact.getLastName());
//        contact.setAddress(updatedContact.getAddress());
//        contact.setCity(updatedContact.getCity());
//        contact.setState(updatedContact.getState());
//        contact.setZip(updatedContact.getZip());
//        contact.setPhoneNumber(updatedContact.getPhoneNumber());
//        contact.setEmail(updatedContact.getEmail());
//
//        return repository.save(contact);
//    }
//
//    // 🔍 SEARCH (user specific)
//    public List<Contact> searchByCity(Long userId, String city) {
//        return repository.findByUserId(userId)
//                .stream()
//                .filter(c -> city.equalsIgnoreCase(c.getCity()))
//                .toList();
//    }
//
//    public List<Contact> searchByState(Long userId, String state) {
//        return repository.findByUserId(userId)
//                .stream()
//                .filter(c -> state.equalsIgnoreCase(c.getState()))
//                .toList();
//    }
//
//    // 🔢 COUNT (user specific)
//    public long countByCity(Long userId, String city) {
//        return repository.findByUserId(userId)
//                .stream()
//                .filter(c -> city.equalsIgnoreCase(c.getCity()))
//                .count();
//    }
//
//    public long countByState(Long userId, String state) {
//        return repository.findByUserId(userId)
//                .stream()
//                .filter(c -> state.equalsIgnoreCase(c.getState()))
//                .count();
//    }
//
//    // 🔽 SORT (user specific)
//    public List<Contact> sortByName(Long userId) {
//        return repository.findByUserId(userId)
//                .stream()
//                .sorted(Comparator.comparing(Contact::getFirstName, String.CASE_INSENSITIVE_ORDER))
//                .toList();
//    }
//
//    public List<Contact> sortByCity(Long userId) {
//        return repository.findByUserId(userId)
//                .stream()
//                .sorted(Comparator.comparing(Contact::getCity, String.CASE_INSENSITIVE_ORDER))
//                .toList();
//    }
//
//    public List<Contact> sortByState(Long userId) {
//        return repository.findByUserId(userId)
//                .stream()
//                .sorted(Comparator.comparing(Contact::getState, String.CASE_INSENSITIVE_ORDER))
//                .toList();
//    }
//
//    public List<Contact> sortByZip(Long userId) {
//        return repository.findByUserId(userId)
//                .stream()
//                .sorted(Comparator.comparing(Contact::getZip))
//                .toList();
//    }
//}