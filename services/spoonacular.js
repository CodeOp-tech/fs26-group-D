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
    console.error("Error retrieving recipes information:", error);
    throw error;
  }
}

module.exports = {
  searchRecipes,
  getRecipeInformation
};

// var SpoonacularApi = require('spoonacular_api');

// var defaultClient = SpoonacularApi.ApiClient.instance;
// // Configure API key authorization: apiKeyScheme
// var apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
// apiKeyScheme.apiKey = "e6537df7daf94aa4874efb7d4c653df5"
// // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
// //apiKeyScheme.apiKeyPrefix['x-api-key'] = "Token"

// var api = new SpoonacularApi.DefaultApi()
// var analyzeRecipeRequest = new SpoonacularApi.AnalyzeRecipeRequest(); // {AnalyzeRecipeRequest} Example request body.
// var opts = {
//   'language': en, // {String} The input language, either \"en\" or \"de\".
//   'includeNutrition': false, // {Boolean} Whether nutrition data should be added to correctly parsed ingredients.
//   'includeTaste': false // {Boolean} Whether taste data should be added to correctly parsed ingredients.
// };
// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// api.analyzeRecipe(analyzeRecipeRequest, opts, callback);
