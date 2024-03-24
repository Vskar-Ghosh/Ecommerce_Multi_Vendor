const { Schema, model } = require("mongoose");

const stripeSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      require: true,
    },
    stripeId: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("stripe", stripeSchema);
