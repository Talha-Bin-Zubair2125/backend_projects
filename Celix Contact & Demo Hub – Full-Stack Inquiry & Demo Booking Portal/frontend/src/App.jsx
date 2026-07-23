import { useState } from "react";
import "./App.css";
import Contact_us_page from "./components/contact_us_page";
import Demo_page from "./components/demo_page";
import About_Company_and_Social_Links from "./components/About_Company_and_Social_Links";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/*
  Notes
  Use Link on Navbar Buttons, Links and Footer Items Not On Wrapping Forms and Wrapping Entire Page
  if we wrap complete page then entire page becomes clickable because input redirects immediately, Forms become unusable, Poor UX 
  it doesn't break routing it breaks user interaction
  
*/
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contact_us_page/>}></Route>
          <Route path="/demo" element={<Demo_page/>}></Route>
          <Route path="/about" element={<About_Company_and_Social_Links/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
