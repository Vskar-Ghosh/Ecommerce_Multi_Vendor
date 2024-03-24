const formidable = require("formidable");
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utiles/response");
const cloudinary = require("cloudinary").v2;
class productController {
  add_product = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        brand,
        discount,
        shopName,
      } = field;
      const { images } = files;

      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });

          allImageUrl = [...allImageUrl, result.url];
        }

        await productModel.create({
          SellerId: id,
          name,
          slug,
          shopName,
          brand: brand.trim(),
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
        });
        responseReturn(res, 201, { message: "product add success" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            SellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProducts = await productModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { totalProducts, products });
      } else {
        const products = await productModel
          .find({ SellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProducts = await productModel
          .find({ SellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProducts, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  product_get = async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  product_update = async (req, res) => {
    let { name, description, discount, price, stock, brand, productId } =
      req.body;

    name = name.trim();
    const slug = name.split(" ").join("-");

    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        stock,
        brand,
        slug,
        productId,
      });

      const product = await productModel.findById(productId);

      responseReturn(res, 200, { product, message: "product update success" });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { productId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 400, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });

          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });
          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;

            await productModel.findByIdAndUpdate(productId, { images });
            const product = await productModel.findById(productId);

            responseReturn(res, 200, {
              product,
              message: "product image update success",
            });
          } else {
            responseReturn(res, 404, { error: "image upload failed" });
          }
        } catch (error) {
          responseReturn(res, 400, { error: error.message });
        }
      }
    });
  };

  product_delete = async (req, res) => {
    const { productId } = req.params;
    try {
      await productModel.findByIdAndDelete(productId);
      responseReturn(res, 200, { message: "product delete success" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new productController();
