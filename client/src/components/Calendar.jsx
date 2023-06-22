import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import "./Calendar.css";

export default function Calendar() {
  const [mealPlan, setMealPlan] = useState([]);
  const [error, setError] = useState("");
  const mealName = [
    "breakfast",
    "elevensies",
    "lunch",
    "afternoon tea",
    "dinner"
  ];
  const [startDate, setStartDate] = useState(new Date()); // Start with the current date
  const [days, setDays] = useState([]);

  useEffect(() => {
    getMealPlan();
  }, []);

  async function getMealPlan() {
    try {
      const response = await fetch(`/api/auth/calendar`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      setMealPlan(data);
      setDays(getDays(undefined, data));
    } catch (err) {
      setError(err.message);
    }
  }

  // function to create an array with 7 days of the current week, starting from Monday
  const getDays = (startDate, data = mealPlan) => {
    const days = [];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDay = new Date(startDate || new Date());
    currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1); // Set the current day to Monday

    for (let i = 0; i < 7; i++) {
      const formattedCurrentDay = dayjs(currentDay).format("DD/MM/YYYY");
      const mealsForCurrentDay = data.filter(
        meal => dayjs(meal.date).format("DD/MM/YYYY") === formattedCurrentDay
      );
      // Calculate nutrition summary for the day
      const nutritionSummary = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        saturatedFat: 0,
        cholesterol: 0,
        sugar: 0
      };

      mealsForCurrentDay.forEach(meal => {
        nutritionSummary.calories += meal.calories;
        nutritionSummary.protein += meal.protein;
        nutritionSummary.carbs += meal.carbs;
        nutritionSummary.fat += meal.fat;
        nutritionSummary.saturatedFat += meal.saturatedFat;
        nutritionSummary.cholesterol += meal.cholesterol;
        nutritionSummary.sugar += meal.sugar;
        // nutritionSummary.calories += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Calories')?.amount
        // );
        // nutritionSummary.protein += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Protein')?.amount
        // );
        // nutritionSummary.carbs += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Carbohydrates')?.amount
        // );
        // nutritionSummary.fat += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Fat')?.amount
        // );
        // nutritionSummary.saturatedFat += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Saturated Fat')?.amount
        // );
        // nutritionSummary.cholesterol += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Cholesterol')?.amount
        // );
        // nutritionSummary.sugar += parseFloat(
        //   meal.nutrition.nutrients.find((nutrient) => nutrient.name === 'Sugar')?.amount
        // );
      });

      days.push({
        date: new Date(currentDay),
        dayName: weekday[currentDay.getDay()],
        meal: mealsForCurrentDay.map(meal => ({
          id: meal.id,
          type: meal.meal_type,
          name: meal.recipe_title,
          img: meal.recipe_image,
          recipe_id: meal.recipe_id,
          favourite: meal.favourite
        })),
        nutritionSummary: nutritionSummary
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
  };

  const seePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7); // Move the start date 7 days back
    setStartDate(newStartDate); // Update the start date
    setDays(getDays(newStartDate)); // Retrieve the days for the new week
  };

  const seeNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7); // Move the start date 7 days ahead
    setStartDate(newStartDate); // Update the start date
    setDays(getDays(newStartDate)); // Retrieve the days for the new week
  };

  const handleDelete = async mealId => {
    try {
      const response = await fetch(`/api/auth/calendar/${mealId}`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (response.ok) {
        console.log("Meal deleted");
        getMealPlan();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="border-bottom border-end border-primary border-3 shadow container mt-2">
      <h1 className="mt-1 pt-2 mb-0">Calendar</h1>
      <div className="row">
        <div className="col-6">
          {" "}
          [PLACE HOLDER FOR SETTING HOW MANY DAYS TO VIEW]
        </div>
        <div className="col-6">
          <div className="mb-3 mx-3 text-end">
            <button onClick={seePreviousWeek} className="btn">
              <i className="bi bi-arrow-left-square-fill"></i>
            </button>

            <button onClick={seeNextWeek} className="btn">
              <i className="bi bi-arrow-right-square-fill"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="calendar table table-hover shadow border-bottom border-end border-primary border-3 mb-3 pb-0">
          <thead className="table-primary border border-primary">
            <tr>
              <th></th>
              {days.map((day, index) => (
                <th
                  key={index}
                  className="text-center dates font-monospace text-lowercase fs-5 border border-primary"
                >
                  {day.date ? day.date.toLocaleDateString() : ""}
                  <br />
                  {day.dayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealName.map((mealType, mealTypeIndex) => (
              <tr key={mealTypeIndex}>
                <th className="mealName table-primary font-monospace border border-primary">
                  {mealType}
                </th>
                {days.map((day, dayIndex) => (
                  <td key={dayIndex} className="border border-primary ">
                    <div className="table-size bg-aquaLight shadow-sm rounded">
                      <div className="container pt-2">
                        <Link
                          className="text-decoration-none"
                          to={`/private/dashboard/recipe/${
                            day.meal.find(meal => meal.type === mealType)
                              ?.recipe_id
                          }`}
                        >
                          <div className="bg-secondary h6 text-black text-center border-bottom border-primary border-3 rounded">
                            {
                              day.meal.find(meal => meal.type === mealType)
                                ?.name
                            }
                          </div>

                          <img
                            src={
                              day.meal.find(meal => meal.type === mealType)?.img
                            }
                            alt={
                              day.meal.find(meal => meal.type === mealType)
                                ?.name
                            }
                            className="img-fluid border-bottom border-primary border-3 rounded "
                          />
                        </Link>

                        <div className="text-center m-0 p-0">
                          {day.meal.find(meal => meal.type === mealType) && (
                            <div>
                              <div className=" row text-center">
                                <div className="col-md-6">
                                  <button
                                    className="btn"
                                    type="button"
                                    onClick={() =>
                                      toggleFavourite(
                                        day.meal.find(
                                          meal => meal.type === mealType
                                        )?.id,
                                        !day.meal.find(
                                          meal => meal.type === mealType
                                        )?.favourite
                                      )
                                    }
                                  >
                                    <i className="bi bi-star-fill"></i>
                                  </button>
                                </div>
                                <div className="col-md-6">
                                  <button
                                    className="btn"
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        day.meal.find(
                                          meal => meal.type === mealType
                                        )?.id
                                      )
                                    }
                                  >
                                    <i className="bi bi-x-lg"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th className="mealName table-primary font-monospace border border-primary">
                Nutrition Summary
              </th>
              {days.map((day, dayIndex) => (
                <td key={dayIndex} className="border border-primary">
                  {day.nutritionSummary.calories !== 0 && (
                    <div className="nutrition-summary">
                      <p>Calories: {day.nutritionSummary.calories}</p>
                      <p>Protein: {day.nutritionSummary.protein}</p>
                      <p>Carbs: {day.nutritionSummary.carbs}</p>
                      <p>Fat: {day.nutritionSummary.fat}</p>
                      <p>Saturated Fat: {day.nutritionSummary.saturatedFat}</p>
                      <p>Cholesterol: {day.nutritionSummary.cholesterol}</p>
                      <p>Sugar: {day.nutritionSummary.sugar}</p>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
