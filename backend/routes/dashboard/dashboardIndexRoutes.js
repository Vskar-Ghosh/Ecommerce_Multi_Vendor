const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const dashboardIndexController = require("../../controllers/dashboard/dashboardIndexController");

router.get(
  "/seller/get-dashboard-index-data",
  authMiddleware,
  dashboardIndexController.get_seller_dashboard_data
);

router.get(
  "/admin/get-dashboard-index-data",
  authMiddleware,
  dashboardIndexController.get_admin_dashboard_data
);

module.exports = router;
