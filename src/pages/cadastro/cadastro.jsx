/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo-pb.png'
import Fundo from '../../assets/fundo-login.jpg'
import SaltPassword from '../../services/md5'
import api from '../../services/api'
import './styles.css'

export default function cadastro() {

    const navigate = useNavigate();
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [senha2, setSenha2] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [codCidade, setCodCidade] = useState('')
    const [cep, setCep] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [cidades, setCidades] = useState([]);
    const [loading, setLoading] = useState(false)


    function SalvarCidade(e) {
        e.preventDefault();

        const [cid, est] = e.target[e.target.selectedIndex].text.split(' - ')
        setCidade(cid)
        setUF(est)
        setCodCidade(e.target.value)
    }

    function ProcessaCadastro(e) {
        e.preventDefault();
        setMensagem('');

        if (senha !== senha2) {
            setMensagem('As senhas não conferem. Digite novamente.')
            return
        }

        setLoading(true)

        api.post('http://localhost:8082/v1/usuarios/registro', {
            nome,
            email,
            senha: senha.length > 0 ? SaltPassword(senha) : '',
            endereco,
            complemento,
            bairro,
            cidade,
            uf,
            cep,
            cod_cidade: codCidade
        }).then(res => {
            if (res.status === 201) {
                localStorage.setItem('sessionToken', res.data.token)
                localStorage.setItem('sessionId', res.id_usuario)
                localStorage.setItem('sessionEmail', email)
                localStorage.setItem('sessionCodCidade', codCidade)
                localStorage.setItem('sessionCidade', cidade)
                localStorage.setItem('sessionUF', uf)
                navigate('/')
            } else {
                setLoading(false);
                setMensagem('Ocorreu um erro no cadastro' + res.status)
            }
        }).catch(error => {
            if (error.response) {
                setLoading(false)
                setMensagem(error.response.data.erro)
            } else {
                setMensagem('Ocorreu um erro na requisição.')
            }
        })

    }

    useEffect(() => {
        api.get('http://localhost:8082/v1/cidades').then(res => {
            setCidades(res.data)
        }).catch(error => {
            console.log(error);
        })
    }, []);
    return (
        <div className="row">

            <div className="col-sm-6 d-flex justify-content-center align-itens-center text-center">
                <form className="form-cadastro mt-4">
                    <h3 className="mb-4">Crie sua conta e faça seu pedido</h3>
                    <h6 className="mb-3">Informe os dados abaixo</h6>

                    <div className="form-floating">
                        <input
                            type="text"
                            onChange={(e) => setNome(e.target.value)}
                            className="form-control"
                            id="floatingInput1"
                            placeholder="Digite seu nome completo"
                        />
                        <label htmlFor="floatingInput1">Nome completo</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="floatingInput2"
                            placeholder="Digite seu Email"
                        />
                        <label htmlFor="floatingInput2">Email</label>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="form-control"
                                    id="floatingPassword"
                                    placeholder="Digite sua Senha"
                                />
                                <label htmlFor="floatingPassword">Senha</label>
                            </div>
                        </div>
                        <div className="col-lg-6">

                            <div className="form-floating">
                                <input
                                    type="password"
                                    onChange={(e) => setSenha2(e.target.value)}
                                    className="form-control"
                                    id="floatingPassword2"
                                    placeholder="Confrme sua senha" />
                                <label htmlFor="floatingPassword2">Confirmar senha</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    onChange={(e) => setEndereco(e.target.value)}
                                    className="form-control"
                                    id="floatingInput3"
                                    placeholder="Digite seu endereço"
                                />
                                <label htmlFor="floatingInput3">Endereço</label>
                            </div>
                        </div>
                        <div className="col-lg-4">

                            <div className="form-floating">
                                <input
                                    type="text"
                                    onChange={(e) => setComplemento(e.target.value)}
                                    className="form-control"
                                    id="floatingInput4"
                                    placeholder="Complemento"
                                />
                                <label htmlFor="floatingInput4">Complemento</label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    onChange={(e) => setBairro(e.target.value)}
                                    className="form-control"
                                    id="floatingInput5"
                                    placeholder="Digite seu endereço"
                                />
                                <label htmlFor="floatingInput5">Bairro</label>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-control">
                                <select className="form-select" onChange={SalvarCidade} name="cidades" id="cidades">
                                    <option value="000">Cidade</option>
                                    {
                                        cidades.map(c => {
                                            return <option key={c.codCidade} value={c.codCidade}>{c.cidade} - {c.uf}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating">
                        <input
                            type="number"
                            onChange={(e) => setCep(e.target.value)}
                            className="form-control mb-2"
                            id="floatingInput"
                            placeholder="Digite seu CEP"
                        />
                        <label htmlFor="floatingPassword">CEP</label>
                    </div>

                    <button
                        className="btn btn-lg btn-danger w-100"
                        disabled={loading}
                        onClick={ProcessaCadastro}
                    >
                        {loading ?
                            <div>
                                <span className="spinner-border spinner-border-sm text-light" role="status"></span>
                                <span className="ms-2">Enviando...</span>
                            </div> : <span className="ms-2">Criar conta</span>}
                    </button>

                    {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert"> {mensagem} </div> : null}


                    <div className="mt-3">
                        <Link to="/login"> Já tenho uma conta. Acessar Agora!</Link>
                    </div>

                    <img className="mt-4" src={Logo} alt="Logo Delivery Mais" />
                </form>
            </div>
            {
                // d-none // d-sm-none ... serve para esconder elementos dependendo do tamanho da tela
            }
            <div className="col-sm-6 px-0 d-none d-sm-block">
                <img className="background-cadastro" src={Fundo} alt="Delivery Mais" />
            </div>
        </div>
    )
}
