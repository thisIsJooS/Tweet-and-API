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
    if (req.user.provider == "local") {
      await User.update(
        { nick: req.body.nick },
        { where: { id: req.user.id } }
      );
    } else if (req.user.provider == "kakao") {
      await User.update(
        { nick: req.body.nick },
        { where: { snsId: req.user.snsId } }
      );
    }

    return res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
