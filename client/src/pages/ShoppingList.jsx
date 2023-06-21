import React, { useContext, useState } from "react";
import IngredientContext from "../components/context/IngredientContext";
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

  return (
    <>
      <div className="container col-8 mt-4 border-bottom border-end border-primary border-3 shadow text-center">
        <h1>Shopping List</h1>
        <div className="mx-auto  p-3 mb-4 ">
          {ingredientData.length === 0 ? (
            <p>The shopping list is empty</p>
          ) : (
            <div className="row justify-content-center">
              <div className="col-auto">
                <table className="table table-responsive text-center">
                  <thead>
                    <tr>
                      <th className="h5 px-4">Ingredient</th>
                      <th className="h5 px-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientData.map(ingredient => (
                      <tr
                        key={ingredient.id}
                        className={
                          isIngredientBought(ingredient.id) ? "bought" : ""
                        }
                        onClick={() => toggleBoughtStatus(ingredient.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td className="px-4">{ingredient.name}</td>
                        <td className="px-4">
                          {ingredient.amount} {ingredient.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {ingredientData.length > 0 && (
            <button
              className="btn mb-3 pushable-s m-3"
              onClick={handleDeleteShoppingList}
            >
              <span className="shadow-btn-s"></span>
              <span className="edge-s"></span>
              <span className="front-s"> Delete Shopping List </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ShoppingList;
