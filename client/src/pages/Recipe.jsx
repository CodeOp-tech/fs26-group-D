import React, { useState, useEffect, useContext } from "react";
import IngredientContext from "../components/context/IngredientContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
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
    alert(`${ingredient.name} has been added to the shopping list`);
  };

  return (
    <div>
      {recipe && (
        <div>
          <h1>{recipe.title}</h1>
          <p>Dish Types: {recipe.dishTypes.join(", ")}</p>
          <ul>
            {recipe.extendedIngredients.map(ingredient => (
              <div>
                <li key={ingredient.id}>{ingredient.original}</li>
                <button onClick={() => handleAddToShoppingList(ingredient)}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
            ))}
          </ul>
          <p>preparation time: {recipe.readyInMinutes} minutes</p>
          <p>servings: {recipe.servings}</p>
          <ol>
            {recipe.analyzedInstructions[0].steps.map(step => (
              <li key={step.number}>{step.step}</li>
            ))}
          </ol>
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
      )}
    </div>
  );
}

export default Recipe;
