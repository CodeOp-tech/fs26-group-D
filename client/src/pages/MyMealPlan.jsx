import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import "../App.css";

function MyMealPlan() {
  const navigate = useNavigate();

  const showRecipe = () => {
    navigate("/private/meal/recipe");
  };

  return (
    <div>
      My Meal Plan page
      <Calendar />
    </div>
  );
}

export default MyMealPlan;
