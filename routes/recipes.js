const express = require("express");
const spoonacular = require("../services/spoonacular");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const db = require("../model/helper");

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
      .json({ error: "An error occurred while retieving recipe information." });
  }
});

router.post("/calendar", userShouldBeLoggedIn, async function(req, res) {
  const { date, meal_type, recipe_id, recipe_title, recipe_image } = req.body;
  try {
    const results = await db(
      `INSERT INTO calendar (user_id, date, meal_type, recipe_id, recipe_title, recipe_image) VALUES("${req.user_id}", "${date}","${meal_type}","${recipe_id}","${recipe_title}", "${recipe_image}");`
    );
    res.send({ message: `"${recipe_title}" was added to you calendar` });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
