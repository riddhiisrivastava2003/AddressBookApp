import { useState } from "react";
import { Link } from "react-router-dom";

const TABS = [
  {
    id: "contacts",
    title: "Smart Contacts",
    description: "Store every detail, keep them organized, and access them instantly."
  },
  {
    id: "search",
    title: "Fast Search",
    description: "Find people in seconds with powerful filters and sorting."
  },
  {
    id: "roles",
    title: "Role Based",
    description: "Separate user and admin experiences for clearer control."
  }
];

function LandingPage({ currentUser }) {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const activeContent = TABS.find((tab) => tab.id === activeTab);

  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="brand">
          <div className="brand-icon">AB</div>
          <div>
            <h1>Address Book</h1>
            <p className="muted">Professional contact management</p>
          </div>
        </div>
        <div className="landing-actions">
          <Link className="btn btn-secondary" to="/auth">
            Login
          </Link>
          <Link className="btn btn-primary" to={currentUser ? "/dashboard" : "/auth"}>
            {currentUser ? "Open Dashboard" : "Get Started"}
          </Link>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="hero-pill">Secure. Organized. Fast.</span>
          <h2>Keep your team connected with a modern address book.</h2>
          <p className="muted hero-sub">
            A clean workspace for your contacts with role-based access, smart sorting, and a dashboard that always knows who is logged in.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/auth">
              Create Account
            </Link>
            <Link className="btn btn-secondary" to="/auth">
              Login
            </Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-stat">
            <h3>24/7 Access</h3>
            <p className="muted">Your contact hub is always ready.</p>
          </div>
          <div className="hero-stat">
            <h3>Role Aware</h3>
            <p className="muted">Admin & user views stay aligned.</p>
          </div>
          <div className="hero-stat">
            <h3>Fast Sorting</h3>
            <p className="muted">Organize by name, city, or state.</p>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <div className="feature-card">
          <h4>Interactive Dashboard</h4>
          <p className="muted">See who is logged in and jump into your contacts instantly.</p>
        </div>
        <div className="feature-card">
          <h4>Secure Sessions</h4>
          <p className="muted">Session-aware routing keeps your data protected.</p>
        </div>
        <div className="feature-card">
          <h4>Clean UI</h4>
          <p className="muted">Focused layouts that feel premium and professional.</p>
        </div>
      </section>

      <section className="stat-strip">
        <div>
          <h3>99.9%</h3>
          <p className="muted">Uptime-ready workflows</p>
        </div>
        <div>
          <h3>2 min</h3>
          <p className="muted">Average onboarding time</p>
        </div>
        <div>
          <h3>24/7</h3>
          <p className="muted">Contact access from anywhere</p>
        </div>
      </section>

      <section className="tab-section">
        <div className="tab-buttons">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tab-panel">
          <h3>{activeContent.title}</h3>
          <p className="muted">{activeContent.description}</p>
          <Link className="btn btn-primary" to="/auth">
            Explore Now
          </Link>
        </div>
      </section>

      <section className="workflow">
        <div className="workflow-card">
          <span>01</span>
          <h4>Create account</h4>
          <p className="muted">Register quickly and choose user or admin role.</p>
        </div>
        <div className="workflow-card">
          <span>02</span>
          <h4>Manage contacts</h4>
          <p className="muted">Add, edit, sort, and search your contacts in one place.</p>
        </div>
        <div className="workflow-card">
          <span>03</span>
          <h4>Stay organized</h4>
          <p className="muted">Keep your team aligned with role-based visibility.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p className="muted">Built for teams who want contacts organized and accessible.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
