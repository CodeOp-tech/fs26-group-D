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
import { Link } from "react-router-dom";
import MyFavourites from "./MyFavourites";

function Dashboard() {
  return (
    <>
      <div className="container my-4">
        <Tabs defaultActiveKey="calendar">
          <Tab eventKey="profile" title="Profile">
            <Profile />
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
    </>
  );
}

export default Dashboard;
