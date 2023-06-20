const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const { Setting } = require("../models");

router.get("/restrictions", userShouldBeLoggedIn, async function(req, res) {
  try {
    const settings = await Setting.findAll({ where: { user_id: req.user_id } });

    res.send(settings);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/restrictions", userShouldBeLoggedIn, async (req, res) => {
  const { data } = req.body;
  try {
    await Promise.all(
      data.map(async restriction => {
        await Setting.create({
          type: restriction.type,
          value: restriction.value,
          user_id: req.user_id
        });
      })
    );
    res.send({ message: "Dietary restrictions added" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete("/restrictions/:id", userShouldBeLoggedIn, async (req, res) => {
  const restrictionId = req.params.id;
  const userId = req.user_id;

  try {
    const deletedRows = await Setting.destroy({
      where: {
        id: restrictionId,
        user_id: userId
      }
    });

    if (deletedRows === 0) {
      return res.status(404).send({ message: "Restriction not found" });
    }

    res.send({ message: "Restriction deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
