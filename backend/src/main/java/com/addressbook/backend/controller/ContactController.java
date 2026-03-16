
package com.addressbook.backend.controller;

import com.addressbook.backend.model.Contact; //Contact entity use karne ke liye
import com.addressbook.backend.service.ContactService; //Business logic call karne ke liye
import org.springframework.beans.factory.annotation.Autowired; //Ye Dependency Injection ke liye use hota hai Spring automatically object create karta hai.
import org.springframework.web.bind.annotation.*; //Ye Spring Web annotations import karta hai.
import org.springframework.web.bind.annotation.CrossOrigin; //Ye CORS (Cross Origin Resource Sharing) ke liye use hota hai.React frontend se request allow karne ke liye.

import java.util.List;


@RestController //Controller JSON response return karega // isme rest api controller h @Controller+@ResponseBody
@RequestMapping("/contacts") //Ye base URL define karta hai   http://localhost:8080/contacts.
@CrossOrigin(origins = "*")//Backend allow karega requests from frontend


public class ContactController {//Ye class contacts related APIs handle karegi

    @Autowired //@Autowired is used in Spring to automatically inject the required dependency (object) into a class
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

    // UC7 Search by City
    @GetMapping("/city/{city}")
    public List<Contact> searchByCity(@PathVariable String city) {
        return contactService.searchByCity(city);
    }

    // UC7 Search by State
    @GetMapping("/state/{state}")
    public List<Contact> searchByState(@PathVariable String state) {
        return contactService.searchByState(state);
    }

    // UC9 Count by City
    @GetMapping("/count/city/{city}")
    public long countByCity(@PathVariable String city) {
        return contactService.countByCity(city);
    }

    // UC9 Count by State
    @GetMapping("/count/state/{state}")
    public long countByState(@PathVariable String state) {
        return contactService.countByState(state);
    }

    // UC10 Sort by Name
    @GetMapping("/sort/name")
    public List<Contact> sortByName() {
        return contactService.sortByName();
    }

    // UC11 Sort by City
    @GetMapping("/sort/city")
    public List<Contact> sortByCity() {
        return contactService.sortByCity();
    }

    // UC11 Sort by State
    @GetMapping("/sort/state")
    public List<Contact> sortByState() {
        return contactService.sortByState();
    }

    // UC11 Sort by Zip
    @GetMapping("/sort/zip")
    public List<Contact> sortByZip() {
        return contactService.sortByZip();
    }


}