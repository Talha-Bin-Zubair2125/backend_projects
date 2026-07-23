import React, { useState } from "react";
import "../Stylings/ProductsForms.css";
import axios from "axios";

function Search_Product() {
  const [productToSearch, setProductToSearch] = useState("");
  const [productsFound, setProductsFound] = useState([]);
  const [response, setResponse] = useState({ message: "", type: "" });

  // Function For Finding a Product
  const searchProduct = async () => {
    console.log("Searching for:", productToSearch);

    try {
      const res = await axios.get(
        "http://localhost:3000/product/productsearch",
        {
          params: { product: productToSearch },
        }
      );
      console.log(res.data);

      if (res.data.length === 0) {
        setResponse({ message: "No Products Found", type: "error" });
        setProductsFound([]);
      } else {
        setResponse({
          message: "Products Found Successfully",
          type: "success",
        });
        setProductsFound(res.data);
      }
    } catch (error) {
      console.error(error);
      setResponse({ message: "Error Searching Product", type: "error" });
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Search Products</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          value={productToSearch}
          onChange={(e) => setProductToSearch(e.target.value)}
          placeholder="Search by Product Name or Category"
        />
        <button className="submit-btn" onClick={searchProduct}>
          Search
        </button>
      </div>

      {/* Response Message */}
      {response.message && (
        <p className={`response ${response.type}`}>{response.message}</p>
      )}

      {/* Display Products if Found */}
      {productsFound.length > 0 && (
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
              {productsFound.map((product, index) => (
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

export default Search_Product;
