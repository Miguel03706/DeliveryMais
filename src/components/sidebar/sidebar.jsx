/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Dock } from 'react-dock'
import Produto from '../produto'
import './styles.css'

function sidebar() {
    const [show, setShow] = useState(false);

    const produtos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    useEffect(() => {
        window.addEventListener('openSidebar', () => {
            setShow(true)
        });

    }, []);
    return (
        <Dock position="right"
            isVisible={show}
            onVisibleChange={(visible) => {
                setShow(visible)
            }}>

            <div className="container-fluid h-100 pt-4 sidebar">
                <h5>Minha sacola</h5>

                <div className="row produtos">
                    {
                        produtos.map(produtos => {
                            return (
                                <Produto
                                    key={produtos}
                                    nome_produto="Nome do produto"
                                    valor_total="80,00"
                                    qtd="02"
                                    valor_unit="40,00" />
                            )
                        })
                    }
                </div>

                <div className="row aling-itens-end footer">
                    <div className="col-12 d-flex justify-content-between align-itens-center">
                        <span>Subtotal</span>
                        <span>R$ 30,00</span>
                    </div>
                    <div className="col-12 d-flex justify-content-between align-itens-center mt-2">
                        <div className="input-group justify-content-end">
                            <input type="text" className="form-control" placeholder="Cupom" aria-label="Cupons" aria-describedby="botao para cupom" />
                            <button className="btn btn-outline-success" type="button">Aplicar</button>
                        </div>

                        <div className="input-group justify-content-end">
                            <span className="d-inline-block text-success">- R$ 0,00</span>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-between align-itens-center mt-2">
                        <span>Taxa de entrega: </span>
                        <span>R$ 5,00</span>
                    </div>

                    <div className="col-12 d-flex justify-content-between align-itens-center mt-3">
                        <b>Total: </b>
                        <h3>R$ 150,00</h3>
                    </div>

                    <button className="btn btn-lg btn-danger roubded-0 align-itens-center btn-pedido">Finalizar</button>

                </div>
            </div>

        </Dock>
    )
}

export default sidebar;