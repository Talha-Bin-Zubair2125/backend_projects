const express = require("express");
// it creates a new router object that is used to group and define routes seperately from main server file and it returns a router instance
const router = express.Router();
const mongoose = require("mongoose");

// Default Route
router.get("/", (req, res) => {
  res.send("Hey! Welcome to Product Route!");
});

// Connectivity with DB
mongoose
  .connect("mongodb://localhost:27017/products_info")
  .then(() => {
    console.log("MongoDB Connection is Eastablished");
  })
  .catch((error) => {
    console.error("Connection Not Eastablished", error);
  });

// Creating a Schema -- Table Properties Along with data it stores
const product_schema = new mongoose.Schema({
  productId: String,
  productName: String,
  productPrice: Number,
  productStock: Number,
  productExpire: Date,
  productCategory: String,
});

// Creating a Model -- Table Name with the model we make changes in the db / query the db
const product_model = mongoose.model("Product", product_schema);

// POST REQ -- /addproduct
router.post("/addproduct", async (req, res) => {
  try {
    // Creating a Document with data received from frontend
    const data_received = new product_model(req.body);
    // Saving the Document in DB
    await data_received.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Saving Data");
  }
});

// GET REQ -- /getproducts
router.get("/getproducts", async (req, res) => {
  try {
    // Get Data From DB
    const products_in_db = await product_model.find({});
    res.status(201).json(products_in_db);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Data");
  }
});
// GET Req for Product Search -- (/productsearch)
router.get("/productsearch", async (req, res) => {
  const product_query = req.query.product; // query parameter
  console.log("Search Query:", product_query);

  try {
    const product_to_search = await product_model.find({
      $or: [
        { productCategory: product_query }, // exact match for category
        { productName: { $regex: product_query, $options: "i" } }, // partial/case-insensitive match
      ],
    });
    res.status(200).json(product_to_search); // status 200 for success
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

// Exporting the router
module.exports = router;
