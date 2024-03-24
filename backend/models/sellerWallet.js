const { Schema, model } = require("mongoose");

const sellerWalletsSchema = new Schema(
  {
    sellerId: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    month: {
      type: Number,
      require: true,
    },
    year: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("sellerWallets", sellerWalletsSchema);
