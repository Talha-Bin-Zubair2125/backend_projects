import { useState } from "react";
import "./App.css";
import Login from "./pages/user_dashboard/login";
import Register from "./pages/user_dashboard/register";
import Userprofile from "./pages/user_dashboard/userprofile";
import Adminprofile from "./pages/admin_dashboard/adminprofile";
import Totalusers from "./components/totalusers";
import Createtask from "./components/createtask";
import Totaltask from "./components/totaltask";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/admindashboard" element={<Adminprofile />} />
          <Route path="/viewusers" element={<Totalusers />} />
          <Route path="/createtask" element={<Createtask />} />
          <Route path="/viewalltasks" element={<Totaltask />} />    
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
