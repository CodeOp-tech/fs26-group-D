import React, { useRef, useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register({ hideModal, onFormSwitch }) {
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [firstname, setFirstName] = useState("");

  const [lastname, setLastName] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(input.email);
    // console.log(result);
    // console.log(input.email);
    setValidEmail(result);
  }, [input.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(input.password);
    // console.log(result);
    // console.log(input.password);
    setValidPwd(result);
    const match = input.password === matchPwd;
    // console.log(match);
    setValidMatch(match);
  }, [input.password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    setIsLoading(true);
    const v1 = EMAIL_REGEX.test(input.email);
    const v2 = PWD_REGEX.test(input.password);
    if (!v1 || !v2) {
      setErrMsg("Invalid password or email.");
      setIsLoading(false);
      return;
    }
    addUser()
      .then(() => {
        navigate("/login");
        // navigate("/");
        // setCurrentForm("login");
        // showModal();
        // () => onFormSwitch("login")
        setIsLoading(false);
      })
      .catch(err => {
        setErrMsg(err.message);
        setIsLoading(false);
      });
  };

  const addUser = async () => {
    const user = {
      firstname: input.firstname,
      lastname: input.lastname,
      email: input.email,
      password: input.password
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    };
    try {
      const response = await fetch("/api/auth/register", options);

      if (!response.ok) throw new Error(response.statusText);
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <>
      <section className=" ">
        <div className="container m-2">
          {/* <div className="row justify-content-center"> */}
          {/* <div className="col-10 m-4">
              <div className="card"> */}
          <div className="row m-0 border-bottom border-3 border-primary shadow rounded">
            <div className="col-md-5 bg-blueLight rounded">
              <div className="container">img placeholder</div>
            </div>
            <div className="col-md-7">
              <div className="card-body text-center">
                <div className="text-end">
                  <h1 className="card-title display-5 fs-4 p-3">Sign Up</h1>
                </div>

                <div className="card-contents px-3 py-1">
                  <section>
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    ></p>
                  </section>

                  <form onSubmit={handleSubmit} className="login-form">
                    <div className="row py-2">
                      <div className="col-6">
                        <label htmlFor="firstname" className="font-monospace">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          id="firstname"
                          name="firstname"
                          required
                          onChange={handleInputChange}
                          className="form-control py-2"
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="lastname" className="font-monospace">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          id="lastname"
                          name="lastname"
                          required
                          onChange={handleInputChange}
                          className="form-control py-2"
                        />
                      </div>
                    </div>

                    <div className="">
                      <label htmlFor="email" className="font-monospace">
                        Email address
                        <span className={validEmail ? "valid" : "hide"}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span
                          className={!validEmail || email ? "invalid" : "hide"}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="youremail@domain.com"
                        id="email"
                        name="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={handleInputChange}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        className="form-control py-2"
                      />
                      <p
                        id="uidnote"
                        className={
                          emailFocus && !email && !validEmail
                            ? "instructions"
                            : "offscreen"
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Valid email address required.
                      </p>
                    </div>
                    <label htmlFor="password" className="font-monospace">
                      Password
                      <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={!validPwd || password ? "invalid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="***********"
                      id="password"
                      name="password"
                      required
                      onChange={handleInputChange}
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      className="form-control py-2"
                    />
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? "instructions" : "offscreen"
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters. <br />
                      Must include uppercase and lowercase letters, a number and
                      special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>
                      <span aria-label="hashtag">#</span>
                      <span aria-label="dollar sign">$</span>
                      <span aria-label="percent">%</span>
                    </p>
                    <label htmlFor="confirm_pwd" className="font-monospace">
                      Confirm Password
                      <span
                        className={validMatch && matchPwd ? "valid" : "hide"}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                      <span
                        className={
                          !validMatch || !matchPwd ? "invalid" : "hide"
                        }
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </label>
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="***********"
                        id="confirm_pwd"
                        required
                        onChange={e => setMatchPwd(e.target.value)}
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className="form-control py-2"
                      />
                      <p
                        id="confirm_pwd"
                        className={!validMatch ? "instructions" : "offscreen"}
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                      </p>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => {
                          hideModal();
                        }}
                        type="submit"
                        className="btn mb-3 pushable-b "
                        disabled={
                          !validEmail || !validPwd || !validMatch ? true : false
                        }
                      >
                        <span className="shadow-btn-b"></span>
                        <span className="edge-b"></span>
                        <span className="front-b">SIGN UP </span>
                      </button>
                    </div>
                  </form>
                  <button
                    className=" btn font-monospace"
                    onClick={() => onFormSwitch("login")}
                  >
                    Already have an account? Login
                    <span className="text-primary"> here.</span>
                  </button>
                </div>
              </div>
            </div>
            {/* </div>
              </div> */}
          </div>
          {/* </div> */}
        </div>
      </section>
    </>
  );
}

export default Register;
