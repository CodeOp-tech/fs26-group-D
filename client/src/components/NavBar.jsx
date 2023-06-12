import React, { useState, useContext } from 'react';
import { FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthContext from "./context/AuthContext";


function NavBar() {

    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    const [isNavOpen, setIsNavOpen] = useState(false);

    const showSidebar = () => {
        setIsNavOpen(!isNavOpen);
    }

    const logout = () => {
        auth.logout();
        setUser(false);
        localStorage.removeItem("token");
        navigate("/");
      };


    return (
        <div>
            { auth.user ? (
            <nav>
                <div>
                    <button
                        type="button"
                        onClick={showSidebar}
                    ><FaBars/>
                    </button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                        <div>
                            <ul>
                                <li>
                                    <Link className="nav-link" to="/private/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li >
                                    <Link className="nav-link" to="/private/mymealplan">
                                        My Meal Plan
                                    </Link>
                                </li>
                                <li>  
                                    <Link
                                        className="nav-link"
                                        to="/private/shoppinglist"
                                    >
                                        Shopping List
                                    </Link>
                                </li>
                                <li>  
                                    <Link
                                        className="nav-link"
                                        to="/private/newmealplan"
                                    >
                                        New Meal Plan
                                    </Link>
                                </li> 
                                <li>  
                                    <Link
                                        className="nav-link"
                                        to="/private/myfavourites"
                                    >
                                        My Favourites
                                    </Link>
                                </li> 
                                <li>  
                                    <Link
                                        className="nav-link"
                                        to="/private/settings"
                                    >
                                        Settings
                                    </Link>
                                </li>     
                            </ul>
                            <button onClick={logout} className="logoutBtn">Logout</button>
                        </div>
                    </div>
                </div>
                </nav>
                ) : (
                    <div></div>
                )}
        </div>
  )
}

export default NavBar;