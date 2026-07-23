import "./App.css";
import Login from "../pages/login";
import Register from "../pages/register";
import Getprofile from "../pages/getprofile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* 
      // BrowserRouter → brain, wraps entire app 
      // Routes → container, looks at current URL 
      // Route → defines which component renders at which URL 
    */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Getprofile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
