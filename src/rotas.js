import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Favoritos from './pages/favoritos'
import Perfil from './pages/perfil'
import Enderecos from './pages/enderecos'
import Pedidos from './pages/pedidos'
import Cardapio from './pages/cardapio'
import Sidebar from './components/sidebar'
import Busca from './pages/busca'
import Login from './pages/entrar'
import Cadastro from './pages/cadastro'

export default function rotas() {
    return (
        <>
            <Sidebar />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/busca" element={<Busca />} />
                    <Route exact path="/pedidos" element={<Pedidos />} />
                    <Route exact path="/favoritos" element={<Favoritos />} />
                    <Route exact path="/perfil" element={<Perfil />} />
                    <Route exact path="/enderecos" element={<Enderecos />} />
                    <Route exact path="/pedidos" element={<Pedidos />} />
                    <Route exact path="/cardapio" element={<Cardapio />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/cadastro" element={<Cadastro />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
