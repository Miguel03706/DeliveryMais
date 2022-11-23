import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Favoritos from './pages/favoritos'
import Perfil from './pages/perfil'
import Enderecos from './pages/enderecos'
import Pedidos from './pages/pedidos'
import Cardapio from './pages/cardapio'
import Sidebar from './components/sidebar'
import Busca from './pages/busca'
import Login from './pages/entrar'
import Cadastro from './pages/cadastro'
import TrocarEndereco from './pages/trocar-endereco'
import Checkout from './pages/checkout'
import PrivateRoute from './components/Private-route'

export default function rotas() {
    return (
        <>
            <BrowserRouter>
            <Sidebar />
                <Routes>
                    <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route exact path="/busca" element={<PrivateRoute><Busca /></PrivateRoute>} />
                    <Route exact path="/pedidos" element={<PrivateRoute><Pedidos /></PrivateRoute>} />
                    <Route exact path="/favoritos" element={<PrivateRoute><Favoritos /></PrivateRoute>} />
                    <Route exact path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
                    <Route exact path="/enderecos" element={<PrivateRoute><Enderecos /></PrivateRoute>} />
                    <Route exact path="/pedidos" element={<PrivateRoute><Pedidos /></PrivateRoute>} />
                    <Route exact path="/cardapio/:id" element={<PrivateRoute><Cardapio /></PrivateRoute>} />
                    <Route exact path="/trocar-endereco" element={<PrivateRoute><TrocarEndereco /></PrivateRoute>} />
                    <Route exact path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/cadastro" element={<Cadastro />} />

                </Routes>
            </BrowserRouter>
        </>
    )
}
