const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    orderId: {
      type: Schema.ObjectId,
      require: true,
    },
    sellerId: {
      type: Schema.ObjectId,
      require: true,
    },
    products: {
      type: Array,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    paymetn_status: {
      type: String,
      require: true,
    },
    shippingInfo: {
      type: String,
      require: true,
    },
    delivery_status: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = model("authOrders", authorSchema);
