import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";

import "../App.css";

function Settings({ setProfileSummary, profileSummary }) {
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
    <>
      <div className="px-4">
        <div className="container">
          <div className="row py-3 mt-3 border-bottom border-end border-secondary border-3 shadow">
            <h1 className="">Settings</h1>

            <div className="container">
              {profileSummary || (
                <div className="bg-aquaLight border-bottom border-end border-secondary border-3 p-3 shadow-sm">
                  <h3 className="h5">Set Defaults:</h3>
                  <form onSubmit={addRestrictions}>
                    <div className="row">
                      <label>
                        Diet
                        <Select
                          value={diet ? { value: diet, label: diet } : null}
                          onChange={selectedOption =>
                            setDiet(selectedOption.value)
                          }
                          options={[
                            { value: "", label: "Select a diet" },
                            { value: "gluten free", label: "Gluten Free" },
                            { value: "ketogenic", label: "Ketogenic" },
                            { value: "vegetarian", label: "Vegetarian" },
                            {
                              value: "lacto-vegetarian",
                              label: "Lacto-Vegetarian"
                            },
                            {
                              value: "ovo-vegetarian",
                              label: "Ovo-Vegetarian"
                            },
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
                            intolerance
                              ? { value: intolerance, label: intolerance }
                              : null
                          }
                          onChange={selectedOption =>
                            setIntolerance(selectedOption.value)
                          }
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
                          className="form-control"
                        />
                      </label>
                    </div>
                    <div className="text-end pt-3 pb-0 mb-0">
                      <button type="submit" className="btn mb-3 pushable-s">
                        <span className="shadow-btn-s"></span>
                        <span className="edge-s"></span>
                        <span className="front-s">
                          {" "}
                          Add Dietary Preferences{" "}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {profileSummary && (
                <div className="bg-aquaLight border-bottom border-end border-secondary border-3 p-3 shadow-sm text-end">
                  <Link
                    to={`/private/dashboard/settings`}
                    className="text-decoration-none"
                  >
                    <button className="my-auto btn  pushable-b ">
                      <span className="shadow-btn-b"></span>
                      <span className="edge-b"></span>
                      <span className="front-b">
                        Update your dietary preferences{" "}
                      </span>
                    </button>
                  </Link>
                </div>
              )}

              <div>
                <div className="container">
                  <div className="row py-3 mt-3 border-bottom border-end border-secondary border-3 shadow">
                    <h3 className="h5">Restrictions Summary:</h3>
                    <div>
                      <ul className="list-group-flush">
                        <div className="mb-2">
                          <h4 className="h6">Diet</h4>
                          {restrictions.map((restriction, index) => (
                            <div key={index}>
                              {restriction.type === "diet" && (
                                <li className="list-group-item d-flex py-1">
                                  <span className="bg-aquaLight p-2 rounded border-bottom border-secondary border-3">
                                    {" "}
                                    {restriction.value}
                                    <span className="ms-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDelete(restriction.id)
                                        }
                                        className="btn-close"
                                      ></button>
                                    </span>
                                  </span>
                                </li>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mb-2">
                          <h4 className="h6">Allergies</h4>
                          {restrictions.map((restriction, index) => (
                            <div key={index}>
                              {restriction.type === "allergies" && (
                                <li className="list-group-item d-flex  py-1 ">
                                  <span className="bg-aquaLight p-2 rounded border-bottom border-secondary border-3">
                                    {" "}
                                    {restriction.value}
                                    <span className="ms-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDelete(restriction.id)
                                        }
                                        className="btn-close"
                                      ></button>
                                    </span>
                                  </span>
                                </li>
                              )}
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="h6">Always Exclude</h4>
                          {restrictions.map((restriction, index) => (
                            <div key={index}>
                              {restriction.type === "bad_food" && (
                                <li className="list-group-item d-flex  py-1 ">
                                  <span className="bg-aquaLight p-2 rounded border-bottom border-secondary border-3">
                                    {" "}
                                    {restriction.value}
                                    <span className="ms-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDelete(restriction.id)
                                        }
                                        className="btn-close"
                                      ></button>
                                    </span>
                                  </span>
                                </li>
                              )}
                            </div>
                          ))}
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
