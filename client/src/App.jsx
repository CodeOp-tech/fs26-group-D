import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./assets/Pages/Dashboard";
import Welcome from "./pages/Welcome"
import AuthContext from "./context/AuthContext";
import RequireAuth from "./assets/components/RequireAuth";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true)
    }
  }, []);

  function login(email, password) {
    setUser(true)
  }

  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
  };

  const authObject = {
    user,
    login,
    logout,
  }

  return (
  <AuthContext.Provider value={authObject}>
      <div>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/private"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;