import React, { useState } from "react";
import axios from "axios";
import Calendar from "../components/Calendar";
import "../App.css";

function NewMealPlan() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const searchRecipes = async () => {
    try {
      const response = await axios.get("/api/recipes/search", {
        params: {
          query,
          diet,
          intolerances
        }
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    searchRecipes(query, diet, intolerances);
    setQuery("");
    setDiet("");
    setIntolerances("");
  }

  const addMealToCalendar = async recipe => {
    const input = {
      date,
      meal_type: mealType,
      recipe_id: recipe.id,
      recipe_title: recipe.title,
      recipe_image: recipe.image
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(input)
    };
    try {
      const response = await fetch("/api/recipes/calendar", options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Handle successful response here
      alert(`${input.recipe_title} has been added to your calendar`);
      console.log("Meal added successfully");
      setDate("");
      setMealType("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRecipeInformation = async recipeId => {
    try {
      const response = await axios.get(`/api/recipes/${recipeId}`, {
        params: {
          includeNutrition: true
        }
      });
      const recipeInfo = response.data;
      console.log(recipeInfo);
      setSelectedRecipe(recipeInfo);
    } catch (error) {
      console.error("Error retrieving recipe information:", error);
    }
  };

  return (
    <div>
      New Meal Plan page
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Query
          <input
            type="text"
            name="query"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Diet
          <input
            type="text"
            value={diet}
            onChange={e => setDiet(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Intolerances
          <input
            type="text"
            value={intolerances}
            onChange={e => setIntolerances(e.target.value)}
          />
        </label>
        <button type="submit">Get Recipes</button>
      </form>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <button onClick={() => handleRecipeInformation(recipe.id)}>
            Get recipe information
          </button>
          {selectedRecipe && (
            <div>
              <h3>{selectedRecipe.title}</h3>
              <p>preparation time: {selectedRecipe.readyInMinutes} minutes</p>
              <p>{selectedRecipe.servings}</p>
              <p>{selectedRecipe.summary}</p>
              <p>{selectedRecipe.instruccions}</p>
            </div>
          )}
          <div>
            <label htmlFor="date">Date:</label>
            <input
              placeholder="DD/MM/YYYY"
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mealType">Meal Type:</label>
            <select
              id="mealType"
              value={mealType}
              onChange={e => setMealType(e.target.value)}
            >
              <option value="">Select a meal type</option>
              <option value="breakfast">Breakfast</option>
              <option value="elevensies">Elevensies</option>
              <option value="lunch">Lunch</option>
              <option value="afternoon tea">Afternoon tea</option>
              <option value="diner">Diner</option>
            </select>
          </div>
          <button onClick={() => addMealToCalendar(recipe)}>
            Add to Calendar
          </button>
        </div>
      ))}
      <div>
        <Calendar />
      </div>
    </div>
  );
}

export default NewMealPlan;
