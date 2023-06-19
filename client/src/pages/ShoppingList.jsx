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
    <div>
      {ingredientData.length === 0 ? (
        <p>The shopping list is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {ingredientData.map(ingredient => (
              <tr
                key={ingredient.id}
                className={isIngredientBought(ingredient.id) ? "bought" : ""}
                onClick={() => toggleBoughtStatus(ingredient.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{ingredient.name}</td>
                <td>
                  {ingredient.amount} {ingredient.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {ingredientData.length > 0 && (
        <button onClick={handleDeleteShoppingList}>Delete Shopping List</button>
      )}
    </div>
  );
}

export default ShoppingList;
