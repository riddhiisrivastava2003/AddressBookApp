import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import AddContact from "./AddContact";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const res = await getContacts();
    setContacts(res.data);
  };

  const removeContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
      loadContacts();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">AB</div>
          <div>
            <h1>ADDRESS BOOK</h1>
            <p className="app-subtitle">Person Details</p>
          </div>
        </div>
      </header>

      <div className="panel">
        <div className="panel-header">
          <h2>Person Details</h2>
          <div className="panel-actions">
            <button
              className="btn btn-primary"
              type="button"
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
                setSelectedContact(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        <div className="table-wrap">
          {contacts.length === 0 ? (
            <div className="empty-state">
              <h3>No contacts yet</h3>
              <p>Click “Add Person” to create the first entry.</p>
            </div>
          ) : (
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Phone Number</th>
                  <th className="actions-col"></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{`${c.firstName || ""} ${c.lastName || ""}`.trim() || "N/A"}</td>
                    <td>{c.email || "N/A"}</td>
                    <td>{c.address || "N/A"}</td>
                    <td>{c.city || "N/A"}</td>
                    <td>{c.state || "N/A"}</td>
                    <td>{c.zip || "N/A"}</td>
                    <td>{c.phoneNumber || "N/A"}</td>
                    <td className="row-actions">
                      <button
                        className="icon-btn"
                        type="button"
                        onClick={() => {
                          setSelectedContact(c);
                          setShowForm(true);
                        }}
                        aria-label="Edit"
                      >
                        ✎
                      </button>
                      <button
                        className="icon-btn danger"
                        type="button"
                        onClick={() => removeContact(c.id)}
                        aria-label="Delete"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactList;
