import React, { useState, useEffect } from "react";
import Select from "react-select";

import "../App.css";

function Settings() {
  const [diet, setDiet] = useState("");
  const [intolerance, setIntolerance] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [restrictions, setRestrictions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRestrictions();
  }, []);

  const addRestrictions = async e => {
    e.preventDefault();
    const input = {
      data: []
    };
    if (diet) {
      input.data.push({ type: "diet", value: diet });
    }

    if (intolerance) {
      input.data.push({ type: "allergies", value: intolerance });
    }

    if (excludeIngredients) {
      input.data.push({ type: "bad_food", value: excludeIngredients });
    }

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
      const response = await fetch("/api/settings/restrictions", options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Handle successful response here
      alert(`Dietary restrictions have been added to your settings`);
      console.log("Restrictions added successfully");
      setIntolerance("");
      setDiet("");
      setExcludeIngredients("");
      getRestrictions();
    } catch (err) {
      setError(err.message);
    }
  };

  async function getRestrictions() {
    try {
      const response = await fetch(`/api/settings/restrictions`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(response.statusText);
      setRestrictions(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const handleDelete = async restrictionId => {
    try {
      const response = await fetch(
        `/api/settings/restrictions/${restrictionId}`,
        {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      if (response.ok) {
        console.log("Restriction deleted");
        getRestrictions();
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Settings page</h2>
      <div>
        <h3>Default Dietary restrictions</h3>
        <form onSubmit={addRestrictions}>
          <label>
            Diet
            <Select
              value={diet ? { value: diet, label: diet } : null}
              onChange={selectedOption => setDiet(selectedOption.value)}
              options={[
                { value: "", label: "Select a diet" },
                { value: "gluten free", label: "Gluten Free" },
                { value: "ketogenic", label: "Ketogenic" },
                { value: "vegetarian", label: "Vegetarian" },
                { value: "lacto-vegetarian", label: "Lacto-Vegetarian" },
                { value: "ovo-vegetarian", label: "Ovo-Vegetarian" },
                { value: "vegan", label: "Vegan" },
                { value: "pescetarian", label: "Pescetarian" },
                { value: "paleo", label: "Paleo" },
                { value: "primal", label: "Primal" },
                { value: "low FODMAP", label: "Low FODMAP" },
                { value: "whole30", label: "Whole30" }
              ]}
            />
          </label>
          <label>
            Intolerances
            <Select
              value={
                intolerance ? { value: intolerance, label: intolerance } : null
              }
              onChange={selectedOption => setIntolerance(selectedOption.value)}
              options={[
                { value: "dairy", label: "Dairy" },
                { value: "egg", label: "Egg" },
                { value: "gluten", label: "Gluten" },
                { value: "grain", label: "Grain" },
                { value: "peanut", label: "Peanut" },
                { value: "seafood", label: "Seafood" },
                { value: "sesame", label: "Sesame" },
                { value: "shellfish", label: "Shellfish" },
                { value: "soy", label: "Soy" },
                { value: "sulfite", label: "Sulfite" },
                { value: "tree nut", label: "Tree Nut" },
                { value: "wheat", label: "Wheat" }
              ]}
            />
          </label>
          <label>
            {" "}
            Ingredients to exclude:
            <input
              type="text"
              name="excludeIngredients"
              value={excludeIngredients}
              onChange={e => setExcludeIngredients(e.target.value)}
            />
          </label>
          <button type="submit">Add Dietary Preferences</button>
        </form>
        <div>
          <h4>Your Diet</h4>
          {restrictions.map((restriction, index) => (
            <div key={index}>
              {restriction.type === "diet" && (
                <>
                  <p>
                    {restriction.value}
                    <button
                      type="button"
                      onClick={() => handleDelete(restriction.id)}
                    >
                      ❌
                    </button>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <h4>Your Allergies</h4>
          {restrictions.map((restriction, index) => (
            <div key={index}>
              {restriction.type === "allergies" && (
                <>
                  <p>
                    {restriction.value}
                    <button
                      type="button"
                      onClick={() => handleDelete(restriction.id)}
                    >
                      ❌
                    </button>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
        <div>
          <h4>Food you don't like</h4>
          {restrictions.map((restriction, index) => (
            <div key={index}>
              {restriction.type === "bad_food" && (
                <>
                  <p>
                    {restriction.value}
                    <button
                      type="button"
                      onClick={() => handleDelete(restriction.id)}
                    >
                      ❌
                    </button>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
