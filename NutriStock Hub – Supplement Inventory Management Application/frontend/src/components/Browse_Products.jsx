import React, { useState } from "react";
import "../Stylings/ProductsForms.css";
import axios from "axios";

function Browse_Products() {
  // Storing Data Received From Backend in Array
  const [data_received, setData] = useState([]);
  const [response, setResponse] = useState({ message: "", type: "" });

  // Function For Fetching Products
  const product_getting = async () => {
    try {
      const data_from_backend = await axios.get(
        "http://localhost:3000/product/getproducts"
      );
      console.log(data_from_backend);
      setData(data_from_backend.data);
      setResponse({ message: "Data Fetched Successfully", type: "success" });
    } catch (error) {
      console.error(error);
      setResponse({ message: "Failed to Fetch", type: "error" });
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Browse Products</h2>

      <div className="browse-actions">
        <button className="submit-btn" onClick={product_getting}>
          Get All Products
        </button>
      </div>

      {/* Response Message */}
      {response.message && (
        <p className={`response ${response.type}`}>{response.message}</p>
      )}

      {/* Display Data if Available */}
      {data_received.length > 0 && (
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Expire</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data_received.map((product, index) => (
                <tr key={index}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productStock}</td>
                  <td>
                    {new Date(product.productExpire).toLocaleDateString()}
                  </td>
                  <td>{product.productCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Browse_Products;
