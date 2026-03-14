import { useState, useEffect } from "react";
import { addContact, editContact } from "../services/contactService";

const STATE_OPTIONS = [
  { label: "Select state", value: "" },
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Delhi", value: "Delhi" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Telangana", value: "Telangana" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "West Bengal", value: "West Bengal" }
];

function AddContact({ selectedContact, refreshContacts, clearSelection, onClose }) {
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
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      zip: contact.zip,
      phoneNumber: contact.phoneNumber,
      email: contact.email
    };
    if (payload.id) {
      await editContact(payload.id, payload);
    } else {
      await addContact(payload);
    }
    setContact(initialState);
    if (clearSelection) clearSelection();
    refreshContacts();
    if (onClose && !isEditing) onClose();
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-icon">👤</div>
        <h2>{isEditing ? "Edit Person" : "Add Person"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="field">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Enter first name"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Enter last name"
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
            placeholder="Enter email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>

        <div className="field full-width">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter address"
            value={contact.address}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>

        <div className="field">
          <label htmlFor="city">City *</label>
          <input
            id="city"
            name="city"
            placeholder="Enter city"
            value={contact.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="state">State *</label>
          <select
            id="state"
            name="state"
            value={contact.state}
            onChange={handleChange}
            required
          >
            {STATE_OPTIONS.map((option) => (
              <option
                key={option.label}
                value={option.value}
                disabled={option.value === ""}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="zip">Zip Code *</label>
          <input
            id="zip"
            name="zip"
            placeholder="Enter zip code"
            value={contact.zip}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter phone number"
            value={contact.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions full-width">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
