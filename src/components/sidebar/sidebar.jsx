/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from 'react';
import { Dock } from 'react-dock'
import Produto from '../produto'
import { CartContext } from '../../contexts/cart';
import Sacola from '../../assets/bag.png'
import './styles.css'
import { useNavigate } from 'react-router-dom';

function sidebar() {

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const { cart, subTotalCart, descontoCart, entregaCart, totalCart, RemoveItemCard,
        ValidarCupom, msgCart, cupomCart, setCupomCart } = useContext(CartContext);

    function FinalizarPedido() {
        setShow(false)
        navigate('/checkout')
    }

    useEffect(() => {
        window.addEventListener('openSidebar', () => {
            setShow(true)
        });
    }, []);

    return (
        <Dock position="right"
            isVisible={show}
            fluid={false}
            size={420}
            onVisibleChange={(visible) => {
                setShow(visible)
            }}>

            {cart.length === 0 ?
                <div className="d-flex h-100 flex-column justify-content-center align-itens-center text-center">
                    <img src={Sacola} className="img" alt="sacola vazia" />
                    <small className="mt-2 text-secondary">Sua sacola está vazia</small>
                </div>
                :
                <div className="container-fluid h-100 pt-4 sidebar">
                    <h5>Minha sacola</h5>

                    <div className="row produtos">
                        {
                            cart.map(produtos => {
                                return (
                                    <Produto
                                        key={produtos.idCarrinho}
                                        url_img={produtos.urlFoto}
                                        nome_produto={produtos.nome}
                                        valor_total={produtos.vlUnit * produtos.qtd}
                                        qtd={produtos.qtd}
                                        valor_unit={produtos.vlUnit}
                                        idCarrinho={produtos.idCarrinho}
                                        onClickRemover={RemoveItemCard}
                                        detalhes={produtos.detalhes}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="row aling-itens-end footer">
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
                            <div className="input-group justify-content-end">
                                <input type="text" onChange={(e) => setCupomCart(e.target.value)} value={cupomCart} className="form-control" placeholder="Cupom" aria-label="Cupons" aria-describedby="botao para cupom" />
                                <button onClick={ValidarCupom} className="btn btn-outline-success" type="button">Aplicar</button>
                            </div>

                            <div className="input-group justify-content-end">
                                {msgCart.length > 0 ? <small className="text-danger">{msgCart}</small> : null}
                                <span className="d-inline-block text-success">
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

                        <button onClick={FinalizarPedido} className="btn btn-lg btn-danger roubded-0 align-itens-center btn-pedido">Finalizar</button>

                    </div>
                </div>
            }

        </Dock>
    )
}

export default sidebar;