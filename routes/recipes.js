const express = require("express");
const spoonacular = require("../services/spoonacular");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const {
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
    } = req.query;
    const recipes = await spoonacular.searchRecipes(
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
    );
    res.json(recipes);
  } catch (error) {
    console.error("Error searching recipes:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching recipes." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { includeNutrition } = req.query;

    const recipe = await spoonacular.getRecipeInformation(id, includeNutrition);
    res.json(recipe);
  } catch (error) {
    console.error("Error retrieving recipe information:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while retrieving recipe information."
      });
  }
});

module.exports = router;
