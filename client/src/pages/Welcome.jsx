import React from "react";
import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import "../App.css";
import { Link } from "react-router-dom";

function Welcome() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = formName => {
    setCurrentForm(formName);
  };

  return (
    <>
      <section id="hero" className="text-light bg-dark hero-banner">
        <div className="grid container-lg">
          <div className="row">
            <div className="col text-start ">
              <h1 className="display-3 mt-5 pt-5 mb-3">
                EAT, <span className="text-secondary">CODE, </span>{" "}
                <span className="text-primary display-2">REPEAT</span>
              </h1>
            </div>

            <div className="col-6 text-center">
              <div className=" container mt-5 pt-4 col-8">
                <div className="mt-5 pt-5 text-secondary">
                  placeholder for image
                </div>
              </div>
              <div className="row mt-5 pt-5 mb-0 pb-0 ">
                <div className="text-end">
                  <button className="btn btn-primary btn-lg">
                    GET STARTED
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center text-center mt-5">
            <p className="mb-0 pb-0">Learn more </p>

            <i class="bi bi-caret-down-fill white pt-0"></i>
          </div>
        </div>
      </section>

      {/* <div className="container my-5"> */}
      {/* <section id="intro">
<div className="container-lg">
  <div className="row justify-content-center bg-primary">
    <div className="text-center">
    <h2 className="display-5 fs-3">Eat, Code, Repeat</h2>
      
      test column
      
      
      </div>
  </div>
</div>
</section> */}

      {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Alias omnis consectetur
          aperiam dicta itaque iste, nobis nesciunt culpa ratione. Repellat ad
          ut delectus tenetur facere. Ducimus corrupti fugiat sunt quo!
        </p> */}
      {/* </div> */}

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
