/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import Lista from '../../components/endereco/lista'
import Navbar from '../../components/navbar'
import api from '../../services/api'
import EnderecoModal from '../../components/endereco/modal'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

function enderecos() {

    const [enderecos, setEnderecos] = useState([]);
    const [isEnderecoOpen, setIsEnderecoOpen] = useState(false)
    const [dadosEndereco, setDadosEnderecos] = useState([])

    function ListarEnderecos() {
        api.get(`/v1/usuarios/enderecos`)
            .then(res => {
                setEnderecos(res.data)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        ListarEnderecos()
    }, [])

    function openModalEndereco(id) {
        if (id > 0) {
            api.get(`/v1/usuarios/enderecos/${id}`)
                .then(res => {
                    setDadosEnderecos(res.data[0])
                }).catch(error => {
                    console.log(error)
                })
        } else {
            setDadosEnderecos([])
            setIsEnderecoOpen(true)
        }
        setIsEnderecoOpen(true)
    }

    function closeModalEndereco() {
        setIsEnderecoOpen(false)
        ListarEnderecos()
    }

    function ExcluirEndereco(id) {

        confirmAlert({
            title: 'Excluir',
            message: 'você tem certeza que quer excluir esse endereço?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        api.delete(`/v1/usuarios/enderecos/${id}`)
                            .then(res => ListarEnderecos())
                            .catch(error => console.log(error))
                    }
                },
                {
                    label: 'Não',
                    onClick: () => { }
                }
            ]
        })
    }

    function EnderecoPadrao(id){
        api.patch(`/v1/usuarios/enderecos/padrao/${id}`)
        .then(res => ListarEnderecos())
        .catch(error => console.log(error))

    }

    return (
        <div className="container-fluid mt-page">
            <Navbar />
            <EnderecoModal
                isOpen={isEnderecoOpen}
                onRequestClose={closeModalEndereco}
                dados_endereco={dadosEndereco}
            />

            <div className="row col-lg-6 offset-3">

                <div className="col-12 mt-4 d-flex justify-content-between align-itens-center">
                    <h2>Meus enderços:</h2>
                    <button onClick={(e) => openModalEndereco(0)} className="btn btn-sm btn-outline-danger">Adicionar Endereço</button>
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
                                uf={endereco.uf}
                                cep={endereco.cep}
                                ind_padrao={endereco.indPadrao}
                                onClickEditEndereco={openModalEndereco}
                                onClickDeleteEndereco={ExcluirEndereco}
                                onClickEnderecoPadrao={EnderecoPadrao}
                            />
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default enderecos;