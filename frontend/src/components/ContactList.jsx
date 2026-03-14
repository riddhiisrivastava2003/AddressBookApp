// import { useEffect, useState } from "react";
// import { getContacts, deleteContact } from "../services/contactService";
// import AddContact from "./AddContact";

// function ContactList() {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [showForm, setShowForm] = useState(true);

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = async () => {
//     const res = await getContacts();
//     setContacts(res.data);
//   };

//   const removeContact = async (id) => {
//     if (window.confirm("Are you sure you want to delete this contact?")) {
//       await deleteContact(id);
//       loadContacts();
//     }
//   };

//   return (
//     <div className="app">
//       <header className="app-header">
//         <div className="brand">
//           <div className="brand-icon">AB</div>
//           <div>
//             <h1>ADDRESS BOOK</h1>
//             <p className="app-subtitle">Person Details</p>
//           </div>
//         </div>
//       </header>

//       <div className="panel">
//         <div className="panel-header">
//           <h2>Person Details</h2>
//           <div className="panel-actions">
//             <button
//               className="btn btn-primary"
//               type="button"
//               onClick={() => {
//                 setSelectedContact(null);
//                 setShowForm(true);
//               }}
//             >
//               + Add Person
//             </button>
//           </div>
//         </div>

//         {showForm && (
//           <div className="form-wrapper">
//             <AddContact
//               selectedContact={selectedContact}
//               refreshContacts={loadContacts}
//               clearSelection={() => setSelectedContact(null)}
//               onClose={() => {
//                 setSelectedContact(null);
//                 setShowForm(false);
//               }}
//             />
//           </div>
//         )}

//         <div className="table-wrap">
//           {contacts.length === 0 ? (
//             <div className="empty-state">
//               <h3>No contacts yet</h3>
//               <p>Click “Add Person” to create the first entry.</p>
//             </div>
//           ) : (
//             <table className="contact-table">
//               <thead>
//                 <tr>
//                   <th>Fullname</th>
//                   <th>Email</th>
//                   <th>Address</th>
//                   <th>City</th>
//                   <th>State</th>
//                   <th>Zip Code</th>
//                   <th>Phone Number</th>
//                   <th className="actions-col"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {contacts.map((c) => (
//                   <tr key={c.id}>
//                     <td>{`${c.firstName || ""} ${c.lastName || ""}`.trim() || "N/A"}</td>
//                     <td>{c.email || "N/A"}</td>
//                     <td>{c.address || "N/A"}</td>
//                     <td>{c.city || "N/A"}</td>
//                     <td>{c.state || "N/A"}</td>
//                     <td>{c.zip || "N/A"}</td>
//                     <td>{c.phoneNumber || "N/A"}</td>
//                     <td className="row-actions">
//                       <button
//                         className="icon-btn"
//                         type="button"
//                         onClick={() => {
//                           setSelectedContact(c);
//                           setShowForm(true);
//                         }}
//                         aria-label="Edit"
//                       >
//                         ✎
//                       </button>
//                       <button
//                         className="icon-btn danger"
//                         type="button"
//                         onClick={() => removeContact(c.id)}
//                         aria-label="Delete"
//                       >
//                         🗑
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContactList;


import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import AddContact from "./AddContact";

function ContactList() {

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const res = await getContacts();
    setContacts(res.data);
  };

  const removeContact = async (id) => {
    if (window.confirm("Delete this contact?")) {
      await deleteContact(id);
      loadContacts();
    }
  };

  const filteredContacts = contacts.filter((c) =>
    `${c.firstName} ${c.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">AB</div>
          <div>
            <h1>ADDRESS BOOK</h1>
            <p className="app-subtitle">
              {contacts.length} Contacts
            </p>
          </div>
        </div>
      </header>

      <div className="panel">

        <div className="panel-header">

          <input
            className="search"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="panel-actions">

            <button
              className="btn btn-secondary"
              onClick={() => setView(view === "table" ? "card" : "table")}
            >
              {view === "table" ? "Card View" : "Table View"}
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedContact(null);
                setShowForm(true);
              }}
            >
              + Add Person
            </button>

          </div>
        </div>


        {showForm && (
          <div className="form-wrapper">
            <AddContact
              selectedContact={selectedContact}
              refreshContacts={loadContacts}
              clearSelection={() => setSelectedContact(null)}
              onClose={() => {
                setShowForm(false);
                setSelectedContact(null);
              }}
            />
          </div>
        )}


        {filteredContacts.length === 0 ? (
          <div className="empty-state">
            <h3>No contacts found</h3>
          </div>
        ) : view === "table" ? (

          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredContacts.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="name-cell">
                      <div className="avatar">
                        {c.firstName?.charAt(0)}
                      </div>
                      {c.firstName} {c.lastName}
                    </div>
                  </td>

                  <td>{c.email}</td>
                  <td>{c.city}</td>
                  <td>{c.phoneNumber}</td>

                  <td className="row-actions">

                    <button
                      className="icon-btn"
                      onClick={() => {
                        setSelectedContact(c);
                        setShowForm(true);
                      }}
                    >
                      ✎
                    </button>

                    <button
                      className="icon-btn danger"
                      onClick={() => removeContact(c.id)}
                    >
                      🗑
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        ) : (

          <div className="card-grid">

            {filteredContacts.map((c) => (
              <div className="contact-card" key={c.id}>

                <div className="avatar big">
                  {c.firstName?.charAt(0)}
                </div>

                <h3>
                  {c.firstName} {c.lastName}
                </h3>

                <p>{c.email}</p>
                <p>{c.city}</p>
                <p>{c.phoneNumber}</p>

                <div className="card-actions">

                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedContact(c);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn danger"
                    onClick={() => removeContact(c.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;