const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const db = require("../model/helper");

router.get("/restrictions", userShouldBeLoggedIn, function(req, res) {
  db(`SELECT * FROM settings WHERE user_id=${req.user_id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/restrictions", userShouldBeLoggedIn, async (req, res) => {
  const { diet, allergies, bad_food } = req.body;

  try {
    await db(
      `INSERT INTO settings (user_id, diet, allergies, bad_food) VALUES("${req.user_id}, ${diet}","${allergies}","${bad_food}");`
    );
    res.send({ message: "Dietary restrictions added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/restrictions", userShouldBeLoggedIn, async (req, res) => {
  try {
    await db(`DELETE FROM settings WHERE user_id = ${req.user_id};`);
    res.send("Dietary restrictions removed");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
