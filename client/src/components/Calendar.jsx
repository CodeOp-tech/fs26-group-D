import React from "react";
import "./Calendar.css";

export default function Calendar() {
  const mealName = [
    "Breakfast",
    "Elevensies",
    "Lunch",
    "Afternoon tea",
    "Diner"
  ];

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
        meal: mealName.map(() => ({ name: "", img: "" }))
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return days;
  };

  const days = getDays();

  return (
    <div>
      <table className="calendar">
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
        {mealName.map((meal, index) => (
          <tr key={index} className="mealName">
            {meal}
            {days.map((day, index) => (
              <td key={index}>
                {day.meals &&
                  day.meals.map((meal, index) => (
                    <div key={index} className="meal">
                      {meal.name}
                      <button type="button">See Recipe</button>
                    </div>
                  ))}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
