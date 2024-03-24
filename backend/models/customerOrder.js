const { Schema, model } = require("mongoose");

const customerOrder = new Schema(
  {
    customerId: {
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
      type: Object,
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
module.exports = model("customerOrders", customerOrder);
