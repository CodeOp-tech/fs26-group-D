import React from "react";
import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import "../App.css";

function Welcome() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = formName => {
    setCurrentForm(formName);
  };

  return (
    <>
      <div className="container my-5">
        <h4 className="display-5">Eat, Code, Repeat</h4>
        <p className="font-monospace">monospace MONOSPACE</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Alias omnis consectetur
          aperiam dicta itaque iste, nobis nesciunt culpa ratione. Repellat ad
          ut delectus tenetur facere. Ducimus corrupti fugiat sunt quo!
        </p>
      </div>
      <div className="bg-midDark text-light">testing backgrounds</div>
      <p className="bg-primary">primary</p>
      <p className="bg-secondary">secondary</p>
      <p className="bg-dark">Dark</p>
      <p className="bg-info">Info</p>
      <p className="bg-midDark">middark</p>
      <p className="bg-altLight">altLight</p>

      {/* <div>
      <div>
        <h1 className="display-1">BusyBytes</h1>
                <div>

        <button className="pushable btn btn-sm">
  <span className="shadow"></span>
  <span className="edge"></span>
  <span className="front">
    LOG IN
  </span>
</button>
            {currentForm === 'login'? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>}
        </div>
      </div>
    </div> */}
    </>
  );
}

export default Welcome;
