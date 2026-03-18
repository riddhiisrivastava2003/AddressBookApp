import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/contactService";

const DEFAULT_ROLE = "USER";

function normalizeUser(payload, responseData) {
  if (responseData) {
    if (responseData.user) {
      return { ...payload, ...responseData.user };
    }
    if (typeof responseData === "object") {
      return { ...payload, ...responseData };
    }
  }
  return payload;
}

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    role: DEFAULT_ROLE
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    role: DEFAULT_ROLE
  });

  const activeForm = useMemo(
    () => (mode === "login" ? loginForm : registerForm),
    [mode, loginForm, registerForm]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (mode === "login") {
      setLoginForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setRegisterForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   try {
  //     if (mode === "login") {
  //       const payload = {
  //         username: loginForm.username.trim(),
  //         password: loginForm.password,
  //         role: loginForm.role
  //       };
  //       const response = await loginUser(payload);
  //       const user = normalizeUser(payload, response?.data);
  //       if (onAuthSuccess) onAuthSuccess(user);
  //       navigate("/dashboard");
  //     } else {
  //       const payload = {
  //         username: registerForm.username.trim(),
  //         email: registerForm.email.trim(),
  //         password: registerForm.password,
  //         role: registerForm.role
  //       };
  //       const response = await registerUser(payload);
  //       const user = normalizeUser(payload, response?.data);
  //       if (onAuthSuccess) onAuthSuccess(user);
  //       navigate("/dashboard");
  //     }
  //   } catch (err) {
  //     console.error("Auth error", err);
  //     setError("Login/Register failed. Please check details or backend.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event) => {
  event.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (mode === "login") {
      const payload = {
        username: loginForm.username.trim(),
        password: loginForm.password
      };
      const response = await loginUser(payload);
      if(response.data && response.data.username){
        const user = response.data;
        if(onAuthSuccess) onAuthSuccess(user);
        if(user.role === "ADMIN") navigate("/admin/dashboard");
        else navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } else {
      const payload = {
        username: registerForm.username.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        role: registerForm.role
      };
      const response = await registerUser(payload);
      if(response.data && response.data.username){
        const user = response.data;
        if(onAuthSuccess) onAuthSuccess(user);
        navigate("/dashboard");
      }
    }
  } catch (err) {
    console.error("Auth error", err);
    setError("Login/Register failed. Please check details or backend.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-layout">
      <div className="auth-shell">
        <div className="auth-info">
          <span className="auth-pill">Spring Boot connected</span>
          <h2>Welcome back to Address Book</h2>
          <p className="muted">
            Manage contacts with a secure, role-aware workflow. Your sessions stay protected and in sync with the backend.
          </p>
          <div className="auth-info-list">
            <div>Role based access control</div>
            <div>Fast search and sorting</div>
            <div>Session aware routing</div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <div className="brand-icon">AB</div>
            <div>
              <h1>Address Book</h1>
              <p className="muted">Login or create an account</p>
            </div>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === "login" ? "active" : ""}`}
              type="button"
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`auth-tab ${mode === "register" ? "active" : ""}`}
              type="button"
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Role</label>
              <select name="role" value={activeForm.role} onChange={handleChange}>
  <option value="USER">User</option>
  <option value="ADMIN">Admin</option>
</select>
            </div>

            <div className="field">
              <label>Username</label>
              <input
                name="username"
                placeholder="Enter username"
                value={activeForm.username}
                onChange={handleChange}
                required
              />
            </div>

            {mode === "register" && (
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={registerForm.email}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={activeForm.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            {mode === "login" ? "New here? Switch to Register." : "Already have an account? Switch to Login."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
