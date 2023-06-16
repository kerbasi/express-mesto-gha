const router = require("express").Router();

const {
  createCard,
  findAllCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", findAllCards);

router.post("/", createCard);

router.delete("/:cardId", deleteCard);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
