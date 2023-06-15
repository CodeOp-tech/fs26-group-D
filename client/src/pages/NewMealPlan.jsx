import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import "../App.css";

function NewMealPlan() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState("");
  const [recipes, setRecipes] = useState([]);
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

  console.log(selectedRecipe);
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
      {/* <Recipe selectedRecipe={selectedRecipe} /> */}
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          <Link to={`/private/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default NewMealPlan;
