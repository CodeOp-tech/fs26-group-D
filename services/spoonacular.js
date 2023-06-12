const axios = require("axios");
const API_KEY = "e6537df7daf94aa4874efb7d4c653df5";

//Ask about this one
async function connectUser(username) {
  try {
    const response = await axios.post(
      "https://api.spoonacular.com/users/connect",
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          username: username,
          apiKey: API_KEY
        }
      }
    );
    const { username: connectedUsername, hash } = response.data;
    return { connectedUsername, hash };
  } catch (error) {
    console.error("Error connecting user:", error);
    throw error;
  }
}

async function generateMealPlan(timeFrame, targetCalories, diet, exclude) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/mealplanner/generate`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          timeFrame: timeFrame,
          targetCalories: targetCalories,
          diet: diet,
          exclude: exclude,
          apiKey: API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
}

async function getMealPlanForWeek(username, startDate, hash) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/mealplanner/${username}/week/${startDate}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          username: username,
          "start-date": startDate,
          hash: hash,
          apiKey: API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving meal plan for week:", error);
    throw error;
  }
}

async function getMealPlanForDay(username, date, hash) {
  try {
    const response = await axios.get(
      ` https://api.spoonacular.com/mealplanner/{username}/day/{date}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          username: username,
          date: date,
          hash: hash,
          apiKey: API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving meal plan for day:", error);
    throw error;
  }
}

async function addToMealPlan(username, hash, item) {
  try {
    const response = await axios.post(
      `https://api.spoonacular.com/mealplanner/${username}/items`,
      item,
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          username: username,
          hash: hash,
          apiKey: API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding item to meal plan:", error);
    throw error;
  }
}

async function deleteMealPlanItem(username, id, hash) {
  try {
    const response = await axios.delete(
      `https://api.spoonacular.com/mealplanner/${username}/items/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          username: username,
          id: id,
          hash: hash,
          apiKey: API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting meal plan item:", error);
    throw error;
  }
}

async function searchRecipes(
  query,
  diet,
  intolerances,
  type,
  includeIngredients,
  addRecipeNutrition,
  maxReadyTime,
  maxCarbs,
  minProtein,
  maxCalories,
  maxFat,
  maxFiber
) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: API_KEY,
          query: query,
          diet: diet,
          intolerances: intolerances,
          type: type,
          includeIngredients: includeIngredients,
          addRecipeNutrition: addRecipeNutrition,
          maxReadyTime: maxReadyTime,
          maxCarbs: maxCarbs,
          minProtein: minProtein,
          maxCalories: maxCalories,
          maxFat: maxFat,
          maxFiber: maxFiber
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error searching recipes:", error);
    throw error;
  }
}

module.exports = {
  searchRecipes,
  connectUser,
  generateMealPlan,
  addToMealPlan,
  deleteMealPlanItem,
  getMealPlanForWeek,
  getMealPlanForDay
};
