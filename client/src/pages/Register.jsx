import React, { useRef, useEffect, useState} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";


function Register(props) {
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password:"",
    })

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
        console.log(result);
        console.log(input.email);
        setValidEmail(result);
    }, [input.email])

    useEffect(() => {
        const result = PWD_REGEX.test(input.password);
        console.log(result);
        console.log(input.password);
        setValidPwd(result);
        const match = input.password === matchPwd;
        console.log(match)
        setValidMatch(match);
    }, [input.password, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [email, password, matchPwd])


    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setInput((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

    const handleSubmit = (e) => {
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
          navigate("/private");
          setIsLoading(false);
        })
        .catch((err) => {
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
        try {
            const response = await fetch("/api/auth/register", options);
            if (!response.ok) throw new Error(response.statusText);
          } catch (err) {
            setErrMsg(err.message);
          }
    };
        

    return (
        <div>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"></p>
            </section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">
                    Firstname
                </label>
                <input
                    type="text"
                    placeholder="firstname"
                    id="firstname"
                    name="firstname"
                    required
                    onChange={handleInputChange}
                />
                <label htmlFor="lastname">
                    Lastname
                </label>
                <input
                    type="text"
                    placeholder="lastname"
                    id="lastname"
                    name="lastname"
                    required
                    onChange={handleInputChange}
                />
                <label htmlFor="email">
                    Email address
                    <span className={validEmail ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={!validEmail || email ? "invalid" : "hide"}>
                        <FontAwesomeIcon icon={faTimes}/>
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
                />
                <p
                    id="uidnote"
                    className={emailFocus && !email && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Valid email address required. 
                </p>
                <label htmlFor="password">
                    Password
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validPwd || password ? "invalid" : "hide"}>
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
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>
                <label htmlFor="confirm_pwd">
                    Confirm Password
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={!validMatch || !matchPwd ? "invalid" : "hide"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    placeholder="***********"
                    id="confirm_pwd"
                    required
                    onChange={(e) => setMatchPwd(e.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirm_pwd" className={!validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>
                <button type="submit" disabled={!validEmail || !validPwd || !validMatch ? true:false}>
                    Sign up
                </button>
            </form>
            <button
                className="link-btn"
                onClick={() => props.onFormSwitch("login")}>
                Already have an account? Login here.
            </button>
        </div>
    );
}

export default Register;