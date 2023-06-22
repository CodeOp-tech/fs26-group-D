import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Accordion from "react-bootstrap/Accordion";

function MyFavourites({ favouritesSummary }) {
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

  if (uniqueFavourites.length === 0) {
    return <p>No favourites yet, try adding some</p>;
  }

  return (
    <>
      <div
        className={
          favouritesSummary
            ? "border-bottom border-end border-primary border-3 shadow px-4 profile-min-height"
            : "border-bottom border-end border-primary border-3 shadow px-4"
        }
      >
        {favouritesSummary || <h1 className="pt-3 pb-1">Favourites</h1>}

        <div className="row">
          {favouritesSummary && (
            <div>
              <div className="bg-aquaLight border-bottom border-end border-secondary border-3 p-4 my-3 shadow-sm text-end row">
                <div className="col">
                  <p className="text-center my-auto lead">
                    View recipes to add more favourites!
                  </p>
                </div>
                <div className="col">
                  <div className="text-end">
                    <Link
                      to={`/private/dashboard/newmealplan`}
                      className="text-decoration-none"
                    >
                      <button className="my-auto btn  pushable-b">
                        <span className="shadow-btn-b"></span>
                        <span className="edge-b"></span>
                        <span className="front-b">Search Recipes</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {uniqueFavourites.map((meal, index) => (
                <>
                  <div key={index} className="">
                    <ul className="list-group-flush">
                      <li className="list-group-item">
                        <div className="col-10">
                          <Link
                            to={`/private/dashboard/recipe/${meal.recipe_id}`}
                            className="text-decoration-none"
                          >
                            <h5 className="text-black">{meal.recipe_title}</h5>
                          </Link>
                        </div>

                        <div className="absolute-close col-2 text-end">
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() =>
                              toggleFavourite(meal.id, !meal.favourite)
                            }
                          ></button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              ))}
              {/* <div>
                   <p className="text-center pt-5">View recipes to add more favourites!</p>
                   <div className="text-end">
                   <Link
                      to={`/private/dashboard/settings`}
                      className="text-decoration-none"
                    >
                      <button className="my-auto btn  pushable-s">
                        <span className="shadow-btn-s"></span>
                        <span className="edge-s"></span>
                        <span className="front-s">
                          Search Recipes
                        </span>
                      </button>
                    </Link>
                    </div>
                    </div> */}
            </div>
          )}

          {favouritesSummary || (
            <>
              {uniqueFavourites.map((meal, index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="text-center border-bottom border-end border-primary border-3 shadow bg-blueLight mt-1 mb-3 meal-card ">
                    <div className="parent py-3 px-2">
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
                          onClick={() =>
                            toggleFavourite(meal.id, !meal.favourite)
                          }
                        ></button>
                      </div>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">{meal.recipe_title}</h5>
                    </div>

                    {/* here */}
                    <Accordion flush className="meal-accordion">
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
                              <option value="afternoon tea">
                                Afternoon tea
                              </option>
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
                              <span className="front-b-sm">
                                Add to Calendar{" "}
                              </span>
                            </button>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MyFavourites;
