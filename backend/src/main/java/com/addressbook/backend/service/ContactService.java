package com.addressbook.backend.service;

import com.addressbook.backend.model.Contact;//Ye Contact entity class ko import karta hai. Iska use hum database data ke liye karte hain
import com.addressbook.backend.repository.ContactRepository; //Ye repository layer ko import karta hai. Repository database operations perform karta hai.
import org.springframework.stereotype.Service; //Ye Spring annotation hai jo class ko Service Layer component banata hai

import java.util.List;

@Service //Spring ko batata hai ki ye service component hai.
public class ContactService {

    private final ContactRepository repository; //Ye repository object hai jo database operations karega

    public ContactService(ContactRepository repository) {
        this.repository = repository;
       // Spring automatically ContactRepository ka object pass karta hai
    }

    public Contact addContact(Contact contact) {
        return repository.save(contact);
        //database me new contact save karna
    }

    public List<Contact> getContacts() {
        return repository.findAll();
        //database se saare contacts fetch karna
    }

    public void deleteContact(Long id) {
        repository.deleteById(id);
    }



    public Contact editContact(Long id, Contact updatedContact) {

        Contact contact = repository.findById(id).orElse(null); //Database se contact search karta hai.

        if(contact != null){ //null return karega

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
}