const { Schema, model } = require("mongoose");

const sellerCustomerScheam = new Schema(
  {
    myId: {
      type: String,
      require: true,
    },
    myFriends: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = model("seller_customer", sellerCustomerScheam);
