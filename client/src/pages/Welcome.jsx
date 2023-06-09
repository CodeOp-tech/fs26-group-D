import React from "react";
import {useState} from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function Welcome() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div>
      <div>
        <h1>Meal Planner App 📖</h1>
        <div>
            {currentForm === 'login'? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}
        </div>
      </div>
    </div>
  );
}

export default Welcome;