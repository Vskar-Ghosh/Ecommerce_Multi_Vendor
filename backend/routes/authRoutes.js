const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddleware, authControllers.getUser);
router.post("/seller-register", authControllers.seller_register);
router.post("/seller-login", authControllers.seller_login);
router.post(
  "/profile-image-upload",
  authMiddleware,
  authControllers.profile_image_uplaod
);
router.post(
  "/profile-info-add",
  authMiddleware,
  authControllers.profile_info_add
);

router.put(
  "/seller-update-pass",
  authMiddleware,
  authControllers.seller_update_pass
);

router.get("/logout", authMiddleware, authControllers.logout);

module.exports = router;
