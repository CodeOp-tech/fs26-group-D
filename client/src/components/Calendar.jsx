import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const [startDate, setStartDate] = useState(new Date()); // Start with the current date

  useEffect(() => {
    getMealPlan();
    getDays();
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
  const getDays = startDate => {
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
    const currentDay = new Date(startDate);

    currentDay.setDate(currentDay.getDate() - currentDay.getDay() + 1); // Set the current day to Monday

    for (let i = 0; i < 7; i++) {
      const formattedCurrentDay = dayjs(currentDay).format("DD/MM/YYYY");
      const mealsForCurrentDay = mealPlan.filter(
        meal => dayjs(meal.date).format("DD/MM/YYYY") === formattedCurrentDay
      );

      days.push({
        date: new Date(currentDay),
        dayName: weekday[currentDay.getDay()],
        meal: mealsForCurrentDay.map(meal => ({
          id: meal.id,
          type: meal.meal_type,
          name: meal.recipe_title,
          img: meal.recipe_image
        }))
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

  const [days, setDays] = useState(getDays(startDate));

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
        getDays();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={seePreviousWeek}>⬅️</button>
        <button onClick={seeNextWeek}>➡️</button>
      </div>
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
                  <div>
                    {day.meal.find(meal => meal.type === mealType) && (
                      <div>
                        <div>
                          <button type="button">See Recipe</button>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                day.meal.find(meal => meal.type === mealType)
                                  ?.id
                              )
                            }
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
