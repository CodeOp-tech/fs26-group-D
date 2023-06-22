const axios = require("axios");
const API_KEY = "e6537df7daf94aa4874efb7d4c653df5";
// const API_KEY = "16e506963575476daaaa9a37ebd0c0be";

async function searchRecipes(
  query,
  diet,
  intolerances,
  type,
  includeIngredients,
  excludeIngredients,
  cuisine,
  equipment,
  maxReadyTime,
  minCalories,
  maxCalories,
  minCarbs,
  maxCarbs,
  minProtein,
  maxProtein,
  minFat,
  maxFat,
  minCholesterol,
  maxCholesterol,
  minSaturatedFat,
  maxSaturatedFat,
  minFiber,
  maxFiber,
  minSugar,
  maxSugar,
  includeNutrition
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
          excludeIngredients: excludeIngredients,
          cuisine: cuisine,
          equipment: equipment,
          maxReadyTime: maxReadyTime,
          minCalories: minCalories,
          maxCalories: maxCalories,
          minCarbs: minCarbs,
          maxCarbs: maxCarbs,
          minProtein: minProtein,
          maxProtein: maxProtein,
          minFat: minFat,
          maxFat: maxFat,
          minCholesterol: minCholesterol,
          maxCholesterol: maxCholesterol,
          minSaturatedFat: minSaturatedFat,
          maxSaturatedFat: maxSaturatedFat,
          minFiber: minFiber,
          maxFiber: maxFiber,
          minSugar: minSugar,
          maxSugar: maxSugar,
          includeNutrition: includeNutrition
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
