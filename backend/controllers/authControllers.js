const adminMdel = require("../models/adminMdel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const { responseReturn } = require("../utiles/response");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utiles/tokenCreate");
const { response } = require("express");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminMdel.findOne({ email }).select("+password");
      if (admin) {
        const matchP = await bcrypt.compare(password, admin.password);
        if (matchP) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      if (seller) {
        const matchP = await bcrypt.compare(password, seller.password);
        if (matchP) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login Success" });
        } else {
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 404, { error: "Email already exist" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "menualy",
          shopInfo: {},
        });
        await sellerCustomerModel.create({
          myId: seller.id,
        });
        const token = await createToken({ id: seller.id, role: seller.role });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { token, message: "register success" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminMdel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  profile_image_uplaod = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, _, files) => {
      const { image } = files;
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "profile",
        });
        if (result) {
          await sellerModel.findByIdAndUpdate(id, { image: result.url });
          const userInfo = await sellerModel.findById(id);
          responseReturn(res, 201, {
            message: "image upload success",
            userInfo,
          });
        } else {
          responseReturn(res, 404, { error: "image upload failed" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  profile_info_add = async (req, res) => {
    const { divison, district, shopName, sub } = req.body;
    const { id } = req;
    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          divison,
          district,
          shopName,
          sub,
        },
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, {
        message: "profile info add success",
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  seller_update_pass = async (req, res) => {
    const { old_password, new_password, email } = req.body;

    try {
      const seller = await sellerModel.findOne({ email }).select("+password");

      const matchP = await bcrypt.compare(old_password, seller.password);

      if (matchP) {
        await sellerModel.findByIdAndUpdate(seller._id, {
          password: await bcrypt.hash(new_password, 10),
        });
        responseReturn(res, 200, { message: "Password update success" });
      } else {
        responseReturn(res, 404, { error: "Old Password Wrong" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  logout = async (req, res) => {
    try {
      res.cookie("accessToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      responseReturn(res, 200, { message: "logout success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}
module.exports = new authControllers();
