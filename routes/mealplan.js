const express = require("express");
const spoonacular = require("../services/spoonacular");
const router = express.Router();

//conect user to the API
router.post("/connect", async (req, res) => {
  try {
    const { username } = req.body;

    const connectionInfo = await spoonacular.connectUser(username);

    res.json(connectionInfo);
  } catch (error) {
    console.error("Error connecting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//generate the meal plan
router.get("/generate", async (req, res) => {
  try {
    const { timeFrame, targetCalories, diet, exclude } = req.query;
    const mealPlan = await spoonacular.generateMealPlan(
      timeFrame,
      targetCalories,
      diet,
      exclude
    );
    res.json(mealPlan);
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get meal plan for a week
router.get("/:username/week/:startDate", async (req, res) => {
  try {
    const { username, startDate, hash } = req.params;

    const plan = await spoonacular.getMealPlanForWeek(username, startDate, hash);

    res.json(plan);
  } catch (error) {
    console.error("Error retrieving meal plan for week:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get meal plan for day
router.get("/:username/day/:date", async (req, res) => {
  try {
    const { username, date, hash } = req.params;

    const response = await axios.get(
      `https://api.spoonacular.com/mealplanner/${username}/day/${date}`,
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

    res.json(response.data);
  } catch (error) {
    console.error("Error retrieving meal plan for week:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//check this ones
router.post("/:username/items", async (req, res) => {
  try {
    const { username } = req.params;
    const { hash, item } = req.body;

    await spoonacular.addToMealPlan(username, hash, item);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding item to meal plan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:username/items/:id", async (req, res) => {
  try {
    const { username, id } = req.params;

    await spoonacular.deleteMealPlanItem(username, id);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting meal plan item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
