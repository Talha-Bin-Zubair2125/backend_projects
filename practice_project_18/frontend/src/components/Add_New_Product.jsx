import React, { useState } from "react";
import "../Stylings/ProductsForms.css";
import axios from "axios";

function Add_New_Product() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productExpire, setProductExpire] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [response, setResponse] = useState({ message: "", type: "" });

  const submit_data = async () => {
    let data = {
      productId,
      productName,
      productPrice,
      productStock,
      productExpire,
      productCategory,
    };

    try {
      let data_to_send = await axios.post(
        "http://localhost:3000/product/addproduct",
        data
      );
      console.log(data_to_send);
      setResponse({ message: data_to_send.data, type: "success" });
    } catch (error) {
      setResponse({ message: "Error Submitting Data", type: "error" });
      console.error("Error Submitting Data", error);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Add New Product</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            id="productId"
            type="text"
            value={productId}
            placeholder="Enter Product ID"
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            value={productName}
            placeholder="Enter Product Name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Product Price</label>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            placeholder="Enter Product Price"
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productStock">Stock Available</label>
          <input
            id="productStock"
            type="number"
            value={productStock}
            placeholder="Enter Stock Available"
            onChange={(e) => setProductStock(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productExpire">Expiry Date</label>
          <input
            id="productExpire"
            type="date"
            value={productExpire}
            onChange={(e) => setProductExpire(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategory">Category</label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Protein">Protein</option>
            <option value="Mass Gainer">Mass Gainer</option>
            <option value="Pre Workout">Pre Workout</option>
            <option value="Creatine">Creatine</option>
            <option value="Multi Vitamin">Multi Vitamin</option>
            <option value="Fat Burner">Fat Burner</option>
          </select>
        </div>

        <button className="submit-btn" onClick={submit_data}>
          Add Product
        </button>

        {response.message && (
          <p className={`response ${response.type}`}>{response.message}</p>
        )}
      </div>
    </div>
  );
}

export default Add_New_Product;
