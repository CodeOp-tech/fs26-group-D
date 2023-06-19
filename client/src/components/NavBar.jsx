import React, { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

function NavBar() {
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

                <button
                  className="navbar-toggler "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#main-nav"
                  aria-controls="main-nav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"> </span>
                </button>

                <div
                  className="collapse navbar-collapse justify-content-end align-center text-white"
                  id="main-nav"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button className="btn btn-secondary btn-sm">
                        Sign In
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        ) : (
          // Logged in
          <nav className="navbar navbar-expand-md p-2 sticky-top bg-secondary navbar-light border-bottom border-solid border-primary rounded border-4">
            <div className="container-xxl">
              <a href="/" className="navbar-brand p-0">
                <span className="display-5 fs-5 align-middle">BusyBytes</span>
              </a>

              <button
                className="navbar-toggler "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#main-nav"
                aria-controls="main-nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"> </span>
              </button>

              <div
                className="collapse navbar-collapse justify-content-end align-center text-white"
                id="main-nav"
              >
                <ul className="navbar-nav">
                  <li>
                    <Link className="nav-link" to="/private/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/login">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-primary btn-sm logoutBtn"
                      onClick={logout}
                    >
                      LOG OUT
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          //Logged in nav
          // <nav className="navbar navbar-expand-md p-2 sticky-top bg-secondary navbar-dark">
          //   <div className="container-xxl">
          //     <a href="/" className="navbar-brand p-0">
          //       <span className="display-5 fs-5 align-middle">BusyBytes</span>
          //     </a>

          //     <button
          //       className="navbar-toggler "
          //       type="button"
          //       data-bs-toggle="collapse"
          //       data-bs-target="#main-nav"
          //       aria-controls="main-nav"
          //       aria-expanded="false"
          //       aria-label="Toggle navigation"
          //     >
          //       <span className="navbar-toggler-icon"> </span>
          //     </button>

          //     <div
          //       className="collapse navbar-collapse justify-content-end align-center text-white"
          //       id="main-nav"
          //     >
          //       {" "}
          //       <div>
          //         <ul>
          //           <li>
          //             <Link className="nav-link" to="/private/dashboard">
          //               Dashboard
          //             </Link>
          //           </li>
          //           <li>
          //             <Link className="nav-link" to="/private/mymealplan">
          //               My Meal Plan
          //             </Link>
          //           </li>
          //           <li>
          //             <Link className="nav-link" to="/private/shoppinglist">
          //               Shopping List
          //             </Link>
          //           </li>
          //           <li>
          //             <Link className="nav-link" to="/private/newmealplan">
          //               New Meal Plan
          //             </Link>
          //           </li>
          //           <li>
          //             <Link className="nav-link" to="/private/myfavourites">
          //               My Favourites
          //             </Link>
          //           </li>
          //           <li>
          //             <Link className="nav-link" to="/private/settings">
          //               Settings
          //             </Link>
          //           </li>
          //         </ul>
          //         <button onClick={logout} className="logoutBtn ">
          //           Logout
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </nav>
        )}
      </div>
    </>
  );
}

export default NavBar;
