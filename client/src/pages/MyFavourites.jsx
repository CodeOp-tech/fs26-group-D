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
    <div>
      My Favourites page
      <div>
        <ul>
          {fav.map((meal, index) => (
            <li key={index}>
              {meal.recipe_title}
              <Link to={`/private/dashboard/recipe/${meal.recipe_id}`}>
                <img src={meal.recipe_image} alt={meal.recipe_title} />
              </Link>
              <button
                type="button"
                onClick={() => toggleFavourite(meal.id, !meal.favourite)}
              >
                ⭐
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyFavourites;
