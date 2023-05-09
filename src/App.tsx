
import {Route, Routes, BrowserRouter} from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Navbar from "./components/static/menu/Navbar";
import Footer from "./components/static/footer/Footer";
import ListaTema from "./components/temas/listatema/ListaTema";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import CadastroPosts from "./components/postagens/cadastroPosts/CadastroPosts";
import DeletarPost from "./components/postagens/deletarPostagem/DeletarPost";
import ListaPostagem from "./components/postagens/listapostagem/ListaPostagem";

import Posts from "./components/postagens/posts/posts";


import { Provider } from 'react-redux';
import store from './store/store';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contato from "./pages/contato/Contato";
import DuvidasFrquentes from "./pages/duvidas/DuvidasFrequentes";


function App() {

  return (
    <Provider store={store}>
    <ToastContainer />
    <BrowserRouter>
    <Navbar />
    <div style={{ minHeight:'100vh' }}>
      <Routes>
        
        <Route path="/" element={<Login />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/home" element={<Home />} />;
        <Route path="/cadastro" element={<Cadastro />} />;
        <Route path="/temas" element={<ListaTema />} />;

        <Route path="/posts" element={<Posts />} />

        <Route path="/formularioTema" element={<CadastroTema />} />;

        <Route path="/formularioTema/:id" element={<CadastroTema />} />;

        <Route path="/deletarTema/:id" element={<DeletarTema />} />
        <Route path ="/formularioPostagem" element={<CadastroPosts />} />;
        <Route path ="/formularioPostagem/:id" element={<CadastroPosts />} />;
        <Route path="/deletarPostagem/:id" element={<DeletarPost />} />;
        <Route path="/contato" element={<Contato />} />
        
        <Route path="/duvidas" element={<DuvidasFrquentes />} />
      </Routes>
      </div>
    <Footer />
    </BrowserRouter>
    </Provider>
  );
}

export default App;

