const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const { User, Calendar } = require("../models");

require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hash
    });
    console.log(user);
    res.send({ message: "You are now registered." });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      let token = jwt.sign({ user_id }, supersecret);
      res.send({
        message: "Login successful, here is your token",
        token,
        user_id
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/user", userShouldBeLoggedIn, async (req, res) => {
  const { user_id } = req;

  try {
    const user = await User.findByPk(user_id);
    if (user) {
      res.send(user);
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/calendar", userShouldBeLoggedIn, async (req, res) => {
  try {
    const calendarEvents = await Calendar.findAll({
      where: { user_id: req.user_id }
    });
    res.send(calendarEvents);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/favourites", userShouldBeLoggedIn, async (req, res) => {
  try {
    const calendarEvents = await Calendar.findAll({
      where: { user_id: req.user_id, favourite: true }
    });
    res.send(calendarEvents);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete("/calendar/:meal_id", userShouldBeLoggedIn, async (req, res) => {
  const { meal_id } = req.params;
  try {
    await Calendar.destroy({ where: { id: meal_id } });
    res.send("Meal removed");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
