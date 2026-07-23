import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import Add from "./Routes/Add";
import Subtract from "./Routes/Subtract";
import Multiply from "./Routes/Multiply";
import Divide from "./Routes/Divide";
import Home from "./Routes/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route  path="/Add" element={<Add />}>
              Addition
            </Route>
            <Route path="/Sub" element={<Subtract />}>
              Subtraction
            </Route>
            <Route path="/Mul" element={<Multiply />}>
              Multiply
            </Route>
            <Route path="/Divide" element={<Divide />}>
              Divide
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
