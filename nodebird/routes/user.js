const express = require("express");
const bcrypt = require("bcrypt");

const { isLoggedIn } = require("./middlewares");
const {
  addFollowing,
  deleteFollowing,
  updateFollowing,
} = require("../controllers/user");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, addFollowing);

router.delete("/:id/follow", isLoggedIn, deleteFollowing);

router.post("/update", isLoggedIn, updateFollowing);

module.exports = router;
