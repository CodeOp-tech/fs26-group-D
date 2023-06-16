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
      maxSugar
    } = req.query;
    const recipes = await spoonacular.searchRecipes(
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
      maxSugar
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
      `INSERT INTO calendar (user_id, date, meal_type, recipe_id, recipe_title, recipe_image, favourite) VALUES("${req.user_id}", "${date}","${meal_type}","${recipe_id}","${recipe_title}", "${recipe_image}", 0);`
    );
    res.send({ message: `"${recipe_title}" was added to your calendar` });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.put("/:meal_id", userShouldBeLoggedIn, async (req, res) => {
  const { meal_id } = req.params;
  const { favourite } = req.body;
  try {
    await db(
      `UPDATE calendar SET favourite=${favourite} WHERE id = ${meal_id}; `
    );
    res.send({ message: `Meal added to/removed from your favourites` });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
