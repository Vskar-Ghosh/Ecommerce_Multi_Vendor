const router = require("express").Router();
const paymentControlle = require("../controllers/payment/paymentControlle");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get(
  "/payment/create-stripe-connect-account",
  authMiddleware,
  paymentControlle.create_stripe_connect_account
);

router.put(
  "/payment/active-stripe-connect-account/:activeCode",
  authMiddleware,
  paymentControlle.active_stripe_connect_account
);

router.get(
  "/payment/seller-payment-details/:sellerId",
  authMiddleware,
  paymentControlle.get_seller_payment_details
);

router.post(
  "/payment/withdrowl-request",
  authMiddleware,
  paymentControlle.send_withdrowl_request
);

router.get(
  "/payment/request",
  authMiddleware,
  paymentControlle.get_payment_request
);

router.post(
  "/payment/payment-request-confirm",
  authMiddleware,
  paymentControlle.payment_request_confirm
);

module.exports = router;
