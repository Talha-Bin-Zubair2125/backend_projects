import React from "react";
import Navbar from "../Routes/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Routes/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
