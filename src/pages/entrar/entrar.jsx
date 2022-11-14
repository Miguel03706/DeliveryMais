/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo-pb.png'
import Fundo from '../../assets/fundo-login.jpg'
import SaltPassword from '../../services/md5'
import api from '../../services/api'
import './styles.css'


export default function entrar() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [loading, setLoading] = useState(false);


    function ProcessaLogin(e) {
        e.preventDefault();
        setSucesso('');
        setLoading(true)
        api.post('http://localhost:8082/v1/usuarios/login', {
            email: email,
            senha: SaltPassword(senha)
        }).then(res => {
            localStorage.setItem('sessionToken', res.data.token);
            localStorage.setItem('sessionId', res.data.idUsuario);
            localStorage.setItem('sessionEmail', res.data.email);
            localStorage.setItem('sessionCodCidade', res.data.codCidade);
            localStorage.setItem('sessionCidade', res.data.cidade);
            localStorage.setItem('sessionUF', res.data.uf);

            setSucesso('S');
            navigate('/')

        }).catch(error => {
            setSucesso('N');
            setLoading(false)
        })
    }

    return (
        <div className="row">

            <div className="col-sm-6 d-flex justify-content-center align-itens-center text-center">
                <form className="form-login mt-5">
                    <h3 className="mb-4">Peça seu delivery agora mesmo</h3>
                    <h6 className="mb-3">Acesse sua conta</h6>

                    <div className="form-floating">
                        <input
                            type="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="form-control" id="floatingInput"
                            placeholder="Digite seu Email"
                        />
                        <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            onChange={(e) => { setSenha(e.target.value) }}
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Digite sua Senha"
                        />
                        <label for="floatingPassword">Senha</label>
                    </div>

                    <button className="btn btn-lg btn-danger w-100 mb-2" onClick={ProcessaLogin} disabled={loading}>
                        {loading ?
                            <div>
                                <span className="spinner-border spinner-border-sm text-light" role="status"></span>
                                <span className="ms-2">Enviando...</span>
                            </div> : <span className="ms-2">Acessar</span>}
                    </button>

                    {sucesso === 'N' ? <div className="alert alert-danger" role="alert"> Email ou senha incorretos</div> : null}

                    <div className="mt-5">
                        <Link to="/cadastro"> Não tenho uma conta. Criar Agora!</Link>
                    </div>

                    <img className="mt-5" src={Logo} alt="Logo Delivery Mais" />
                </form>
            </div>
            {
                // d-none // d-sm-none ... serve para esconder elementos dependendo do tamanho da tela
            }
            <div className="col-sm-6 px-0 d-none d-sm-block">
                <img className="background-login" src={Fundo} alt="Delivery Mais" />
            </div>
        </div>
    )
}
