import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css'

function lista(props) {
    return (
        <div className="col-sm-6 mb-3 p-4 produto-lista">
            <Link to="#">

                <div className="row p-3 ps-0 border-bottom">
                    <div className="col-3">
                        <img className="img-fluid rounded"
                            src={props.url_img}
                            alt="Produto"
                        />
                    </div>
                    <div className="col-9">
                        <small className="d-block"><b> {props.nome} </b></small>
                        <small className="d-block"><b> {props.descricao} </b></small>
                        {props.vl_promocao > 0 ?
                            <>
                                <span class="badge bg-success d-inline-block mt-3">
                                    {new Intl.NumberFormat('pr-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(props.vl_promocao)}
                                </span>
                                <small className="d-inline-block mt-3 ms-4 preco-antigo">
                                    <b>
                                        {new Intl.NumberFormat('pr-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(props.vl_produto)}
                                    </b>
                                </small>
                            </>
                            :
                            <small className="d-inline-block mt-3 ms-4">
                                <b>
                                    {new Intl.NumberFormat('pr-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(props.vl_produto)}
                                </b>
                            </small>
                        }
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default lista;