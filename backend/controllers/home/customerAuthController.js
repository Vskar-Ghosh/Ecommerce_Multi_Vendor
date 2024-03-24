const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utiles/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utiles/tokenCreate");
class customerAtuhController {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 500, { error: "Email already exists" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: "menualy",
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Register success", token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");
      if (customer) {
        const matchP = await bcrypt.compare(password, customer.password);
        if (matchP) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { message: "Login success", token });
        } else {
          responseReturn(res, 404, { error: "Password Wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  update_pass = async (req, res) => {
    const { old_password, new_password, email } = req.body;

    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");

      const matchP = await bcrypt.compare(old_password, customer.password);

      if (matchP) {
        await customerModel.findByIdAndUpdate(customer._id, {
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

  customer_logout = async (req, res) => {
    res.cookie("customerToken", {
      expires: new Date(Date.now()),
    });
    responseReturn(res, 200, { message: "Logout success" });
  };
}
module.exports = new customerAtuhController();
