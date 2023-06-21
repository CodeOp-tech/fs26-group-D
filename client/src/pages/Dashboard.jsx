import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Calendar from "../components/Calendar";
import "../App.css";
import { Tabs, Tab, Nav } from "react-bootstrap";
import Profile from "./Profile";
import NewMealPlan from "./NewMealPlan";
import Recipe from "./Recipe";
import ShoppingList from "./ShoppingList";
import MyMealPlan from "./MyMealPlan";
import { Link, Outlet } from "react-router-dom";
import MyFavourites from "./MyFavourites";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [key, setKey] = useState("/private/dashboard/profile");
  const [initialPageLoad, setInitialPageLoad] = useState(true);

  let navigate = useNavigate();

  const navigateToDestination = k => {
    navigate(k);
  };

  return (
    <>
      <div className="container my-4 ">
        <Tabs
          className="h6"
          activeKey={key}
          onSelect={k => {
            setKey(k), navigateToDestination(k), setInitialPageLoad(false);
          }}
        >
          <Tab eventKey="/private/dashboard/profile" title="Profile">
            {initialPageLoad && <Profile />}
          </Tab>
          <Tab eventKey="/private/dashboard/calendar" title="Calendar"></Tab>
          <Tab
            eventKey="/private/dashboard/newmealplan"
            title="New Meal Plan"
          ></Tab>
          <Tab
            eventKey="/private/dashboard/myfavourites"
            title="Recipe Repo"
          ></Tab>
          <Tab
            eventKey="/private/dashboard/shoppinglist"
            title="Shopping List"
          ></Tab>
          <Tab eventKey="/private/dashboard/settings" title="Settings"></Tab>
        </Tabs>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
