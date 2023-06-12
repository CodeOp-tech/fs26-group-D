import React, { useState, useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

function Dashboard() {

  const auth = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("")

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch(`/api/auth/user`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        // console.log(data)
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      setError(err.message);
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!user) {
      return <div>Loading...</div>;
    }
  }

  const logout = () => {
    auth.logout();
    setUser(false);
    localStorage.removeItem("token");
    navigate("/");
  };

    return (
      <div>
        <h1>Welcome to your Dashboard</h1>
        <div className="profile-container">
          <div className="profile-pic">
            <img className="pic" src="https://i.pinimg.com/736x/44/76/18/447618cb49cf25bccc9ce1c252ca4c5a.jpg" height={300} width={300}/>
          </div>
          <div className="profile-info">
            <h2>User Information:</h2>
            {user.map((obj) => (
              <div>
                  <p>First Name: {obj.firstname}</p>
                  <p>Last Name: {obj.lastname}</p>
                  <p>Email: {obj.email}</p>
              </div>
            )
          )}
          </div>
        </div>
        <button onClick={logout} className="logoutBtn">Logout</button>
      </div>
    );
};

export default Dashboard;