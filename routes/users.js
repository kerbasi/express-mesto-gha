const router = require("express").Router();

const {
  createUser,
  findAllUsers,
  findUser,
  updateUser,
} = require("../controllers/users");

router.get("/", findAllUsers);

router.get("/:userId", findUser);

router.post("/", createUser);

router.patch("/me", updateUser);

module.exports = router;
