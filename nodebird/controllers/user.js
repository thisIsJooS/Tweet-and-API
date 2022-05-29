const User = require("../models/user");

exports.addFollowing = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.deleteFollowing = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      await user.removeFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (err) {}
};

exports.updateFollowing = async (req, res, next) => {
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
};
