import React from "react";
import "./Calendar.css";

export default function Calendar({ days }) {
  return (
    <div class="calendar">
      {days.map((day, index) => {
        return (
          <div key={index}>
            <div>{day.date.toLocaleDateString()}</div>
            <div>{day.date.getDay()}</div>
            <div>
              {day.meals &&
                day.meals.map((meal, index) => {
                  return (
                    <div key={index}>
                      <div>{meal.name}</div>
                      <div>{meal.food}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
