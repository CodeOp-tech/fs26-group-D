import React, { useState } from "react";
import { useEffect } from "react";
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
    "diner"
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
      console.log(data);
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
      const formattedCurrentDay = dayjs(currentDay).format("DD/MM/YYYY");
      const mealsForCurrentDay = mealPlan.filter(
        meal => dayjs(meal.date).format("DD/MM/YYYY") === formattedCurrentDay
      );

      days.push({
        date: new Date(currentDay),
        dayName: weekday[currentDay.getDay()],
        meal: mealsForCurrentDay.map(meal => ({
          type: meal.meal_type,
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
          {mealName.map((mealType, mealTypeIndex) => (
            <tr key={mealTypeIndex}>
              <th className="mealName">{mealType}</th>
              {days.map((day, dayIndex) => (
                <td key={dayIndex} className="meal">
                  {day.meal.find(meal => meal.type === mealType)?.name}
                  <img
                    src={day.meal.find(meal => meal.type === mealType)?.img}
                    alt={day.meal.find(meal => meal.type === mealType)?.name}
                  />
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
