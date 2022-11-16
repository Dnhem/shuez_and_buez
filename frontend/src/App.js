import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shuez from "./pages/Shuez";
import Buez from "./pages/Buez";
import Layout from "./components/Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shuez" element={<Shuez />} />
          <Route path="/buez" element={<Buez />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
