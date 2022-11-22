/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import Lista from '../../components/endereco/lista'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function trocarEnderecos() {

    const [enderecos, setEnderecos] = useState([]);
    const navigate = useNavigate();

    function ListarEnderecos() {
        api.get(`http://localhost:8082/v1/usuarios/enderecos`)
            .then(res => {
                setEnderecos(res.data)
            }).catch(error => {
                console.log(error)
            })
    }

    function TrocarEndereco(endereco) {
        localStorage.setItem('sessionCidade', endereco.cidade)
        localStorage.setItem('sessionUF', endereco.uf)
        localStorage.setItem('sessionCodCidade', endereco.codCidade)
        navigate('/')
    }
     
    useEffect(() => {
        ListarEnderecos()
    }, [])   

    return (
        <div className="container-fluid mt-page">
            <Navbar />


            <div className="row col-lg-6 offset-3">

                <div className="col-12 mt-4 d-flex justify-content-between align-itens-center">
                    <h2>Selecione seu endereco:</h2>
                </div>

                <div className="row mt-5">
                    {
                        enderecos.map(endereco => {
                            return <Lista
                                key={endereco}
                                id_endereco={endereco.idEndereco}
                                endereco={endereco.endereco}
                                complemento={endereco.complemento}
                                bairro={endereco.bairro}
                                cidade={endereco.cidade}
                                codCidade={endereco.codCidade}
                                uf={endereco.uf}
                                cep={endereco.cep}
                                ind_padrao={endereco.indPadrao}
                                onClickTrocarEndereco={TrocarEndereco}
                            />
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default trocarEnderecos;