const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    method: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = model("customers", customerSchema);
