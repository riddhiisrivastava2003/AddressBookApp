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
    id: null,
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
      setContact({ ...selectedContact });
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
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      zip: contact.zip,
      phoneNumber: contact.phoneNumber,
      email: contact.email
    };

    try {
      if (isEditing) {
        await editContact(contact.id, payload);
      } else {
        await addContact(payload); // ✅ add with logged-in username
      }

      setContact(initialState);

      if (clearSelection) clearSelection();

      refreshContacts();

      if (onClose) onClose();

    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="form-icon">👤</div>
        <h2>{isEditing ? "Edit Person" : "Add Person"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="form-grid">

        <div className="field">
          <label>First Name *</label>
          <input
            name="firstName"
            placeholder="Enter first name"
            value={contact.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>Last Name *</label>
          <input
            name="lastName"
            placeholder="Enter last name"
            value={contact.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field full-width">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>

        <div className="field full-width">
          <label>Address *</label>
          <textarea
            name="address"
            placeholder="Enter address"
            value={contact.address}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="field">
          <label>City *</label>
          <input
            name="city"
            placeholder="Enter city"
            value={contact.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label>State *</label>
          <select
            name="state"
            value={contact.state}
            onChange={handleChange}
            required
          >
            {STATE_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value === ""}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Zip Code *</label>
          <input
            name="zip"
            placeholder="Enter zip code"
            value={contact.zip}
            onChange={handleChange}
            pattern="[0-9]{6}"
            required
          />
        </div>

        <div className="field">
          <label>Phone Number *</label>
          <input
            name="phoneNumber"
            placeholder="Enter phone number"
            value={contact.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="form-actions full-width">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
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



// import { useState, useEffect } from "react";
// import { addContact, editContact } from "../services/contactService";

// const STATE_OPTIONS = [
//   { label: "Select state", value: "" },
//   { label: "Andhra Pradesh", value: "Andhra Pradesh" },
//   { label: "Delhi", value: "Delhi" },
//   { label: "Gujarat", value: "Gujarat" },
//   { label: "Karnataka", value: "Karnataka" },
//   { label: "Maharashtra", value: "Maharashtra" },
//   { label: "Rajasthan", value: "Rajasthan" },
//   { label: "Tamil Nadu", value: "Tamil Nadu" },
//   { label: "Telangana", value: "Telangana" },
//   { label: "Uttar Pradesh", value: "Uttar Pradesh" },
//   { label: "West Bengal", value: "West Bengal" }
// ];

// function AddContact({ selectedContact, refreshContacts, clearSelection, onClose }) {

//   const initialState = {
//     id: null,
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     phoneNumber: "",
//     email: ""
//   };

//   const [contact, setContact] = useState(initialState);

//   const isEditing = Boolean(contact.id);

//   useEffect(() => {
//     if (selectedContact) {
//       setContact({ ...selectedContact });
//     } else {
//       setContact(initialState);
//     }
//   }, [selectedContact]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setContact({
//       ...contact,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       firstName: contact.firstName,
//       lastName: contact.lastName,
//       address: contact.address,
//       city: contact.city,
//       state: contact.state,
//       zip: contact.zip,
//       phoneNumber: contact.phoneNumber,
//       email: contact.email
//     };

//     try {

//       if (isEditing) {
//         await editContact(contact.id, payload);
//       } else {
//         await addContact(payload);
//       }

//       setContact(initialState);

//       if (clearSelection) clearSelection();

//       refreshContacts();

//       if (onClose) onClose();

//     } catch (error) {
//       console.error("Error saving contact:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="form-card">

//       <div className="form-header">
//         <div className="form-icon">👤</div>
//         <h2>{isEditing ? "Edit Person" : "Add Person"}</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="form-grid">

//         <div className="field">
//           <label>First Name *</label>
//           <input
//             name="firstName"
//             placeholder="Enter first name"
//             value={contact.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="field">
//           <label>Last Name *</label>
//           <input
//             name="lastName"
//             placeholder="Enter last name"
//             value={contact.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="field full-width">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={contact.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="field full-width">
//           <label>Address *</label>
//           <textarea
//             name="address"
//             placeholder="Enter address"
//             value={contact.address}
//             onChange={handleChange}
//             rows={3}
//             required
//           />
//         </div>

//         <div className="field">
//           <label>City *</label>
//           <input
//             name="city"
//             placeholder="Enter city"
//             value={contact.city}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="field">
//           <label>State *</label>
//           <select
//             name="state"
//             value={contact.state}
//             onChange={handleChange}
//             required
//           >
//             {STATE_OPTIONS.map((option) => (
//               <option
//                 key={option.value}
//                 value={option.value}
//                 disabled={option.value === ""}
//               >
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="field">
//           <label>Zip Code *</label>
//           <input
//             name="zip"
//             placeholder="Enter zip code"
//             value={contact.zip}
//             onChange={handleChange}
//             pattern="[0-9]{6}"
//             required
//           />
//         </div>

//         <div className="field">
//           <label>Phone Number *</label>
//           <input
//             name="phoneNumber"
//             placeholder="Enter phone number"
//             value={contact.phoneNumber}
//             onChange={handleChange}
//             pattern="[0-9]{10}"
//             required
//           />
//         </div>

//         <div className="form-actions full-width">

//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={onClose}
//           >
//             Cancel
//           </button>

//           <button className="btn btn-primary" type="submit">
//             {isEditing ? "Update" : "Add"}
//           </button>

//         </div>

//       </form>

//     </div>
//   );
// }

// export default AddContact;