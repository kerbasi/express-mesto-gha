const router = require("express").Router();

const {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", findAllUsers);

router.get("/:userId", findUser);

router.post("/", createUser);

router.patch("/me", updateUser);

router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
