import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Calendar from "../components/Calendar";
import "../App.css";
import { Tabs, Tab } from "react-bootstrap";
import Profile from "./Profile";
import NewMealPlan from "./NewMealPlan";
import Recipe from "./Recipe";
import ShoppingList from "./ShoppingList";

function Dashboard() {
  return (
    <>
      <div>
        <Tabs defaultActiveKey="calendar">
          <Tab eventKey="profile" title="Profile">
            <Profile />{" "}
          </Tab>
          <Tab eventKey="calendar" title="Dashboard">
            <Calendar />{" "}
          </Tab>
          <Tab eventKey="new" title="New Meal Plan"></Tab>
          <Tab eventKey="recipes" title="Recipe">
            <Recipe />{" "}
          </Tab>
          <Tab eventKey="shopping" title="Shopping List">
            <ShoppingList />{" "}
          </Tab>
        </Tabs>

        {/* <div>
        <Calendar />
          
        </div> */}
      </div>
    </>
  );
}

export default Dashboard;
