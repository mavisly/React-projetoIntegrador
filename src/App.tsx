
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Navbar from "./components/static/menu/Navbar";
import Footer from "./components/static/footer/Footer";
import ListaTema from "./components/temas/listatema/ListaTema";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/home" element={<Home />} />;
        <Route path="/cadastro" element={<Cadastro />} />;

        <Route path="/login" element={<Login />} />;
        
        <Route path="/temas" element={<ListaTema />} />;
        <Route path="/formularioTema" element={<CadastroTema />} />;
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;

