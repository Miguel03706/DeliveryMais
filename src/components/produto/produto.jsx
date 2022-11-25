import React from 'react';

function produto(props) {

    return (
        <div className="col-12">
            <div className="row p-3 ps-0 border-bottom">

                <div className="col-3">
                    <img className="img-fluid rounded"
                        src={props.url_img}
                        alt="produto" />
                </div>
                <div className="col-9">
                    <div className="d-flex justify-content-between align-itens-center">
                        <small><b>{props.nome_produto}</b></small>
                        <small>
                            <b>
                                {new Intl.NumberFormat('pr-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(props.valor_total)}
                            </b>
                        </small>
                    </div>

                    <small className="d-block mb-2">
                        {props.qtd.toLocaleString('pt-BR', { minimumIntegerDigits: 2 })}
                        <span className="m-1">x</span>
                        {new Intl.NumberFormat('pr-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(props.valor_unit)}
                    </small>

                    {
                        props.detalhes ? 
                        props.detalhes.map(detalhe => {
                            return <small className="text-secondary d-block">- {detalhe.nome}</small>
                        })
                        : null
                    }

                    {
                        props.onClickRemover ?
                            <button onClick={(e) => props.onClickRemover(props.idCarrinho)} className="btn btn-outline-danger mt-3"> Remover </button>
                            : null
                    }
                </div>
                <div className="row">

                </div>

            </div>
        </div>
    )
}

export default produto;