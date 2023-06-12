const express = require("express");
const spoonacular = require("./spoonacular");

const app = express();

app.get("/recipes", async (req, res) => {
  try {
    const query = req.query.q; // Assuming you pass the search query as a query parameter

    const recipes = await spoonacular.searchRecipes(query);

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
