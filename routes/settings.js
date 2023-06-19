const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const db = require("../model/helper");

router.get("/restrictions", userShouldBeLoggedIn, function(req, res) {
  db(`SELECT * FROM settings WHERE id=${req.user_id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/restrictions", userShouldBeLoggedIn, async (req, res) => {
  const { diet, allergies, bad_food } = req.body;

  try {
    await db(
      `INSERT INTO users (user_id, diet, allergies, bad_food) VALUES("${req.user_id}, ${diet}","${allergies}","${bad_food}");`
    );
    res.send({ message: "Diestary restrictions added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/calendar/:meal_id", userShouldBeLoggedIn, async (req, res) => {
  const { meal_id } = req.params;
  try {
    await db(`DELETE FROM calendar WHERE id = ${meal_id};`);
    res.send("Meal removed");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
