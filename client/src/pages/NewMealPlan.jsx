import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";

import Select from "react-select";
import "../App.css";

function NewMealPlan() {
  const [query, setQuery] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState([]);
  const [type, setType] = useState("");
  const [equipment, setEquipment] = useState("");
  const [includeIngredients, setIncludeIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxReadyTime, setMaxReadyTime] = useState("");
  const [maxCalories, setMaxCalories] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [error, setError] = useState("");

  const searchRecipes = async () => {
    try {
      const params = {
        query,
        diet,
        intolerances: intolerances.join(","),
        type,
        includeIngredients,
        excludeIngredients,
        cuisine,
        equipment,
        maxReadyTime,
        maxCalories
      };

      // Remove parameters with empty values
      Object.keys(params).forEach(key => {
        if (!params[key]) {
          delete params[key];
        }
      });

      const response = await axios.get("/api/recipes/search", {
        params
      });

      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      query,
      diet,
      intolerances,
      type,
      includeIngredients,
      excludeIngredients,
      cuisine,
      equipment,
      maxReadyTime,
      maxCalories
    };
    searchRecipes(formData);
    setQuery("");
    setDiet("");
    setIntolerances([]);
    setType("");
    setIncludeIngredients("");
    setExcludeIngredients("");
    setCuisine("");
    setEquipment("");
    setMaxReadyTime("");
    setMaxCalories("");
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
            placeholder="e.g. pizza, chicken"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </label>

        <label>
          Diet
          <Select
            value={diet ? { value: diet, label: diet } : null}
            onChange={selectedOption => setDiet(selectedOption.value)}
            options={[
              { value: "", label: "Select a diet" },
              { value: "gluten free", label: "Gluten Free" },
              { value: "ketogenic", label: "Ketogenic" },
              { value: "vegetarian", label: "Vegetarian" },
              { value: "lacto-vegetarian", label: "Lacto-Vegetarian" },
              { value: "ovo-vegetarian", label: "Ovo-Vegetarian" },
              { value: "vegan", label: "Vegan" },
              { value: "pescetarian", label: "Pescetarian" },
              { value: "paleo", label: "Paleo" },
              { value: "primal", label: "Primal" },
              { value: "low FODMAP", label: "Low FODMAP" },
              { value: "whole30", label: "Whole30" }
            ]}
          />
        </label>

        <label>
          Intolerances
          <Select
            value={intolerances.map(intolerance => ({
              value: intolerance,
              label: intolerance
            }))}
            onChange={selectedOptions =>
              setIntolerances(selectedOptions.map(option => option.value))
            }
            options={[
              { value: "dairy", label: "Dairy" },
              { value: "egg", label: "Egg" },
              { value: "gluten", label: "Gluten" },
              { value: "grain", label: "Grain" },
              { value: "peanut", label: "Peanut" },
              { value: "seafood", label: "Seafood" },
              { value: "sesame", label: "Sesame" },
              { value: "shellfish", label: "Shellfish" },
              { value: "soy", label: "Soy" },
              { value: "sulfite", label: "Sulfite" },
              { value: "tree nut", label: "Tree Nut" },
              { value: "wheat", label: "Wheat" }
            ]}
            isMulti
          />
        </label>

        <label>
          {" "}
          Type
          <input
            type="text"
            name="type"
            placeholder="e.g. breakfast, drink, dinner, snack"
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </label>

        <label>
          {" "}
          Cuisine:
          <input
            type="text"
            name="cuisine"
            placeholder="e.g. chinese, corean, latinamerican"
            value={cuisine}
            onChange={e => setCuisine(e.target.value)}
          />
        </label>

        <label>
          {" "}
          Ingredients to include:
          <input
            type="text"
            name="includeIngredients"
            value={includeIngredients}
            onChange={e => setIncludeIngredients(e.target.value)}
          />
        </label>

        <label>
          {" "}
          Ingredients to exclude:
          <input
            type="text"
            name="excludeIngredients"
            value={excludeIngredients}
            onChange={e => setExcludeIngredients(e.target.value)}
          />
        </label>

        <label>
          {" "}
          Maximun Ready Time in minutes:
          <input
            type="text"
            name="maxReadyTime"
            placeholder="e.g. 45"
            value={maxReadyTime}
            onChange={e => setMaxReadyTime(e.target.value)}
          />
        </label>

        <label>
          {" "}
          Maximun Calories:
          <input
            type="text"
            name="maxCalories"
            placeholder="e.g. 250"
            value={maxCalories}
            onChange={e => setMaxCalories(e.target.value)}
          />
        </label>

        <label>
          {" "}
          equipment
          <input
            type="text"
            value={equipment}
            onChange={e => setEquipment(e.target.value)}
          />
        </label>

        <button type="submit">Get Recipes</button>
      </form>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <div>
            <h2>{recipe.title}</h2>
            <Link to={`/private/recipe/${recipe.id}`}>
              <img src={recipe.image} alt={recipe.title} />
            </Link>
          </div>
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
          <div>
            <button onClick={() => addMealToCalendar(recipe)}>
              Add to Calendar
            </button>
          </div>
        </div>
      ))}
      <div>
        <Calendar />
      </div>
    </div>
  );
}

export default NewMealPlan;
