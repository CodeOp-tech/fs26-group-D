import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import axios from "axios";
import "../App.css";

function Login({
  currentForm,
  setCurrentForm,
  isOpen,
  setIsOpen,
  showModal,
  hideModal,
  toggleForm,
  onFormSwitch
  // login,
  // credentials,
  // setCredentials
}) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = credentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async e => {
    e.preventDefault();

    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials
      });

      localStorage.setItem("token", data.token);
      auth.login();

      navigate("/private/dashboard");

      console.log(data.message, data.token);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Incorrect email or password");
      } else {
        console.log("Error:", err);
      }
    }
  };

  return (
    <>
      <section className=" container">
        <div className="container   m-2">
          {/* <div className="row justify-content-center"> */}

          {/* <div className="row g-0 border-bottom border-end border-3 border-secondary shadow"> */}
          <div className="row m-0 border-bottom border-3 border-primary shadow rounded ">
            <div className="col-md-5 bg-aquaLight rounded">
              <div className="rounded">img placeholder</div>
            </div>
            <div className="col-md-7">
              <div className="card-body text-center">
                <div className="text-end">
                  <h1 className="card-title display-5 fs-4 p-3">
                    Welcome Back
                  </h1>
                </div>

                <div className="card-contents px-3 py-1">
                  <form onSubmit={login} className="login-form">
                    <label htmlFor="email" className="h5">
                      Email
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">@</span>
                      <input
                        value={email}
                        type="email"
                        placeholder="youremail@domain.com"
                        name="email"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <label htmlFor="password" className="h5">
                      Password
                    </label>
                    <input
                      value={password}
                      name="password"
                      type="password"
                      placeholder="***********"
                      onChange={handleChange}
                      className="form-control mb-3"
                    />
                    <div className="">
                      <button
                        type="submit"
                        className="btn mb-3 pushable-s"
                        onClick={() => {
                          hideModal();
                        }}
                      >
                        <span className="shadow-btn-s"></span>
                        <span className="edge-s"></span>
                        <span className="front-s"> LOG IN </span>
                      </button>
                    </div>
                  </form>

                  <button
                    className="btn font-monospace"
                    onClick={() => onFormSwitch("register")}
                  >
                    Don't have an account?
                    <span className="font-monospace text-secondary">
                      {" "}
                      Register here.
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* </div> */}
          {/* </div> */}
        </div>
      </section>
    </>
  );
}

export default Login;
