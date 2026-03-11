
package com.addressbook.backend.controller;

import com.addressbook.backend.model.Contact; //Contact entity use karne ke liye
import com.addressbook.backend.service.ContactService; //Business logic call karne ke liye
import org.springframework.beans.factory.annotation.Autowired; //Ye Dependency Injection ke liye use hota hai Spring automatically object create karta hai.
import org.springframework.web.bind.annotation.*; //Ye Spring Web annotations import karta hai.
import org.springframework.web.bind.annotation.CrossOrigin; //Ye CORS (Cross Origin Resource Sharing) ke liye use hota hai.React frontend se request allow karne ke liye.

import java.util.List;


@RestController //Controller JSON response return karega
@RequestMapping("/contacts") //Ye base URL define karta hai   http://localhost:8080/contacts.
@CrossOrigin(origins = "*")//Backend allow karega requests from frontend


public class ContactController {//Ye class contacts related APIs handle karegi

    @Autowired
    private ContactService contactService;
    //Spring automatically ContactService ka object inject karta hai.
    //Controller → Service → Repository → Database

    @GetMapping //GET /contacts
    public List<Contact> getAllContacts() {
        return contactService.getContacts();
    }

    @DeleteMapping("/{id}") //DELETE /contacts/{id}
    //@PathVariable URL se value read karta hai.
    public String deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return "Contact Deleted";
    }

    @PostMapping
    public Contact addContact(@RequestBody Contact contact) {
//        @RequestBody  JSON → Java Object conversion.
        return contactService.addContact(contact);
    }

//    Frontend->Controller->Service->Repository.save()->Database

    @PutMapping("/{id}") //PUT /contacts/{id}
    public Contact editContact(@PathVariable Long id,
                               @RequestBody Contact contact) {
        return contactService.editContact(id, contact);
    }

  //  Frontend->Controller->Service->Find Contact by ID->Update fields->Save to DB
}