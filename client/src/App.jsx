import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome"
import Settings from "./pages/Settings";
import MyFavourites from "./pages/MyFavourites";
import MyMealPlan from "./pages/MyMealPlan";
import ShoppingList from "./pages/ShoppingList";
import NewMealPlan from "./pages/NewMealPlan";
import AuthContext from "./components/context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import Recipe from "./pages/Recipe";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true)
    }
  }, []);

  function login(email, password) {
    setUser(true)
  }

  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
  };

  const authObject = {
    user,
    login,
    logout,
  }

  return (
  <AuthContext.Provider value={authObject}>
      <div>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/private/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/private/newmealplan"
            element={
              <RequireAuth>
                <NewMealPlan />
              </RequireAuth>
            }
          />
          <Route
            path="/private/shoppinglist"
            element={
              <RequireAuth>
                <ShoppingList />
              </RequireAuth>
            }
          />
          <Route
            path="/private/mymealplan"
            element={
              <RequireAuth>
                <MyMealPlan />
              </RequireAuth>
            }
          />
          <Route
            path="/private/myfavourites"
            element={
              <RequireAuth>
                <MyFavourites />
              </RequireAuth>
            }
          />
          <Route
            path="/private/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
        <Route
            path="/private/meal/recipe"
            element={
              <RequireAuth>
                <Recipe />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;