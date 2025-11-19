const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/*
    Error Encountered : 
    const app = express() should be in main server file not in router file
*/

// Connecting with MongoDB
mongoose
  .connect("mongodb://localhost:27017/products_data")
  .then(() => console.log(`MongoDB Connection is Eastablished`))
  .catch((err) => console.log(`Error Connecting With MongoDB`, err));

// Creating Schema -- All Products
const products_schema = new mongoose.Schema({
  productid: String,
  productname: String,
  productprice: Number,
  productexpiredate: Date,
  productstockavailable: Number,
  productcategory: String,
});

// Creating a Model
const products = mongoose.model("Product", products_schema);

// Default Route
router.get("/", (req, res) => {
  res.send("Hey There!");
});

// POST REQ -- (/addproduct)
router.post("/addproduct", async (req, res) => {
  try {
    // Data Received Via FrontEnd
    const data_of_products_received_via_frontend = new products(req.body);
    console.log(data_of_products_received_via_frontend.productexpiredate);

    // Saving Products
    await data_of_products_received_via_frontend.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Saving Data");
  }
});

// GET REQ -- (/getproduct)
router.get("/getproduct", async (req, res) => {
  try {
    // Get Data From DB
    const products_in_db = await products.find({});
    res.status(201).json(products_in_db);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Data");
  }
});

// GET Req for Product Search -- (/productsearch)
router.get("/productsearch", async (req, res) => {
  const product_category = req.query.product;
  // Debugging
  console.log("Category:", product_category);
  try {
    const product_to_search = await products.find({
      $or: [
        { productcategory: product_category },
        // product name is the field in collection and regex is a mongodb operator to match a pattern (like contains and starts with) and options: "i" means case in-sensitive
        { productname: { $regex: product_category, $options: "i" } },
      ],
    });
    res.status(201).json(product_to_search);
  } catch (error) {
    console.error(error);
    res.status(500).send("Product Category Not Found");
  }
});

// export the router
module.exports = router;
