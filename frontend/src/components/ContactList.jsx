


// import { useEffect, useState } from "react";
// import { getContacts, deleteContact } from "../services/contactService";
// import AddContact from "./AddContact";

// function ContactList() {

//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [search, setSearch] = useState("");
//   const [view, setView] = useState("table");

//   useEffect(() => {
//     loadContacts();
//   }, []);

//   const loadContacts = async () => {
//     const res = await getContacts();
//     setContacts(res.data);
//   };

//   const removeContact = async (id) => {
//     if (window.confirm("Delete this contact?")) {
//       await deleteContact(id);
//       loadContacts();
//     }
//   };

// const filteredContacts = contacts.filter((c) => {
//   const keyword = search.toLowerCase();

//   return (
//     c.firstName?.toLowerCase().includes(keyword) ||
//     c.lastName?.toLowerCase().includes(keyword) ||
//     c.city?.toLowerCase().includes(keyword) ||
//     c.state?.toLowerCase().includes(keyword) ||
//     c.zip?.toLowerCase().includes(keyword) ||
//     c.phoneNumber?.toLowerCase().includes(keyword) ||
//     c.email?.toLowerCase().includes(keyword)
//   );
// });



//   return (
//     <div className="app">

//       <header className="app-header">
//         <div className="brand">
//           <div className="brand-icon">AB</div>
//           <div>
//             <h1>ADDRESS BOOK</h1>
//             <p className="app-subtitle">
//               {contacts.length} Contacts
//             </p>
//           </div>
//         </div>
//       </header>

//       <div className="panel">

//         <div className="panel-header">

//           <input
//             className="search"
//             placeholder="Search contacts..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <div className="panel-actions">

//             <button
//               className="btn btn-secondary"
//               onClick={() => setView(view === "table" ? "card" : "table")}
//             >
//               {view === "table" ? "Card View" : "Table View"}
//             </button>

//             <button
//               className="btn btn-primary"
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
//                 setShowForm(false);
//                 setSelectedContact(null);
//               }}
//             />
//           </div>
//         )}


//         {filteredContacts.length === 0 ? (
//           <div className="empty-state">
//             <h3>No contacts found</h3>
//           </div>
//         ) : view === "table" ? (

//           <table className="contact-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>City</th>
//                 <th>Phone</th>
//                 <th></th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredContacts.map((c) => (
//                 <tr key={c.id}>
//                   <td>
//                     <div className="name-cell">
//                       <div className="avatar">
//                         {c.firstName?.charAt(0)}
//                       </div>
//                       {c.firstName} {c.lastName}
//                     </div>
//                   </td>

//                   <td>{c.email}</td>
//                   <td>{c.city}</td>
//                   <td>{c.phoneNumber}</td>

//                   <td className="row-actions">

//                     <button
//                       className="icon-btn"
//                       onClick={() => {
//                         setSelectedContact(c);
//                         setShowForm(true);
//                       }}
//                     >
//                       ✎
//                     </button>

//                     <button
//                       className="icon-btn danger"
//                       onClick={() => removeContact(c.id)}
//                     >
//                       🗑
//                     </button>

//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//         ) : (

//           <div className="card-grid">

//             {filteredContacts.map((c) => (
//               <div className="contact-card" key={c.id}>

//                 <div className="avatar big">
//                   {c.firstName?.charAt(0)}
//                 </div>

//                 <h3>
//                   {c.firstName} {c.lastName}
//                 </h3>

//                 <p>{c.email}</p>
//                 <p>{c.city}</p>
//                 <p>{c.phoneNumber}</p>

//                 <div className="card-actions">

//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => {
//                       setSelectedContact(c);
//                       setShowForm(true);
//                     }}
//                   >
//                     Edit
//                   </button>

//                   <button
//                     className="btn danger"
//                     onClick={() => removeContact(c.id)}
//                   >
//                     Delete
//                   </button>

//                 </div>

//               </div>
//             ))}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ContactList;

import { useEffect, useState } from "react";
import {
  getContacts,
  deleteContact,
  sortByName,
  sortByCity,
  sortByState,
  sortByZip
} from "../services/contactService";
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

  /* -------- SORT FUNCTIONS -------- */

  const handleSortName = async () => {
    const res = await sortByName();
    setContacts(res.data);
  };

  const handleSortCity = async () => {
    const res = await sortByCity();
    setContacts(res.data);
  };

  const handleSortState = async () => {
    const res = await sortByState();
    setContacts(res.data);
  };

  const handleSortZip = async () => {
    const res = await sortByZip();
    setContacts(res.data);
  };

  /* -------- SEARCH FILTER -------- */

  const filteredContacts = contacts.filter((c) => {
    const keyword = search.toLowerCase();

    return (
      c.firstName?.toLowerCase().includes(keyword) ||
      c.lastName?.toLowerCase().includes(keyword) ||
      c.city?.toLowerCase().includes(keyword) ||
      c.state?.toLowerCase().includes(keyword) ||
      c.zip?.toLowerCase().includes(keyword) ||
      c.phoneNumber?.toString().includes(keyword) ||
      c.email?.toLowerCase().includes(keyword)
    );
  });

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

            {/* SORT BUTTONS */}

            <button className="btn btn-secondary" onClick={handleSortName}>
              Sort Name
            </button>

            <button className="btn btn-secondary" onClick={handleSortCity}>
              Sort City
            </button>

            <button className="btn btn-secondary" onClick={handleSortState}>
              Sort State
            </button>

            <button className="btn btn-secondary" onClick={handleSortZip}>
              Sort Zip
            </button>

            {/* VIEW SWITCH */}

            <button
              className="btn btn-secondary"
              onClick={() => setView(view === "table" ? "card" : "table")}
            >
              {view === "table" ? "Card View" : "Table View"}
            </button>

            {/* ADD CONTACT */}

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