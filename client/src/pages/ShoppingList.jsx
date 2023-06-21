import React, { useContext, useState } from "react";
import IngredientContext from "../components/context/IngredientContext";
// import emailTransporter from "../mailer";
import "../App.css";

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

  const ingredientsByAisle = {};

  ingredientData.forEach(ingredient => {
    const { aisle } = ingredient;
    if (!ingredientsByAisle[aisle]) {
      ingredientsByAisle[aisle] = [];
    }
    ingredientsByAisle[aisle].push(ingredient);
  });

  return (
    <div>
      {ingredientData.length === 0 ? (
        <div>
          <p>The shopping list is empty</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Aisle</th>
              <th>Ingredient</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(ingredientsByAisle).map(([aisle, ingredients]) => {
              let previousAisle = null; // Track the previous aisle
              return (
                <React.Fragment key={aisle}>
                  {ingredients.map((ingredient, index) => {
                    const shouldRenderAisle = previousAisle !== aisle;
                    previousAisle = aisle; // Update the previous aisle

                    return (
                      <tr
                        key={ingredient.id}
                        className={
                          isIngredientBought(ingredient.id) ? "bought" : ""
                        }
                        onClick={() => toggleBoughtStatus(ingredient.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {shouldRenderAisle && index === 0 && (
                          <td
                            rowSpan={ingredients.length}
                            className="aisle-row"
                          >
                            {aisle}
                          </td>
                        )}
                        <td>{capitalizeFirstLetter(ingredient.name)}</td>
                        <td>
                          {isSmallUnit(ingredient.unit)
                            ? ""
                            : `${ingredient.amount} ${ingredient.unit}`}
                        </td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
      {ingredientData.length > 0 && (
        <div>
          <button onClick={handleDeleteShoppingList}>
            Delete Shopping List
          </button>
          {/* <button onClick={sendShoppingListEmail}>Email Shopping List</button> */}
        </div>
      )}
    </div>
  );
}

export default ShoppingList;
