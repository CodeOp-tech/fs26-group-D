import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Calendar from "../components/Calendar";
import "../App.css";
import { Tabs, Tab } from "react-bootstrap";
import Profile from "./Profile";
import NewMealPlan from "./NewMealPlan";
import Recipe from "./Recipe";
import ShoppingList from "./ShoppingList";
import MyMealPlan from "./MyMealPlan";
import { Link, Outlet } from "react-router-dom";
import MyFavourites from "./MyFavourites";
import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="container my-4">
        <Tabs defaultActiveKey="calendar">
          <Tab eventKey="profile" title="Profile">
            {/* <NavLink to ="/private/profile"> */}
            <Profile />
            {/* <Outlet/>
             test in panel
             </NavLink> */}
          </Tab>
          <Tab eventKey="calendar" title="Calendar">
            <Calendar />{" "}
          </Tab>
          <Tab eventKey="new" title="New Meal Plan">
            <NewMealPlan />
          </Tab>
          <Tab eventKey="recipes" title="Recipe Repo">
            <MyFavourites />
          </Tab>
          <Tab eventKey="shopping" title="Shopping List">
            <ShoppingList />{" "}
          </Tab>
        </Tabs>
      </div>

      <div className="nav-panel"></div>

      {/* <div>OUTLET TEST
<ul class="nav nav-tabs">
  <li class="nav-item"> */}
      {/* <a class="nav-link active" aria-current="page" href="#">Active</a> */}
      {/* <NavLink to ="/private/profile"> test </NavLink>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled">Disabled</a>
  </li>
</ul>
  <Outlet/>
</div> */}
    </>
  );
}

export default Dashboard;
