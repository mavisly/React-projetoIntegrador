import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./paginas/login/Login";
import Teste from "./paginas/teste/teste";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/home" element={<Teste />} />;
        <Route path="/cadastro" element={<Teste />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
