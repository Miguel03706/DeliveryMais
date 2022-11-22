/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'
import api from '../../services/api'
export default function perfil() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [erro, setError] = useState('')



    function ExibeMensagem() {
        setMsg('Dados alterados com sucesso')
        setTimeout(() => setMsg(''), 3000)
    }

    
    function ExibeErro(str) {
        setError(str)
        setTimeout(() => setError(''), 5000)
    }

    function SalvarDados() {
        api.patch('http://localhost:8082/v1/usuarios', {
            nome,
            email
        })
            .then(res => {
                ExibeMensagem()
            }).catch(error => {
                if (error.response) {
                    ExibeErro(error.response.data.erro)
                } else { 
                    ExibeErro('Ocorreu um erro')
                }
            })
    }

    useEffect(() => {
        api.get(`http://localhost:8082/v1/usuarios/${localStorage.getItem('sessionId')}`)
            .then(res => {
                setNome(res.data[0].nome)
                setEmail(res.data[0].email)

            }).catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div className="fluid mt-page p-2">
            <Navbar />

            <div className="row col-lg-6 offset-lg-3">
                <div className="row p-auto">
                    <h3>Meu Perfil</h3>
                </div>
                <div className="col-lg-12">

                    <div className="row m2">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="InputNome">Nome: </label>
                                <input type="text" onChange={(e) => setNome(e.target.value)} value={nome} className="form-control" id="inputNome" aria-describedby="nome" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputEmail">Email: </label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="inputEmail" aria-describedby="nome" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-lg btn-danger" onClick={SalvarDados}>Salvar Dados</button>
                            </div>

                            {
                                msg.length > 0 ?
                                    <div className="alert alert-success mt-4 text-center">{msg}</div>
                                    : null
                            }
                             {
                                erro.length > 0 ?
                                    <div className="alert alert-danger mt-4 text-center">{erro}</div>
                                    : null
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
