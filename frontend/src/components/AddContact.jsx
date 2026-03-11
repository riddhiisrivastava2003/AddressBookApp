import { useState, useEffect } from "react";
import { addContact, editContact } from "../services/contactService";

function AddContact({ selectedContact, refreshContacts, clearSelection }) {
  const initialState = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    email: ""
  };

  const [contact, setContact] = useState(initialState);
  const isEditing = Boolean(contact.id);

  useEffect(() => {
    if (selectedContact) {
      setContact({ ...initialState, ...selectedContact });
    } else {
      setContact(initialState);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contact.id) {
      await editContact(contact.id, contact);
    } else {
      await addContact(contact);
    }
    setContact(initialState);
    if (clearSelection) clearSelection();
    refreshContacts();
  };

  return (
    <div className="form-card">
      <div className="form-head">
        <p className="form-eyebrow">Contact Manager</p>
        <h2 className="form-title">{isEditing ? "Edit Contact" : "New Contact"}</h2>
        <p className="form-helper">
          Capture the essentials so you can follow up fast.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={contact.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field full-width">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <div className="field full-width">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+91 12345 78900"
            value={contact.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="field full-width">
          <label htmlFor="address">Street address</label>
          <input
            id="address"
            name="address"
            placeholder="42 Lakeside Drive"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            placeholder="Mumbai"
            value={contact.city}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            placeholder="Maharashtra"
            value={contact.state}
            onChange={handleChange}
          />
        </div>
        <div className="field full-width">
          <label htmlFor="zip">Zip code</label>
          <input
            id="zip"
            name="zip"
            placeholder="400001"
            value={contact.zip}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions full-width">
          <button className="btn btn-primary" type="submit">
            {isEditing ? "Save Changes" : "Create Contact"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={clearSelection}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddContact;
