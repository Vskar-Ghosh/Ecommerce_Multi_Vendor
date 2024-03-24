const authOrder = require("../../models/authOrder");
const customerOrder = require("../../models/customerOrder");
const sellerWallet = require("../../models/sellerWallet");
const myShopWallet = require("../../models/myShopWallet");
const sellerModel = require("../../models/sellerModel");
const adminSellerMessages = require("../../models/chat/adminSellerMessages");
const sellerCustomerMessage = require("../../models/chat/sellerCustomerMessage");
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utiles/response");
const {
  mongo: { ObjectId },
} = require("mongoose");

module.exports.get_seller_dashboard_data = async (req, res) => {
  const { id } = req;

  try {
    const totalSale = await sellerWallet.aggregate([
      {
        $match: {
          sellerId: {
            $eq: id,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const totalProduct = await productModel
      .find({
        SellerId: new ObjectId(id),
      })
      .countDocuments();
    const totalOrder = await authOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .countDocuments();

    const totalPendingOrder = await authOrder
      .find({
        $and: [
          {
            sellerId: {
              $eq: new ObjectId(id),
            },
          },
          {
            delivery_status: {
              $eq: "pending",
            },
          },
        ],
      })
      .countDocuments();
    const messages = await sellerCustomerMessage
      .find({
        $or: [
          {
            senderId: {
              $eq: id,
            },
          },
          {
            reciverId: {
              $eq: id,
            },
          },
        ],
      })
      .limit(3)
      .sort({
        createdAt: -1,
      });

    const recentOrders = await authOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .limit(5);

    responseReturn(res, 200, {
      totalOrder,
      totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
      messages,
      totalProduct,
      totalPendingOrder,
      recentOrders,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.get_admin_dashboard_data = async (req, res) => {
  const { id } = req;

  try {
    const totalSale = await myShopWallet.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalProduct = await productModel.find({}).countDocuments();
    const totalOrder = await customerOrder.find({}).countDocuments();
    const totalSeller = await sellerModel.find({}).countDocuments();
    const messages = await adminSellerMessages
      .find({})
      .limit(3)
      .sort({ createdAt: -1 });

    const recentOrders = await customerOrder.find({}).limit(5);

    responseReturn(res, 200, {
      totalOrder,
      totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
      messages,
      totalProduct,
      totalSeller,
      recentOrders,
    });
  } catch (error) {
    console.log("get admin dashboard data error" + error.message);
  }
};
