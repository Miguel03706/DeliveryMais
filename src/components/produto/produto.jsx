import React from 'react';

function produto(props) {
    return (
        <div className="col-12">
            <div className="row p-3 ps-0 border-bottom">

                <div className="col-3">
                    <img className="img-fluid rounded"
                        src="https://img.freepik.com/fotos-premium/hamburguer-de-carne-caseiro-fastfood-delicioso-fechar-se_151349-156.jpg?w=740"
                        alt="produto" />
                </div>
                <div className="col-9">
                    <div className="d-flex justify-content-between align-itens-center">
                        <small><b>{props.nome_produto}</b></small>
                        <small><b>R$ {props.valor_total}</b></small>
                    </div>  

                    <small className="d-block"> {props.qtd} x {props.valor_unit}</small>

                    <button className="btn btn-outline-danger mt-3"> Remover </button>
                </div>


            </div>
        </div>
    )
}

export default produto;