import React from 'react';
import { useState } from 'react';
import { Dock } from 'react-dock'
import './styles.css'

function sidebar() {
    const show = true;
    //const [show, setShow] = useState(true);
    const produtos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    return (
        <Dock position="right"
            isVisible={show}
            onVisibleChange={(visible) => {
                show = visible;
            }}>

            <div className="container-fluid h-100 pt-4 sidebar">
                <h5>Minha sacola</h5>

                <div className="row produtos">
                    {
                        produtos.map(produtos => {
                            return (
                                <>
                                    <p>xxx</p>
                                </>
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

                        <div class="input-group justify-content-end">
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