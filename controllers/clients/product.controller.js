const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/products");
const ProductCategoryHelper = require("../../helpers/product-category.js");
//[get]/products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: "false",
  }).sort({ position: "desc" });

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",

    products: newProducts,
  });
};
//[get]/products/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active",
    };

    const product = await Product.findOne(find);
    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        status: "active",
        deleted: false,
      });
      product.category = category;
    }
    product.priceNew = productsHelper.priceNewProduct(product);
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
//[get]/products/:slugCategory
module.exports.Category = async (req, res) => {
  try {
    const Category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: "false",
    });

    const listSubCategory = await ProductCategoryHelper.getSubCategory(
      Category.id
    );
    const listSubCategoryId = listSubCategory.map((item) => item.id);

    const products = await Product.find({
      product_category_id: { $in: [Category.id, ...listSubCategoryId] },
      deleted: "false",
    }).sort({ position: "desc" });

    const newProducts = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index", {
      pageTitle: Category.title,

      products: newProducts,
    });
  } catch (error) {
    res.redirect("/");
  }
};
