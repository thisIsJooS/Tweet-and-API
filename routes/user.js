const express = require("express");
const bcrypt = require("bcrypt");

const { isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (err) {}
});

router.post("/:id/unfollow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (err) {}
});

router.post("/update", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send("no user");
    }

    const check = await bcrypt.compare(req.body.password, user.password);
    if (!check) {
      return res.status(404).send("invalid password");
    }

    await user.set({
      nick: req.body.nick,
    });
    await user.save();

    return res.redirect("/");
  } catch (err) {}
});

module.exports = router;
