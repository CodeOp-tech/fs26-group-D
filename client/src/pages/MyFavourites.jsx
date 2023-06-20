import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function MyFavourites() {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    getMealPlan();
  }, []);

  async function getMealPlan() {
    try {
      const response = await fetch(`/api/auth/favourites`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      const results = data; //.filter((meal) => meal.favourite);
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
        getMealPlan();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="py-3">Favourites</h1>
        <div className="row">
          {fav.map((meal, index) => (
            <div key={index} className="col-4">
              <div className="text-center border-bottom border-end border-primary border-3 shadow bg-blueLight my-3">
                <div className="">
                  <span className="float-end">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => toggleFavourite(meal.id, !meal.favourite)}
                    >
                      ❌
                    </button>
                  </span>

                  <Link to={`/private/dashboard/recipe/${meal.recipe_id}`}>
                    <img
                      src={meal.recipe_image}
                      alt={meal.recipe_title}
                      className="img-fluid b"
                    />
                  </Link>
                </div>
                <div className="cardbody p-2">
                  <h5 className="card-title">{meal.recipe_title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyFavourites;
