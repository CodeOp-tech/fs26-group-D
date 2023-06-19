import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Calendar from "../components/Calendar";
import "../App.css";

function Dashboard() {
  return (
    <>
      <div>
        <h1>BusyBytes</h1>
        <h2>Welcome to your Dashboard</h2>

        <div>
          <h2>Weekly Calendar</h2>
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
