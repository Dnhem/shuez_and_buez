import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shuez from "./pages/Shuez";
import Buez from "./pages/Buez";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/shuez" element={<Shuez />} />
          <Route path="/shuez/:id" element={<SingleProduct />} />
          <Route path="/buez" element={<Buez />} />
          <Route path="/buez/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<Cart />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
