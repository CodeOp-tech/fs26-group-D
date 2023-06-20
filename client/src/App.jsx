import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";
import MyFavourites from "./pages/MyFavourites";
import MyMealPlan from "./pages/MyMealPlan";
import ShoppingList from "./pages/ShoppingList";
import NewMealPlan from "./pages/NewMealPlan";
import AuthContext from "./components/context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import Recipe from "./pages/Recipe";

import IngredientContext from "./components/context/IngredientContext";

import Profile from "./pages/Profile";
import Calendar from "./components/Calendar";

function App() {
  const [user, setUser] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  function login(email, password) {
    setUser(true);
  }

  const logout = () => {
    setUser(false);
    localStorage.removeItem("token");
  };

  const authObject = {
    user,
    login,
    logout
  };

  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = formName => {
    setCurrentForm(formName);
  };

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const shoppingCartObject = {
    ingredientData,
    setIngredientData
  };

  return (
    <AuthContext.Provider value={authObject}>
      <IngredientContext.Provider value={shoppingCartObject}>
        <div>
          <div>
            <NavBar
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
              isOpen={isOpen}
              showModal={showModal}
              hideModal={hideModal}
              toggleForm={toggleForm}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Welcome
                  currentForm={currentForm}
                  setCurrentForm={setCurrentForm}
                  isOpen={isOpen}
                  showModal={showModal}
                  hideModal={hideModal}
                  toggleForm={toggleForm}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  currentForm={currentForm}
                  setCurrentForm={setCurrentForm}
                  isOpen={isOpen}
                  setIsOpen={() => {
                    setIsOpen(false);
                  }}
                  showModal={showModal}
                  hideModal={hideModal}
                  toggleForm={toggleForm}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  currentForm={currentForm}
                  setCurrentForm={setCurrentForm}
                  isOpen={isOpen}
                  showModal={showModal}
                  hideModal={hideModal}
                  toggleForm={toggleForm}
                />
              }
            />

            <Route
              path="/private/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            >
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />

              <Route
                path="calendar"
                element={
                  <RequireAuth>
                    <Calendar />
                  </RequireAuth>
                }
              />

              <Route
                path="newmealplan"
                element={
                  <RequireAuth>
                    <NewMealPlan />
                  </RequireAuth>
                }
              />
              <Route
                path="shoppinglist"
                element={
                  <RequireAuth>
                    <ShoppingList />
                  </RequireAuth>
                }
              />
              <Route
                path="mymealplan"
                element={
                  <RequireAuth>
                    <MyMealPlan />
                  </RequireAuth>
                }
              />
              <Route
                path="myfavourites"
                element={
                  <RequireAuth>
                    <MyFavourites />
                  </RequireAuth>
                }
              />
              <Route
                path="settings"
                element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>
                }
              />
              <Route
                path="recipe/:id"
                element={
                  <RequireAuth>
                    <Recipe />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </div>
      </IngredientContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
