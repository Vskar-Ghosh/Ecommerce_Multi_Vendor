const cardController = require("../../controllers/home/cardController");

const router = require("express").Router();

router.post("/home/product/add-to-card", cardController.add_to_card);
router.put("/home/product/qunatity-inc/:cardId", cardController.quantity_inc);
router.put("/home/product/qunatity-dec/:cardId", cardController.quantity_dec);
router.delete(
  "/home/product/delete-card-product/:cardId",
  cardController.delete_card_product
);
router.get(
  "/home/product/get-card-product/:userId",
  cardController.get_card_products
);
router.post("/home/product/add-to-wishlist", cardController.add_to_wishlist);
router.get(
  "/home/product/get-wishlist-products/:userId",
  cardController.get_wishlist_products
);
router.delete(
  "/home/product/delete-wishlist-product/:wishlistId",
  cardController.delete_wishlist_product
);

module.exports = router;
