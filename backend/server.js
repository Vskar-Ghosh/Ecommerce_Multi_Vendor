const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utiles/db");
require("dotenv").config();
const socket = require("socket.io");
const port = process.env.PORT;

const server = http.createServer(app);

app.use(
  cors({
    origin:
      process.env.mode === "pro"
        ? [
            process.env.client_customer_production_url,
            process.env.client_admin_production_url,
          ]
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
const io = socket(server, {
  cors: {
    origin:
      process.env.mode === "pro"
        ? [
            process.env.client_customer_production_url,
            process.env.client_admin_production_url,
          ]
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  },
});
var allCustomer = [];
var allSeller = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((u) => u.customerId === customerId);

  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

const addseller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((u) => u.sellerId === sellerId);

  if (!checkSeller) {
    allSeller.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

const findCustomr = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((c) => c.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((c) => c.socketId !== socketId);
};

let admin = {};

const removeAdmin = (socketId) => {
  if (admin.socketId === socketId) {
    admin = {};
  }
};

io.on("connection", (soc) => {
  console.log("socket server is connected");

  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeSeller", allSeller);
  });
  soc.on("add_seller", (sellerId, userInfo) => {
    addseller(sellerId, soc.id, userInfo);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeAdmin", { status: true });
  });
  soc.on("add_admin", (adminInfo) => {
    delete adminInfo.email;
    admin = adminInfo;
    admin.socketId = soc.id;
    io.emit("activeSeller", allSeller);
    io.emit("activeAdmin", { status: true });
  });
  soc.on("send_seller_message", (msg) => {
    const customer = findCustomr(msg.reciverId);
    if (customer !== undefined) {
      soc.to(customer.socketId).emit("seller_message", msg);
    }
  });
  soc.on("send_customer_message", (msg) => {
    const seller = findSeller(msg.reciverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("customer_message", msg);
    }
  });

  soc.on("send_message_admin_to_seller", (msg) => {
    const seller = findSeller(msg.reciverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("recive_admin_message", msg);
    }
  });

  soc.on("send_message_seller_to_admin", (msg) => {
    if (admin.socketId) {
      soc.to(admin.socketId).emit("recive_seller_message", msg);
    }
  });

  soc.on("disconnect", () => {
    console.log("user disconnect");
    remove(soc.id);
    removeAdmin(soc.id);
    io.emit("activeAdmin", { status: false });
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
});
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/", require("./routes/chatRoutes"));
app.use("/api/", require("./routes/dashboard/dashboardIndexRoutes"));
app.use("/api/", require("./routes/paymentRoutes"));
app.use("/api/", require("./routes/bannerRoutes"));
app.use("/api/home", require("./routes/home/homeRoutes"));
app.use("/api", require("./routes/order/orderRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));
app.get("/", (req, res) => res.send("hello"));
dbConnect();
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
