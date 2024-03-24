const authorModel = require("../../models/authOrder");
const customerOrder = require("../../models/customerOrder");
const productModel = require("../../models/productModel");
const myShopWallet = require("../../models/myShopWallet");
const sellerWallet = require("../../models/sellerWallet");
const cardModel = require("../../models/cardModel");

const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51Oi0LzCa4wilIjAOzg2fcfnfPcHat6lPHpOjg6Ede84yDn2yUOfDHhHMWjnwRTNTQ22cHsZA38jcr57ffF4awoy700KUpZTqK0"
);
const {
  mongo: { ObjectId },
} = require("mongoose");
const { responseReturn } = require("../../utiles/response");

class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrder.findById(id);
      if (order.paymetn_status === "unpaid") {
        await customerOrder.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });
        await authorModel.updateMany(
          { orderId: id },
          { delivery_status: "cancelled" }
        );
      }
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };

  place_order = async (req, res) => {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;

    let authorOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format("LLL");

    let customerOrderProduct = [];

    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;

      for (let j = 0; j < pro.length; j++) {
        let tempCustomerProduct = pro[j].productInfo;
        tempCustomerProduct.quantity = pro[j].quantity;
        customerOrderProduct.push(tempCustomerProduct);

        if (pro[j]._id) {
          cardId.push(pro[j]._id);
        }
      }
    }
    try {
      const order = await customerOrder.create({
        customerId: userId,
        shippingInfo,
        products: customerOrderProduct,
        price: price + shipping_fee,
        delivery_status: "pending",
        paymetn_status: "unpaid",
        date: tempDate,
      });

      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].SellerId;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          let tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }
        authorOrderData.push({
          orderId: order.id,
          sellerId,
          products: storePro,
          price: pri,
          paymetn_status: "unpaid",
          shippingInfo: "Dhaka myshop wearehouse",
          delivery_status: "pending",
          date: tempDate,
        });
      }
      await authorModel.insertMany(authorOrderData);
      for (let k = 0; k < cardId.length; k++) {
        await cardModel.findByIdAndDelete(cardId[k]);
      }
      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 15000);
      responseReturn(res, 201, {
        message: "order placeed success",
        orderId: order.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  get_dashboard_index_data = async (req, res) => {
    const { userId } = req.params;

    try {
      const recentOrders = await customerOrder
        .find({
          customerId: new ObjectId(userId),
        })
        .limit(5);
      const pendingOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "pending",
        })
        .countDocuments();
      const totalOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
        })
        .countDocuments();
      const cancelledOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "cancelled",
        })
        .countDocuments();
      responseReturn(res, 201, {
        recentOrders,
        pendingOrder,
        totalOrder,
        cancelledOrder,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_orders = async (req, res) => {
    const { customerId, status } = req.params;

    try {
      let orders = [];
      if (status !== "all") {
        orders = await customerOrder.find({
          customerId: new ObjectId(customerId),
          delivery_status: status,
        });
      } else {
        orders = await customerOrder.find({
          customerId: new ObjectId(customerId),
        });
      }
      responseReturn(res, 200, { orders });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await customerOrder.findById(orderId);

      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_admin_orders = async (req, res) => {
    let { page, parPage, searchValue } = req.query;

    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await customerOrder
          .aggregate([
            {
              $lookup: {
                from: "authorders",
                localField: "_id",
                foreignField: "orderId",
                as: "subOrder",
              },
            },
          ])
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder = await customerOrder.aggregate([
          {
            $lookup: {
              from: "authorders",
              localField: "_id",
              foreignField: "orderId",
              as: "subOrder",
            },
          },
        ]);

        responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  get_admin_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await customerOrder.aggregate([
        {
          $match: { _id: new ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "authorders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log("get admin order" + error.message);
    }
  };

  admin_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, { message: "order status change success" });
    } catch (error) {
      console.log("get admin order status error" + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  get_seller_orders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        const orders = await authorModel
          .find({ sellerId })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder = await authorModel
          .find({ sellerId })
          .countDocuments();

        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log("get seller order error" + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  get_seller_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await authorModel.findById(orderId);
      responseReturn(res, 200, { order });
    } catch (error) {
      console.log("get seller order" + error.message);
    }
  };

  seller_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await authorModel.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });
      responseReturn(res, 200, { message: "order status change success" });
    } catch (error) {
      console.log("get admin order status error" + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  create_payment = async (req, res) => {
    const { price } = req.body;

    try {
      const payment = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      responseReturn(res, 200, { clientSecret: payment.client_secret });
    } catch (error) {
      console.log(error.message);
    }
  };

  order_confirm = async (req, res) => {
    const { orderId } = req.params;
    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        paymetn_status: "paid",
        delivery_status: "pending",
      });

      await authorModel.updateMany(
        { orderId: new ObjectId(orderId) },
        { paymetn_status: "paid", delivery_status: "pending" }
      );

      const cuOrder = await customerOrder.findById(orderId);
      const { products } = await customerOrder.findById(orderId);

      products.map(async (p) => {
        let { stock } = await productModel.findById(p._id);
        await productModel.findByIdAndUpdate(p._id, {
          stock: stock - p.quantity,
        });
      });

      const auOrder = await authorModel.find({
        orderId: new ObjectId(orderId),
      });

      const time = moment(Date.now()).format("l");

      const splitTime = time.split("/");

      await myShopWallet.create({
        amount: cuOrder.price,
        month: splitTime[0],
        year: splitTime[2],
      });

      for (let i = 0; i < auOrder.length; i++) {
        await sellerWallet.create({
          sellerId: auOrder[i].sellerId.toString(),
          amount: auOrder[i].price,
          month: splitTime[0],
          year: splitTime[2],
        });
      }

      responseReturn(res, 200, { message: "success" });
    } catch (error) {
      console.log(error.message);
    }
  };
}
module.exports = new orderController();
