import React, { useContext, useState, useMemo } from "react";
import IngredientContext from "../components/context/IngredientContext";
// import emailTransporter from "../mailer";
import "../App.css";
import { Link } from "react-router-dom";

function ShoppingList() {
  const { ingredientData, setIngredientData } = useContext(IngredientContext);
  const [boughtIngredients, setBoughtIngredients] = useState([]);

  const toggleBoughtStatus = ingredientId => {
    if (boughtIngredients.includes(ingredientId)) {
      setBoughtIngredients(boughtIngredients.filter(id => id !== ingredientId));
    } else {
      setBoughtIngredients([...boughtIngredients, ingredientId]);
    }
  };

  const isIngredientBought = ingredientId => {
    return boughtIngredients.includes(ingredientId);
  };

  const handleDeleteShoppingList = () => {
    setIngredientData([]);
    setBoughtIngredients([]);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function isSmallUnit(unit) {
    const smallUnits = [
      "tbsp",
      "tablespoon",
      "tablespoons",
      "dash",
      "pinch",
      "teaspoon",
      "teaspoons",
      "handful",
      "tsp"
    ];
    return smallUnits.includes(unit.toLowerCase());
  }

  // const sendShoppingListEmail = async () => {
  //   try {
  //     // Fetch the user's email address from the database
  //     const userResponse = await fetch(`/api/auth/user`, {
  //       headers: {
  //         authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     });
  //     const userData = await userResponse.json();
  //     if (!userResponse.ok) throw new Error(userResponse.statusText);
  //     const userEmail = userData.email;

  //     // Compose the email
  //     const emailOptions = {
  //       from: "busybytes123@gmail.com",
  //       to: userEmail,
  //       subject: "Shopping List",
  //
  //
  //       // text: ingredientData
  //       //   .map(
  //       //     (ingredient) =>
  //       //       `${ingredient.name} - ${ingredient.amount} ${ingredient.unit}`
  //       //   )
  //       //   .join("\n"),
  //     };

  //     // Send the email
  //     const info = await transporter.sendMail(emailOptions);
  //     console.log("Email sent:", info.response);
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };

  const ingredientsByAisle = useMemo(() => {
    const result = {};

    ingredientData.forEach(ingredient => {
      const { aisle } = ingredient;
      if (!result[aisle]) {
        result[aisle] = [];
      }
      result[aisle].push(ingredient);
    });

    return result;
  }, [ingredientData]);

  return (
    <>
      <div className="container col-md-8 mt-4 border-bottom border-end border-primary border-3 shadow text-center">
        <h1>Shopping List</h1>
        <div className="mx-auto  p-3 mb-4 ">
          {ingredientData.length === 0 ? (
            <p>
              Shopping list is empty. <br />
              View some recipes to add ingredents.
              <div className="my-3">
                <Link
                  to={`/private/dashboard/newmealplan`}
                  className="text-decoration-none"
                >
                  <button className="my-auto btn  pushable-b">
                    <span className="shadow-btn-b"></span>
                    <span className="edge-b"></span>
                    <span className="front-b">SEARCH FOR RECIPES</span>
                  </button>
                </Link>
              </div>
            </p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-auto">
                <table className="table table-responsive text-center">
                  <thead>
                    <tr>
                      <th className="h5 px-4">Aisle</th>
                      <th className="h5 px-4">Ingredient</th>
                      <th className="h5 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(ingredientsByAisle).map(
                      ([aisle, ingredients], i) => {
                        let previousAisle = null; // Track the previous aisle
                        return (
                          <React.Fragment key={i}>
                            {ingredients.map((ingredient, index) => {
                              const shouldRenderAisle = previousAisle !== aisle;
                              previousAisle = aisle; // Update the previous aisle
                              return (
                                <tr
                                  key={ingredient.id}
                                  className={
                                    isIngredientBought(ingredient.id)
                                      ? "bought"
                                      : ""
                                  }
                                  onClick={() =>
                                    toggleBoughtStatus(ingredient.id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {shouldRenderAisle && index === 0 && (
                                    <td
                                      className="px-4 aisle-row"
                                      rowSpan={ingredients.length}
                                    >
                                      {aisle}
                                    </td>
                                  )}
                                  <td className="px-4">
                                    {capitalizeFirstLetter(ingredient.name)}
                                  </td>
                                  <td className="px-4">
                                    {isSmallUnit(ingredient.unit)
                                      ? ""
                                      : `${ingredient.amount} ${ingredient.unit}`}
                                  </td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {ingredientData.length > 0 && (
            <div>
              <button
                className="btn mb-3 pushable-s m-3"
                onClick={handleDeleteShoppingList}
              >
                <span className="shadow-btn-s"></span>
                <span className="edge-s"></span>
                <span className="front-s"> Delete Shopping List </span>
              </button>
              {/* <button onClick={sendShoppingListEmail}>Email Shopping List</button> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShoppingList;
