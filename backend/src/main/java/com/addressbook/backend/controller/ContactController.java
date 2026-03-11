//package com.addressbook.backend.controller;
//
//
//
//import com.addressbook.backend.model.Contact;
//import com.addressbook.backend.service.ContactService;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import org.springframework.web.bind.annotation.CrossOrigin;
//
//@RestController
//@RequestMapping("/contacts")
//
//@CrossOrigin(origins = "http://localhost:5173")
//public class ContactController {
//
//    private final ContactService service;
//
//    public ContactController(ContactService service) {
//        this.service = service;
//    }
//
//    @PostMapping
//    public String addContact(@RequestBody Contact contact) {
//        service.addContact(contact);
//        return "Contact Added";
//    }
//
//    @GetMapping
//    public List<Contact> getContacts() {
//        return service.getContacts();
//    }
//
//    @DeleteMapping("/{name}")
//    public String deleteContact(@PathVariable String name) {
//        service.deleteContact(name);
//        return "Contact Deleted";
//    }
//
//    @PutMapping("/{name}")
//    public Contact editContact(@PathVariable String name,
//                               @RequestBody Contact contact) {
//
//        return service.editContact(name, contact);
//    }
//}

package com.addressbook.backend.controller;

import com.addressbook.backend.model.Contact;
import com.addressbook.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

//@RestController
//@RequestMapping("/contacts")
//@CrossOrigin(origins = "http://localhost:5173")
//public class ContactController {
//
//    private final ContactService service;
//
//    public ContactController(ContactService service) {
//        this.service = service;
//    }
//
//    @PostMapping
//    public Contact addContact(@RequestBody Contact contact){
//        return service.addContact(contact);
//    }
//
//    @GetMapping
//    public List<Contact> getContacts(){
//        return service.getContacts();
//    }
//
//    @DeleteMapping("/{id}")
//    public String deleteContact(@PathVariable Long id){
//        service.deleteContact(id);
//        return "Contact Deleted";
//    }
//
//    @PutMapping("/{id}")
//    public Contact editContact(@PathVariable Long id,
//                               @RequestBody Contact contact){
//
//        return service.editContact(id, contact);
//    }
//}



@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactService.getContacts();
    }

    @DeleteMapping("/{id}")
    public String deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return "Contact Deleted";
    }

    @PostMapping
    public Contact addContact(@RequestBody Contact contact) {
        return contactService.addContact(contact);
    }

    @PutMapping("/{id}")
    public Contact editContact(@PathVariable Long id,
                               @RequestBody Contact contact) {
        return contactService.editContact(id, contact);
    }
}