
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Navbar from "./components/static/menu/Navbar";
function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/home" element={<Home />} />;
        <Route path="/cadastro" element={<Cadastro />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;

