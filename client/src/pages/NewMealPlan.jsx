import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";

import Select from "react-select";
import "../App.css";
import Accordion from "react-bootstrap/Accordion";

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
  const [minCalories, setMinCalories] = useState("");
  const [maxCalories, setMaxCalories] = useState("");
  const [minCarbs, setMinCarbs] = useState("");
  const [maxCarbs, setMaxCarbs] = useState("");
  const [minProtein, setMinProtein] = useState("");
  const [maxProtein, setMaxProtein] = useState("");
  const [minFat, setMinFat] = useState("");
  const [maxFat, setMaxFat] = useState("");
  const [minCholesterol, setMinCholesterol] = useState("");
  const [maxCholesterol, setMaxCholesterol] = useState("");
  const [minSaturatedFat, setMinSaturatedFat] = useState("");
  const [maxSaturatedFat, setMaxSaturatedFat] = useState("");
  const [minFiber, setMinFiber] = useState("");
  const [maxFiber, setMaxFiber] = useState("");
  const [minSugar, setMinSugar] = useState("");
  const [maxSugar, setMaxSugar] = useState("");

  const [recipes, setRecipes] = useState([]);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");
  const [error, setError] = useState("");
  const [queryToggle, setQueryToggle] = useState(true);
  const [restrictions, setRestrictions] = useState([]);

  useEffect(() => {
    setQueryToggle(true);
    getRestrictions();
  }, []);

  const searchRecipes = async () => {
    try {
      const params = {
        query,
        diet,
        intolerances: intolerances.join(","),
        includeNutrition: true,
        type,
        includeIngredients,
        excludeIngredients,
        cuisine,
        equipment,
        maxReadyTime,
        minCalories,
        maxCalories,
        minCarbs,
        maxCarbs,
        minProtein,
        maxProtein,
        minFat,
        maxFat,
        minCholesterol,
        maxCholesterol,
        minSaturatedFat,
        maxSaturatedFat,
        minFiber,
        maxFiber,
        minSugar,
        maxSugar
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

      console.log(response.data.results);
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
      minCalories,
      maxCalories,
      minCarbs,
      maxCarbs,
      minProtein,
      maxProtein,
      minFat,
      maxFat,
      minCholesterol,
      maxCholesterol,
      minSaturatedFat,
      maxSaturatedFat,
      minFiber,
      maxFiber,
      minSugar,
      maxSugar
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
    setMinCalories("");
    setMaxCalories("");
    setMinCarbs("");
    setMaxCarbs("");
    setMinProtein("");
    setMaxProtein("");
    setMinFat("");
    setMaxFat("");
    setMinCholesterol("");
    setMaxCholesterol("");
    setMinSaturatedFat("");
    setMaxSaturatedFat("");
    setMinFiber("");
    setMaxFiber("");
    setMinSugar("");
    setMaxSugar("");
  }

  const addMealToCalendar = async recipe => {
    const input = {
      date,
      meal_type: mealType,
      recipe_id: recipe.id,
      recipe_title: recipe.title,
      recipe_image: recipe.image
    };
    console.log(input);
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

  async function getRestrictions() {
    try {
      const response = await fetch(`/api/settings/restrictions`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      setRestrictions(data);
      console.log(restrictions);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <div className="container py-3">
        <div
          className={
            queryToggle ? "row g-0  pb-3 mb-3 " : "row g-0 hide pb-3 mb-3 "
          }
        >
          <div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col  shadow border-bottom border-secondary border-5 p-0">
                  <Accordion
                    // defaultActiveKey="0"
                    flush
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Food Search</Accordion.Header>
                      <Accordion.Body>
                        <label className="font-monospace fs-5">Query</label>
                        <input
                          type="text"
                          name="query"
                          placeholder="e.g. pizza, chicken"
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          className="form-control mt-0 mb-2"
                        />

                        <label className="font-monospace fs-5">Meal Type</label>
                        <input
                          type="text"
                          name="type"
                          placeholder="e.g. breakfast, drink, dinner, snack"
                          value={type}
                          onChange={e => setType(e.target.value)}
                          className="form-control mb-2"
                        />

                        <label className="font-monospace fs-5">Cuisine:</label>
                        <input
                          type="text"
                          name="cuisine"
                          placeholder="e.g. Chinese, Korean, Latinamerican"
                          value={cuisine}
                          onChange={e => setCuisine(e.target.value)}
                          className="form-control mb-2"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Include / Exclude</Accordion.Header>
                      <Accordion.Body>
                        <label className="font-monospace fs-5">
                          Ingredients to include:
                        </label>
                        <input
                          type="text"
                          name="includeIngredients"
                          value={includeIngredients}
                          onChange={e => setIncludeIngredients(e.target.value)}
                          className="form-control"
                        />

                        <label className="font-monospace fs-5">
                          {" "}
                          Ingredients to exclude:
                        </label>
                        <input
                          type="text"
                          name="excludeIngredients"
                          value={
                            restrictions.some(
                              restriction => restriction.type === "bad_food"
                            )
                              ? restrictions.find(
                                  restriction => restriction.type === "bad_food"
                                ).value
                              : ""
                          }
                          onChange={e => setExcludeIngredients(e.target.value)}
                          className="form-control"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Diet Specifications</Accordion.Header>
                      <Accordion.Body>
                        <label className="font-monospace fs-5">Diet</label>
                        <Select
                          value={
                            restrictions.find(
                              restriction => restriction.type === "diet"
                            )
                              ? {
                                  value: restrictions.find(
                                    restriction => restriction.type === "diet"
                                  ).value,
                                  label: restrictions.find(
                                    restriction => restriction.type === "diet"
                                  ).value
                                }
                              : { value: "", label: "Select a diet" }
                          }
                          onChange={selectedOption =>
                            setDiet(selectedOption.value)
                          }
                          options={[
                            { value: "", label: "Select a diet" },
                            { value: "gluten free", label: "Gluten Free" },
                            { value: "ketogenic", label: "Ketogenic" },
                            { value: "vegetarian", label: "Vegetarian" },
                            {
                              value: "lacto-vegetarian",
                              label: "Lacto-Vegetarian"
                            },
                            {
                              value: "ovo-vegetarian",
                              label: "Ovo-Vegetarian"
                            },
                            { value: "vegan", label: "Vegan" },
                            { value: "pescetarian", label: "Pescetarian" },
                            { value: "paleo", label: "Paleo" },
                            { value: "primal", label: "Primal" },
                            { value: "low FODMAP", label: "Low FODMAP" },
                            { value: "whole30", label: "Whole30" }
                          ]}
                          className="form-control"
                        />

                        <label className="font-monospace fs-5">
                          Intolerances
                        </label>
                        <Select
                          value={restrictions
                            .filter(
                              restriction => restriction.type === "allergies"
                            )
                            .map(restriction => ({
                              value: restriction.value,
                              label: restriction.value
                            }))}
                          onChange={selectedOptions =>
                            setIntolerances(
                              selectedOptions.map(option => option.value)
                            )
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
                          className="form-control"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Preparation</Accordion.Header>
                      <Accordion.Body>
                        <label className="font-monospace fs-5">
                          Maximum Ready Time in minutes:
                        </label>
                        <input
                          type="text"
                          name="maxReadyTime"
                          placeholder="e.g. 45"
                          value={maxReadyTime}
                          onChange={e => setMaxReadyTime(e.target.value)}
                          className="form-control"
                        />

                        <label className="font-monospace fs-5">Equipment</label>
                        <input
                          type="text"
                          value={equipment}
                          placeholder="e.g. oven, airfryer"
                          onChange={e => setEquipment(e.target.value)}
                          className="form-control"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>Nutrition</Accordion.Header>
                      <Accordion.Body>
                        <label className="font-monospace fs-5">Calories:</label>

                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minCalories"
                              placeholder="min"
                              value={minCalories}
                              onChange={e => setMinCalories(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxCalories"
                              placeholder="max"
                              value={maxCalories}
                              onChange={e => setMaxCalories(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">Carbs:</label>
                        <div className="row">
                          <div className="col-6">
                            {" "}
                            <input
                              type="text"
                              name="minCarbs"
                              placeholder="min"
                              value={minCarbs}
                              onChange={e => setMinCarbs(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxCarbs"
                              placeholder="max"
                              value={maxCarbs}
                              onChange={e => setMaxCarbs(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">Protein:</label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minProtein"
                              placeholder="min"
                              value={minProtein}
                              onChange={e => setMinProtein(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxProtein"
                              placeholder="max"
                              value={maxProtein}
                              onChange={e => setMaxProtein(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">Fat:</label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minFat"
                              placeholder="min"
                              value={minFat}
                              onChange={e => setMinFat(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxFat"
                              placeholder="max"
                              value={maxFat}
                              onChange={e => setMaxFat(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">
                          Cholesterol:
                        </label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minCholesterol"
                              placeholder="min"
                              value={minCholesterol}
                              onChange={e => setMinCholesterol(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxCholesterol"
                              placeholder="max"
                              value={maxCholesterol}
                              onChange={e => setMaxCholesterol(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">
                          Saturated Fat:
                        </label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minSaturatedFat"
                              placeholder="min"
                              value={minSaturatedFat}
                              onChange={e => setMinSaturatedFat(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxSaturatedFat"
                              placeholder="max"
                              value={maxSaturatedFat}
                              onChange={e => setMaxSaturatedFat(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">Fiber:</label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minFiber"
                              placeholder="min"
                              value={minFiber}
                              onChange={e => setMinFiber(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxFiber"
                              placeholder="max"
                              value={maxFiber}
                              onChange={e => setMaxFiber(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <label className="font-monospace fs-5">Sugar:</label>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              name="minSugar"
                              placeholder="min"
                              value={minSugar}
                              onChange={e => setMinSugar(e.target.value)}
                              className="form-control"
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              name="maxSugar"
                              placeholder="max"
                              value={maxSugar}
                              onChange={e => setMaxSugar(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>

                <div className="col text-end ">
                  <button
                    type="submit"
                    onClick={() => setQueryToggle(false)}
                    className="btn pushable-b"
                  >
                    <span className="shadow-btn-b"></span>
                    <span className="edge-b"></span>
                    <span className="front-b">GET RECIPES </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={queryToggle ? "row hide" : "row vh"}>
          <div className={queryToggle ? "row hide " : "row"}></div>

          <div className="col-5 vh overflow-y-auto">
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                className="my-2 bg-aquaLight shadow border-bottom border-secondary border-5 container"
              >
                <div className="row">
                  <h2 className="h4 pt-2">{recipe.title}</h2>
                </div>
                <div className="row">
                  <Link to={`/private/dashboard/recipe/${recipe.id}`}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="img-fluid border-bottom border-secondary border-5 shadow my-1 justify-content-center"
                    />
                  </Link>
                </div>

                <div className="row mb-2 px-3">
                  <label
                    className="form-label font-monospace fs-4 mb-1"
                    htmlFor="date"
                  >
                    Date:
                  </label>
                  <input
                    placeholder="DD/MM/YYYY"
                    type="date"
                    id="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="form-control border-secondary"
                  />
                </div>
                <div className="row mb-2 px-3">
                  <label
                    className="form-label font-monospace fs-4 mb-1"
                    htmlFor="mealType"
                  >
                    Meal Type:
                  </label>
                  <select
                    id="mealType"
                    value={mealType}
                    onChange={e => setMealType(e.target.value)}
                    className="form-control border-secondary shadow-sm "
                  >
                    <option value="">Select a meal type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="elevensies">Elevensies</option>
                    <option value="lunch">Lunch</option>
                    <option value="afternoon tea">Afternoon tea</option>
                    <option value="dinner">Diner</option>
                  </select>
                </div>
                <div className="text-end">
                  {/* <button onClick={() => addMealToCalendar(recipe)}>
                    Add to Calendar
                  </button> */}
                  <button
                    className="btn pushable-b-sm mt-3 mb-3"
                    onClick={() => addMealToCalendar(recipe)}
                  >
                    <span className="shadow-btn-b-sm"></span>
                    <span className="edge-b-sm"></span>
                    <span className="front-b-sm">Add to Calendar </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-7 vh">
            {/* <button
              onClick={() => setQueryToggle(true)}
              className="btn btn-primary"
            >
              New search
            </button> */}
            <div className="text-end">
              <button
                className="btn pushable-s"
                onClick={() => setQueryToggle(true)}
              >
                <span className="shadow-btn-s"></span>
                <span className="edge-s"></span>
                <span className="front-s">NEW SEARCH </span>
              </button>
            </div>

            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default NewMealPlan;
