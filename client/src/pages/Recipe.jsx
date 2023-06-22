import React, { useState, useEffect, useContext } from "react";
import IngredientContext from "../components/context/IngredientContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
      // console.log(recipeInfo);
      setRecipe(recipeInfo);
    } catch (error) {
      console.error("Error retrieving recipe information:", error);
    }
  };

  const handleAddToShoppingList = ingredient => {
    setIngredientData(state => [...state, ingredient]);
    // console.log(ingredientData);
  };

  return (
    <>
      <div className="text-end mt-3">
        <Link to={`/private/dashboard/myfavourites`}>
          <button className="btn pushable-s">
            <span className="shadow-btn-s"></span>
            <span className="edge-s"></span>
            <span className="front-s">BACK </span>
          </button>
        </Link>
      </div>

      <div className="container">
        {recipe && (
          <div>
            <div className="row text-end bg-blueLight shadow border-bottom border-end border-5 border-primary mb-3 mt-4">
              <h1>{recipe.title}</h1>
              <p className="lead text-muted">
                Dish Types: {recipe.dishTypes.join(", ")}
              </p>
            </div>

            <div className="row bg-aquaLight shadow border-bottom border-end border-3 border-secondary my-4  p-3">
              <div className="col col-7">
                <h2 className="">Ingredients:</h2>

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

            <div className="row bg-blueLight shadow border-bottom border-end border-3 border-primary my-4  p-3">
              <h2 className="text-end pb-3">Instructions:</h2>
              <div className="col">
                <h6>Preparation time </h6>
                <p className="ps-2">{recipe.readyInMinutes} minutes</p>
              </div>
              <div className="col text-end">
                <h6>Servings: </h6>
                <p className="pe-2"> {recipe.servings}</p>
              </div>

              <h5>Instructions: </h5>
              <div className="px-4">
                <ol className="">
                  {recipe.analyzedInstructions[0].steps.map(step => (
                    <li className="pb-1" key={step.number}>
                      {step.step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="row bg-aquaLight shadow border-bottom border-end border-3 border-secondary my-4 p-3">
              <h2>Nutrition per Serving:</h2>
              <ul className="list-group-flush">
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
                      <li className="list-group-item px-4" key={nutrient.name}>
                        {nutrient.name}: {nutrient.amount} {nutrient.unit}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <div className="col text-end">
                <button className="btn pushable-b-lg">
                  <span className="shadow-btn-b-lg"></span>
                  <span className="edge-b-lg"></span>
                  <span className="front-b-lg">Add to favorites</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Recipe;
