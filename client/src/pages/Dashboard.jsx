import React, { useState, useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css"

function Dashboard() {

  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    setUser(false);
    localStorage.removeItem("token");
    navigate("/");
  };

    return (
      <div>
        <h1>Welcome to your Dashboard</h1>
        <button onClick={logout} className="logoutBtn">Logout</button>
      </div>
    );
};

export default Dashboard;