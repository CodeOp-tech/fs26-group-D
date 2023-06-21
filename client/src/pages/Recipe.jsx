import React, { useState, useEffect, useContext } from "react";
import IngredientContext from "../components/context/IngredientContext";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../App.css";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { ingredientData, setIngredientData } = useContext(IngredientContext);

  useEffect(() => {
    handleRecipeInformation();
  }, [id]);

  const handleRecipeInformation = async () => {
    try {
      const response = await axios.get(`/api/recipes/${id}`, {
        params: {
          includeNutrition: true
        }
      });
      const recipeInfo = response.data;
      console.log(recipeInfo);
      setRecipe(recipeInfo);
    } catch (error) {
      console.error("Error retrieving recipe information:", error);
    }
  };

  const handleAddToShoppingList = ingredient => {
    setIngredientData(state => [...state, ingredient]);
    console.log(ingredientData);
  };

  return (
    <>
      <div className="container">
        {recipe && (
          <div>
            <div className="row text-end bg-blueLight shadow border-bottom border-5 border-primary my-3">
              <h1>{recipe.title}</h1>
              <p className="lead text-muted">
                Dish Types: {recipe.dishTypes.join(", ")}
              </p>
            </div>

            <div className="row bg-aquaLight shadow border-bottom border-3 border-secondary my-2 container p-3">
              <div className="col col-7">
                <h2 className="h5">Ingredients:</h2>

                <ul className="list-group list-group-flush shadow me-5 border-bottom border-secondary border-3">
                  {recipe.extendedIngredients.map(ingredient => (
                    <div className="" key={ingredient.id}>
                      <li className="list-group-item border-secondary">
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          value=""
                          id={`checkbox-${ingredient.id}`}
                          onChange={() => handleAddToShoppingList(ingredient)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`checkbox-${ingredient.id}`}
                        >
                          {ingredient.original}
                        </label>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="col col-5 text-end">
                <div className="row">
                  <h3 className="h5">Shopping List</h3>
                </div>

                <div className="row bg-white border-bottom border-secondary border-3 shadow ms-5">
                  <p>(Select ingredients to add to shopping list)</p>
                  <button className="btn" type="button">
                    ⭐
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <p>preparation time: {recipe.readyInMinutes} minutes</p>
              <p>servings: {recipe.servings}</p>
              <ol>
                {recipe.analyzedInstructions[0].steps.map(step => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            </div>

            <div className="row">
              <h2>Nutrition per Serving:</h2>
              <ul>
                {recipe.nutrition.nutrients.map(nutrient => {
                  const nutrientNames = [
                    "Calories",
                    "Fat",
                    "Saturated Fat",
                    "Carbohydrates",
                    "Net Carbohydrates",
                    "Sugar",
                    "Cholesterol",
                    "Sodium",
                    "Protein"
                  ];
                  if (nutrientNames.includes(nutrient.name)) {
                    return (
                      <li key={nutrient.name}>
                        {nutrient.name}: {nutrient.amount} {nutrient.unit}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Recipe;
