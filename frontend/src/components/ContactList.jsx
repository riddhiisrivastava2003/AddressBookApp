import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import AddContact from "./AddContact";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="app-kicker">Address Book</p>
            <h1 className="app-title">Keep every contact close</h1>
            <p className="app-subtitle">
              Add, update, and manage professional connections in one place.
            </p>
          </div>
          <div className="app-meta">
            <div className="meta-card">
              <span className="meta-label">Total contacts</span>
              <span className="meta-value">{contacts.length}</span>
            </div>
            <button
              className="theme-toggle"
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </header>

        <div className="app-layout">
          <aside className="panel">
            <AddContact
              selectedContact={selectedContact}
              refreshContacts={loadContacts}
              clearSelection={() => setSelectedContact(null)}
            />
          </aside>

          <main>
            <div className="section-header">
              <h2>Contact List</h2>
              <p>{contacts.length} entries</p>
            </div>

            <div className="contact-grid">
              {contacts.length === 0 ? (
                <div className="empty-state">
                  <h3>No contacts yet</h3>
                  <p>Start by adding a new contact from the form.</p>
                </div>
              ) : (
                contacts.map((c) => (
                  <div key={c.id} className="contact-card">
                    <div className="contact-header">
                      <div>
                        <h3 className="contact-name">
                          {c.firstName} {c.lastName}
                        </h3>
                        <div className="contact-meta">
                          <span className="pill">
                            {(c.city || "City")}{c.state ? `, ${c.state}` : ""}
                          </span>
                          <span className="pill">{c.email || "No email"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="contact-info">
                      <div className="info-row">
                        <span className="info-label">Phone</span>
                        <span className="info-value">
                          {c.phoneNumber || "N/A"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Address</span>
                        <span className="info-value">
                          {c.address ? c.address : "N/A"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Zip</span>
                        <span className="info-value">{c.zip || "N/A"}</span>
                      </div>
                    </div>

                    <div className="action-btns">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedContact(c)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeContact(c.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
