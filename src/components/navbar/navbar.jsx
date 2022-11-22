/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import Logo from '../../assets/logo.png';
import { Link, useNavigate} from 'react-router-dom'
import './navbar.css';

export default function navbar() {

  const navigate = useNavigate();
  const [busca, setBusca] = useState('');

  function Buscar(e){
    e.preventDefault();
    navigate(`/busca?q=${busca}`)
  }

  function openSidebar() { //Importante! lança um evento para toda a aplicação(ver sidebar)
    const event = new CustomEvent('openSidebar');
    window.dispatchEvent(event);
  }

  function Logout(){
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionEmail');
    localStorage.removeItem('sessionCodCidade');
    localStorage.removeItem('sessionCidade');
    localStorage.removeItem('sessionUF');
    navigate('/login')
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light ps-3 pe-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img className="mt-1" src={Logo} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" >

          <div className="ms-auto me-auto mt-1">
            <div className="input-group">
              <input type="search" onChange={(e) => {setBusca(e.target.value)}} className="form-control" placeholder="Procurar restaurante"
                aria-label="Search"
              />
              <button onClick={Buscar} className="btn btn-danger" type="button" id="button-addon2">
                <i className="fas fa-search"></i> Buscar
              </button>
            </div>
          </div>

          <div className="mt-1">
            <Link to="/trocar-endereco" className="btn btn-outline-danger me-3">
              <i className="fas fa-map-marker-alt me-1"></i>
              Entrega : {localStorage.getItem('sessionCidade')}
            </Link>
            {
              /*
                  <button className="btn btn-outline-danger me-3">
                    <i className="fas fa-sign-in-alt"></i>
                    Acessar
                  </button>
                */
            }
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-outline-danger me-3 dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user"></i>
            </button>
            <ul className="dropdown-menu">
              <li> <Link to="/pedidos" className="dropdown-item"> Pedidos </Link> </li>
              <li> <Link to="/favoritos" className="dropdown-item"> Favoritos </Link> </li>
              <li> <Link to="/perfil" className="dropdown-item"> Perfil</Link>  </li>
              <li> <Link to="/enderecos" className="dropdown-item"> Endereços </Link> </li>
              <li> <hr className="dropdown-divider" /> </li>
              <li> <a href="#"  onClick={Logout} className="dropdown-item">Sair</a> </li>
            </ul>
          </div>

          <button onClick={openSidebar} className="btn btn-outline-danger me-3"> <i className="fas fa-shopping-bag"></i> Sacola</button>

        </div>
      </div>

    </nav>
  )
}
