/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar'
import { CartContext } from '../../contexts/cart';
import Produto from '../../components/produto'
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function checkout() {

    const navigate = useNavigate();
    const { cart, subTotalCart, descontoCart, entregaCart, totalCart, cupomCart, idCupomCart, idEstabelecimentoCart, setCart, setIdCupomCart } = useContext(CartContext);
    const [enderecos, setEnderecos] = useState([])

    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [codCidade, setCodCidade] = useState('')
    const [cep, setCep] = useState('')

    function FinalizarPedido() {
        api.post('http://localhost:8082/v1/pedidos', {
            idEstabelecimento: idEstabelecimentoCart,
            idCupom: idCupomCart ?? 0,
            vlTaxaEntrega: entregaCart,
            vlTotal: totalCart,
            endereco,
            complemento,
            bairro,
            cidade,
            uf,
            cep,
            codCidade: codCidade,
            itens: cart,
        }).then(res => {
            if (res.data) {
                sessionStorage.removeItem('sessionCart')
                setCart([])
                setIdCupomCart(0)
                navigate('/pedidos')
            } else {
                alert('erro ao enviar pedido')
                console.log({
                    idEstabelecimento: idEstabelecimentoCart,
                    idCupom: idCupomCart ?? 0,
                    vlTaxaEntrega: entregaCart,
                    vlTotal: totalCart,
                    endereco,
                    complemento,
                    bairro,
                    cidade,
                    uf,
                    cep,
                    codCidade: codCidade,
                    itens: cart,
                })
                // navigate('/pedidos')
            }
        })
    }

    function SelecionarEndereco(end) {
        setEndereco(end.endereco)
        setComplemento(end.complemento)
        setBairro(end.bairro)
        setCidade(end.cidade)
        setUF(end.uf)
        setCodCidade(end.codCidade)
        setCep(end.cep)
    }

    function ListarEnderecos() {
        if (cart.length == 0) {
            navigate('/')
            return
        }
        api.get(`http://localhost:8082/v1/usuarios/enderecos/`, {
            params: {
                codCidade: localStorage.getItem('sessionCodCidade')
            }
        }).then(res => setEnderecos(res.data)).catch(error => console.log(error))
    }

    useEffect(() => {
        ListarEnderecos()
    }, [])

    useEffect(() => {
        if (cart.length == 0) {
            navigate('/')
            return
        }
    }, [cart])

    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="row col-lg-6 offset-lg-3">
                <div>
                    <h2 className="mt-2">Finalizar Pedido</h2>
                </div>
                <div className="row mt-3">
                    {
                        cart.map(produtos => {
                            return (
                                <div className="" key={produtos.idCarrinho}>
                                    <Produto
                                        url_img={produtos.urlFoto}
                                        nome_produto={produtos.nome}
                                        valor_total={produtos.vlUnit * produtos.qtd}
                                        qtd={produtos.qtd}
                                        valor_unit={produtos.vlUnit}
                                        idCarrinho={produtos.idCarrinho}
                                        detalhes={produtos.detalhes}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row aling-itens-end mt-5">
                    <div className="col-12 d-flex justify-content-between align-itens-center">
                        <span>Subtotal</span>
                        <span>
                            {new Intl.NumberFormat('pr-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(subTotalCart)}
                        </span>
                    </div>
                    <div className="col-12 d-flex justify-content-between align-itens-center mt-2">
                        <div className="input-group justify-content-between">
                            <small> Desconto:
                                {descontoCart > 0 ?
                                    <span className="text-success">{` ${cupomCart}`}</span>
                                    : null}</small>
                            <span>
                                -  {new Intl.NumberFormat('pr-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(descontoCart)}
                            </span>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-between align-itens-center mt-2">
                        <span>Taxa de entrega: </span>
                        <span>
                            {new Intl.NumberFormat('pr-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(entregaCart)}
                        </span>
                    </div>

                    <div className="col-12 d-flex justify-content-between align-itens-center mt-3">
                        <b>Total: </b>
                        <h3>
                            {new Intl.NumberFormat('pr-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(totalCart)}
                        </h3>
                    </div>
                </div>

                <div className="mt-5 mb-3">
                    <h4>Endereço de entrega</h4>
                    <div className="row">
                        <ul className="list-group list-group-flush">
                            {
                                enderecos.map(endereco => {
                                    return <li className="list-group-item p-3" key={endereco.idEndereco}>
                                        <input className="form-check-input ms-2" type="radio"
                                            name="flexRadioDefault"
                                            id={`flexRadioDefault${endereco.idEndereco}`}
                                            onClick={(e) => SelecionarEndereco(endereco)}
                                        />
                                        <label className="ms-2" htmlFor={`flexRadioDefault${endereco.idEndereco}`}>
                                            <b>{endereco.endereco} {endereco.complemento.lenght > 0 ? ` - ${endereco.complemento}` : null}</b>
                                            <small className="display-block">{endereco.cidade} - {endereco.uf}</small>
                                        </label>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="row mb-5">
                        <button onClick={FinalizarPedido} disabled={endereco.length == 0}className="btn btn-lg btn-danger mt-4">Finalizar</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default checkout;