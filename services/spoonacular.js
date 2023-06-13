const axios = require("axios");
const API_KEY = "e6537df7daf94aa4874efb7d4c653df5";

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

async function getRecipeInformation(id, includeNutrition) {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY,
          id: id,
          includeNutrition: includeNutrition
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving recipe information:", error);
    throw error;
  }
}

module.exports = {
  searchRecipes,
  getRecipeInformation
};
