const { Schema, model } = require("mongoose");

const myShopWalletsSchema = new Schema(
  {
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

module.exports = model("myShopWallets", myShopWalletsSchema);
