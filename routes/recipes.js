const express = require("express");
const { searchRecipes } = require("../services/spoonacular");

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
    } = req.body;
    const recipes = await searchRecipes(
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

module.exports = router;
