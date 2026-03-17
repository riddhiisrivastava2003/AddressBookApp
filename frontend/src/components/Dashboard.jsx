import ContactList from "./ContactList";

function Dashboard({ currentUser, onLogout }) {
  const displayName = currentUser?.username || currentUser?.name || "User";
  const email = currentUser?.email || "";
  const role = (currentUser?.role || "user").toString();
  const initial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="dashboard">
      <div className="dashboard-bar">
        <div>
          <h2>Dashboard</h2>
          <p className="muted">Logged in as {displayName}</p>
        </div>
        <div className="dashboard-actions">
          <span className={`role-pill ${role}`}>{role}</span>
          <button className="btn btn-secondary" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">{initial}</div>
        <div>
          <h3>{displayName}</h3>
          {email && <p className="muted">{email}</p>}
          <p className="muted">Role: {role}</p>
        </div>
      </div>

      <ContactList />
    </div>
  );
}

export default Dashboard;
