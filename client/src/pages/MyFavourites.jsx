import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Accordion from "react-bootstrap/Accordion";

function MyFavourites() {
  const [fav, setFav] = useState([]);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("");

  useEffect(() => {
    getFavourites();
  }, []);

  async function getFavourites() {
    try {
      const response = await fetch(`/api/auth/favourites`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      const results = data;
      setFav(results);
    } catch (err) {
      setError(err.message);
    }
  }

  const toggleFavourite = async (mealId, newFavourite) => {
    try {
      const response = await fetch(`/api/recipes/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ favourite: newFavourite })
      });
      if (response.ok) {
        const data = await response.json();
        getFavourites();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Remove duplicate recipes from the fav state
  const uniqueFavourites = Array.from(
    new Set(fav.map(meal => meal.recipe_id))
  ).map(recipeId => {
    return fav.find(meal => meal.recipe_id === recipeId);
  });

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
      // console.log("Meal added successfully");
      setDate("");
      setMealType("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="border-bottom border-end border-primary border-3 shadow px-4">
        <h1 className="pt-3 pb-1">Favourites</h1>
        <div className="row">
          {uniqueFavourites.map((meal, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="text-center border-bottom border-end border-primary border-3 shadow bg-blueLight mt-1 mb-3 ">
                <div className="parent"></div>
                <div className="parent py-3">
                  <Link to={`/private/dashboard/recipe/${meal.recipe_id}`}>
                    <img
                      src={meal.recipe_image}
                      alt={meal.recipe_title}
                      className="img-fluid rounded border-bottom border-3 border-primary parent "
                    />
                  </Link>
                  <div className="absolute-close ">
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => toggleFavourite(meal.id, !meal.favourite)}
                    ></button>
                  </div>
                </div>

                <div className="cardbody p-2">
                  <h5 className="card-title">{meal.recipe_title}</h5>
                </div>

                {/* here */}
                <Accordion flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Add to Calendar</Accordion.Header>
                    <Accordion.Body>
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
                          className="form-control border-primary border-2"
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
                          className="form-control border-primary border-2 shadow-sm "
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
                        <button
                          className="btn pushable-b-sm mt-3 mb-3"
                          onClick={() => addMealToCalendar(recipe)}
                        >
                          <span className="shadow-btn-b-sm"></span>
                          <span className="edge-b-sm"></span>
                          <span className="front-b-sm">Add to Calendar </span>
                        </button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyFavourites;
