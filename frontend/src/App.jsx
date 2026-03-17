import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import "./App.css";
import { logoutUser } from "./services/contactService";

const STORAGE_KEY = "ab_logged_in_user";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.warn("Invalid stored user data", error);
      }
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn("Logout failed", error);
    } finally {
      localStorage.removeItem(STORAGE_KEY);
      setCurrentUser(null);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage currentUser={currentUser} />} />
      <Route
        path="/auth"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthPage onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          currentUser ? (
            <Dashboard currentUser={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
