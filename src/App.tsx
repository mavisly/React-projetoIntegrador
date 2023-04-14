
import { useState } from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/home" element={<Home />} />;
        <Route path="/cadastro" element={<Cadastro />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;

