import React, { useState } from "react";
import { useEffect } from "react";
import "./Calendar.css";

export default function Calendar() {
  const [mealPlan, setMealPlan] = useState([]);
  const [error, setError] = useState("");
  const mealName = [
    "Breakfast",
    "Elevensies",
    "Lunch",
    "Afternoon tea",
    "Diner"
  ];

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
      console.log(mealPlan);
    } catch (err) {
      setError(err.message);
    }
  }

  // function to create an array with 7 days of the current week, starting from Monday
  const getDays = () => {
    const days = [];
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const currentDay = new Date(today.setDate(diff));

    for (let i = 0; i < 7; i++) {
      days.push({
        date: new Date(currentDay),
        dayName: weekday[currentDay.getDay()],
        meal: mealPlan.map(meal => ({
          name: meal.recipe_title,
          img: meal.recipe_image
        }))
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
  };

  const days = getDays();

  return (
    <div>
      <table className="calendar">
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={index} className="dates">
                {day.date ? day.date.toLocaleDateString() : ""}
                <br />
                {day.dayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mealName.map((meal, index) => (
            <tr>
              <th key={index} className="mealName">
                {meal}
              </th>
              {mealPlan.map((meal, index) => (
                <td key={index} className="meal">
                  {meal.recipe_title}
                  <img src={meal.recipe_image} alt={meal.recipe_title} />
                  <button type="button">See Recipe</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
