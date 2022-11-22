import React from 'react';
import { Link } from 'react-router-dom'
import AvaliacaoCheia from '../../assets/star.png'
import AvaliacaoVazia from '../../assets/star2.png'
import './styles.css'

function Pedido(props) {

    const dt_pedido = new Date(props.id_pedido)

    return (
        <div className="pedido col-sm-6 mb-4 p-1">
            <Link to="#">
                <div className="row">
                    <div className="col-3 text-center">
                        <img src={props.url_img} alt="Estabelecimento" className="img-pedido" />
                    </div>
                    <div className="col-9 mt-2 p's-1">
                        <span className="d-block"> {props.nome} </span>
                        <small className="d-block text-danger"> Pedido N° {props.id_pedido} </small>
                        <small className="d-block">
                            {props.qtd_item} {props.qtd_item > 1 ? 'itens' : 'item'} -
                            {new Intl.NumberFormat('pr-BR', { style: 'currency', currency: 'BRL' }).format(props.vl_total)} -
                            {new Intl.DateTimeFormat('pt-BR').format(dt_pedido)}
                        </small>
                        <div>
                            <img src={props.avaliacao > 0 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                            <img src={props.avaliacao > 1 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                            <img src={props.avaliacao > 2 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                            <img src={props.avaliacao > 3 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                            <img src={props.avaliacao > 4 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />

                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Pedido;