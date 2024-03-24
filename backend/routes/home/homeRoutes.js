const homeController = require("../../controllers/home/homeController");

const router = require("express").Router();

router.get("/get-categorys", homeController.get_categorys);
router.get("/get-products", homeController.get_products);
router.get("/get-product/:slug", homeController.get_product);
router.get("/price-range-latest-products", homeController.price_range_product);
router.get("/query-products", homeController.query_products);
router.post("/customer/submit-review", homeController.customer_review);
router.get("/customer/get-reviews/:productId", homeController.get_reviews);

module.exports = router;
