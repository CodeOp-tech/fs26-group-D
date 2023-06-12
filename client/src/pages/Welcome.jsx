import React from "react";
import {useState} from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import "../App.css"

function Welcome() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div>
      <div>
        <h1>👨‍🍳 DevDish 👩‍🍳</h1>
        <div>
            {currentForm === 'login'? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}
        </div>
      </div>
    </div>
  );
}

export default Welcome;