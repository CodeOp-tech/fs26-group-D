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
  // db(`SELECT * FROM settings WHERE user_id=${req.user_id};`)
  //   .then((results) => {
  //     res.send(results.data);
  //   })
  //   .catch((err) => res.status(500).send(err));
});

// THIS NEEDS REFACTORING
router.post("/restrictions", userShouldBeLoggedIn, async (req, res) => {
  const { data } = req.body;

  // const data = [
  //   {
  //     type: "diet",
  //     value: "vegan",
  //   },
  //   {
  //     type: "allergies",
  //     value: "peanuts",
  //   },
  //   {
  //     type: "bad_food",
  //     value: "mushrooms",
  //   },
  // ];

  try {
    // await db(
    //   `INSERT INTO settings (user_id, diet, allergies, bad_food) VALUES(${req.user_id}, "${diet}","${allergies}","${bad_food}");`
    // );
    await Setting.bulkCreate(
      data.map(setting => ({ ...setting, user_id: req.user_id }))
    );
    res.send({ message: "Dietary restrictions added" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete(
  "/restrictions/:id",
  userShouldBeLoggedIn,
  async (req, res) => {}
);

// router.put("/restrictions/:id", userShouldBeLoggedIn, async (req, res) => {
//   const { id } = req.params;
//   const { diet, allergies, bad_food } = req.body;

//   try {
//     // await db(
//     //   `UPDATE settings SET diet = "${diet}", allergies = "${allergies}", bad_food = "${bad_food}" WHERE id = ${id};`
//     // );
//     await Setting.update(
//       {
//         diet,
//         allergies,
//         bad_food,
//       },
//       { where: { id } }
//     );
//     res.send({ message: "Dietary restrictions updated" });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// });

// router.delete(
//   "/restrictions/:restriction",
//   userShouldBeLoggedIn,
//   async (req, res) => {
//     const { restriction } = req.params;
//     try {
//       await db(
//         `UPDATE settings
//         SET diet = NULL
//         WHERE user_id = '${req.user_id}' AND diet = '${restriction}';

//         UPDATE settings
//         SET allergies = NULL
//         WHERE user_id = '${req.user_id}' AND allergies = '${restriction}';

//         UPDATE settings
//         SET bad_food = NULL
//         WHERE user_id = '${req.user_id}' AND bad_food = '${restriction}';`
//       );
//       res.send("Dietary restriction removed");
//     } catch (err) {
//       res.status(500).send(err);
//     }
//   }
// );

module.exports = router;
