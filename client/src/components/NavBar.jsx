import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import Register from "./Register";

function NavBar({
  currentForm,
  setCurrentForm,
  isOpen,
  showModal,
  hideModal,
  toggleForm
}) {
  const auth = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const showSidebar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const logout = () => {
    auth.logout();
    setUser(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div>
        {/* Not logged in */}
        {!auth.user ? (
          <div className="bg-dark">
            <nav className="navbar navbar-expand-md p-2 sticky-top bg-dark navbar-dark border-bottom border-solid border-secondary rounded border-4">
              <div className="container-xxl">
                <a href="/" className="navbar-brand p-0">
                  <span className="display-5 fs-5 align-middle">BusyBytes</span>
                </a>

                <div className=" text-white" id="main-nav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button
                        onClick={() => {
                          setCurrentForm("login"), showModal();
                        }}
                        className="btn pushable-b-sm logoutBtn"
                      >
                        <span className="shadow-btn-b-sm"></span>
                        <span className="edge-b-sm"></span>
                        <span className="front-b-sm">Sign In </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        ) : (
          // Logged in
          <nav className="navbar navbar-expand-md p-2 sticky-top bg-primary  border-bottom border-solid border-dark rounded border-4">
            <div className="container-xxl">
              <a href="/" className="navbar-brand p-0">
                <span className="display-5 fs-5 align-middle">BusyBytes</span>
              </a>

              <div className="justify-content-end align-center" id="main-nav">
                <ul className="navbar-nav ">
                  {/* <li>
                    <Link className="nav-link" to="/private/dashboard">
                      Dashboard
                    </Link>
                  </li> */}

                  <li className="nav-item">
                    <button
                      className="btn pushable-b-sm logoutBtn"
                      onClick={logout}
                    >
                      <span className="shadow-btn-b-sm"></span>
                      <span className="edge-b-sm"></span>
                      <span className="front-b-sm">LOG OUT </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
      <Modal
        show={isOpen}
        size="lg"
        onHide={hideModal}
        dialogClassName={""}
        centered
      >
        <Modal.Body>
          {currentForm === "login" ? (
            <Login onFormSwitch={toggleForm} />
          ) : (
            <Register onFormSwitch={toggleForm} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
