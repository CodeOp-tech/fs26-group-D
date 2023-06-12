import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"

function MyMealPlan() {

  const navigate = useNavigate();
  
  const showRecipe = () => {
    navigate("/private/meal/recipe")
  }

  return (
    <div>
      My Meal Plan page
      <button type="button" onClick={showRecipe}>See Recipe</button>
    </div>
  );
}

export default MyMealPlan;