const { Schema, model } = require("mongoose");

const bannerSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      require: true,
    },
    banner: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = model("banners", bannerSchema);
