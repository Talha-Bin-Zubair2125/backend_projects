import { useState } from "react";
import axios from "axios";
import "../src/App.css";

function App() {
  // States
  let [productid, setproductid] = useState("");
  let [productname, setproductname] = useState("");
  let [productprice, setproductprice] = useState(0);
  let [productexpiredate, setproductexpiredate] = useState("");
  let [productstockavailable, setproductstockavailable] = useState(0);
  // Category of Products
  let [productcategory, setproductcategory] = useState("");
  // Search Product
  let [producttosearch, setproducttosearch] = useState("");
  // Response
  let [Response, setResponse] = useState({ message: "", type: "" });
  // Storing Data Received From Backend in Array
  let [data_received, setdata] = useState([]);
  // Searched Products via Category
  let [prducts_via_category, setpd] = useState([]);

  // Function For Product Addition
  let product_addition = async () => {
    let products = {
      productid: productid,
      productname: productname,
      productprice: productprice,
      productexpiredate: productexpiredate,
      productstockavailable: productstockavailable,
      productcategory: productcategory,
    };
    console.log(products);

    try {
      // Defining POST Method
      let data_to_backend = await axios.post(
        "http://localhost:3000/product/addproduct",
        products
      );
      console.log(data_to_backend);
      setResponse({ message: data_to_backend.data, type: "success" });
    } catch (error) {
      setResponse({ message: "Error Submitting Data", type: "error" });
      console.error("Error Submitting Data", error);
    }
  };

  // Function For Fetching Products
  let product_getting = async () => {
    try {
      // Defining GET Method
      let data_from_backend = await axios.get(
        "http://localhost:3000/product/getproduct"
      );
      console.log(data_from_backend);
      setdata(data_from_backend.data);
      setResponse({ message: "Data Fetched Successfully", type: "success" });
    } catch (error) {
      console.error(error);
      setResponse({ message: "Failed to Fetch", type: "error" });
    }
  };

  // Function For Finding a Product
  let searchproduct = async () => {
    console.log(producttosearch);

    try {
      // we can send data via params which is a query parameter like this but we can't send data via req body
      let pd_data_to_src_to_backend = await axios.get(
        "http://localhost:3000/product/productsearch",
        {
          params: {
            product: producttosearch,
          },
        }
      );
      // For Debugging
      console.log(pd_data_to_src_to_backend.data);
      setResponse({ message: "Products Found Successfully", type: "success" });
      setpd(pd_data_to_src_to_backend.data);
      console.log(prducts_via_category);
    } catch (error) {
      console.error(error);
      setResponse({ message: "Product Not Found", type: "error" });
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="main-title">Product Inventory API</h2> {/* New title */}
        <h1 className="title">Add New Product</h1>
        {/* Product Form */}
        <div className="form-container">
          <div className="form-group">
            {/* Product ID */}
            <input
              type="text"
              value={productid}
              placeholder="Enter Product ID"
              onChange={(e) => setproductid(e.target.value)}
            />
            {/* Product Name */}
            <input
              type="text"
              value={productname}
              placeholder="Enter Product Name"
              onChange={(e) => setproductname(e.target.value)}
            />
          </div>

          <div className="form-group">
            {/* Product Price */}
            <label>
              Enter Price Of The Product
              <input
                type="number"
                value={productprice}
                onChange={(e) => setproductprice(Number(e.target.value))}
              />
            </label>
            {/* Stock Available */}
            <label>
              Enter the Stock Available
              <input
                type="number"
                value={productstockavailable}
                onChange={(e) =>
                  setproductstockavailable(Number(e.target.value))
                }
              />
            </label>
          </div>

          <div className="form-group">
            {/* Product Expire Date */}
            <label>
              Enter Product Expiry Date
              <input
                type="date"
                value={productexpiredate}
                onChange={(e) => setproductexpiredate(e.target.value)}
              />
            </label>
            {/* Category of Products */}
            <select
              value={productcategory}
              onChange={(e) => setproductcategory(e.target.value)}
            >
              <option value="Select Category">Select Category</option>
              <option value="Protein">Protein</option>
              <option value="Mass Gainer">Mass Gainer</option>
              <option value="Pre Workout">Pre Workout</option>
              <option value="Creatine">Creatine</option>
              <option value="Multi Vitamin">Multi Vitamin</option>
              <option value="Fat Burner">Fat Burner</option>
            </select>
          </div>

          <button className="submit-btn" onClick={product_addition}>
            Add Product
          </button>
          <button className="fetch-btn" onClick={product_getting}>
            Get Product
          </button>

          {/* Response */}
          {Response.message && (
            <p
              className="response"
              style={{
                color: Response.type === "success" ? "green" : "red",
                border: `1px solid ${
                  Response.type === "success" ? "green" : "red"
                }`,
                background: Response.type === "success" ? "#e8f5e9" : "#ffebee",
                padding: "8px 12px",
                borderRadius: "8px",
              }}
            >
              {Response.message}
            </p>
          )}
        </div>
        {/* Search By Category */}
        <div className="search-container">
          <input
            type="text"
            value={producttosearch}
            onChange={(e) => setproducttosearch(e.target.value)}
            placeholder="Search by Product Name or Category"
          />
          <button onClick={searchproduct}>Search</button>
        </div>
        {/* Display Products */}
        {data_received.length > 0 && (
          <div className="table-container">
            <h2>Product List</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Expiry</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data_received.map((product, index) => (
                  <tr key={index}>
                    <td>{product.productid}</td>
                    <td>{product.productname}</td>
                    <td>${product.productprice.toFixed(2)}</td>
                    <td>
                      <span
                        style={{
                          color:
                            product.productstockavailable > 0
                              ? "#2e7d32"
                              : "#d32f2f",
                          fontWeight: "bold",
                        }}
                      >
                        {product.productstockavailable}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          color:
                            new Date(product.productexpiredate) < new Date()
                              ? "#d32f2f"
                              : "#2e7d32",
                          fontWeight: "bold",
                        }}
                      >
                        {new Date(
                          product.productexpiredate
                        ).toLocaleDateString()}
                      </span>
                    </td>
                    <td>{product.productcategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Search Response */}
        {prducts_via_category.length > 0 && (
          <div className="search-results-container">
            <h3>Search Results</h3>
            <div className="search-cards">
              {prducts_via_category.map((product, index) => (
                <div className="search-card" key={index}>
                  <h4>{product.productname}</h4>
                  <p>
                    <strong>ID:</strong> {product.productid}
                  </p>
                  <p>
                    <strong>Price:</strong> ${product.productprice.toFixed(2)}
                  </p>
                  <p>
                    <strong>Stock:</strong>{" "}
                    <span
                      className={
                        product.productstockavailable > 0
                          ? "in-stock"
                          : "out-stock"
                      }
                    >
                      {product.productstockavailable}
                    </span>
                  </p>
                  <p>
                    <strong>Expiry:</strong>{" "}
                    <span
                      className={
                        new Date(product.productexpiredate) < new Date()
                          ? "expired"
                          : "valid"
                      }
                    >
                      {new Date(product.productexpiredate).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <strong>Category:</strong> {product.productcategory}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
