import { useState } from "react";
// Importing the Files
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Search_Product from "./components/Search_Product";
import Browse_Products from "./components/Browse_Products";
import Add_New_Product from "./components/Add_New_Product";
// Importing the Layout
import Page_Layout from "./Layout/Page_Layout";
// Importing the React Router DOM Lib
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page_Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/search_product" element={<Search_Product />}></Route>
            <Route path="/browse_product" element={<Browse_Products />}></Route>
            <Route path="/add_product" element={<Add_New_Product />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
