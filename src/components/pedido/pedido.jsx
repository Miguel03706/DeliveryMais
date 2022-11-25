import React, { useState } from 'react';
import AvaliacaoCheia from '../../assets/star.png'
import AvaliacaoVazia from '../../assets/star2.png'
import api from '../../services/api'
import './styles.css'

function Pedido(props) {

    const dt_pedido = new Date(props.id_pedido)
    const [avaliar, setAvaliar] = useState(false)
    const [avaliacao, setAvaliacao] = useState(props.avaliacao)

    function Status(st) {
        switch (st) {
            case "P": return "Pedido em produção";
            case "E": return "Saiu para a entrega";
            case "A": return "Aguardando...";
            case "F": return "Finalizado";
            default: return "";
        }
    }

    function Avaliar(avaliacao) {
        api.patch(`http://localhost:8082/v1/pedidos/avaliacao/${props.id_pedido}`, {
            avaliacao
        })
            .then(res => {
                setAvaliar(false)
                setAvaliacao(avaliacao)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="border-bottom pt-3 pb-4 d-flex justify-content-between">
            <div className="d-flex">
                <div className="me-4 img-pedido">
                    <img src={props.url_img} alt="Estabelecimento" className="img-pedido" />
                </div>
                <div className="d-inline-block">
                    <span className="d-block"> {props.nome} </span>
                    <small className="d-block text-danger"> Pedido N° {props.id_pedido} </small>
                    <small className="d-block">
                        {props.qtd_item} {props.qtd_item > 1 ? 'itens' : 'item'} -
                        {new Intl.NumberFormat('pr-BR', { style: 'currency', currency: 'BRL' }).format(props.vl_total)} -
                        {new Intl.DateTimeFormat('pt-BR').format(dt_pedido)}
                    </small>
                    {
                        props.status == "F" ?
                            <div>
                                <img src={avaliacao > 0 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                                <img src={avaliacao > 1 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                                <img src={avaliacao > 2 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                                <img src={avaliacao > 3 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                                <img src={avaliacao > 4 ? AvaliacaoCheia : AvaliacaoVazia} alt="Classificação" />
                            </div>
                            : null
                    }
                    {props.status == "P" ? <span className="badge bg-secondary text-light">{Status(props.status)}</span> : null}
                    {props.status == "E" ? <span className="badge bg-secondary text-light">{Status(props.status)}</span> : null}
                    {props.status == "A" ? <span className="badge bg-warning">{Status(props.status)}</span> : null}
                    {props.status == "F" ? <span className="badge bg-success">{Status(props.status)}</span> : null}

                </div>
            </div>
            <div className="d-flex align-content-center">
                {
                    props.status == "F" && !avaliar ?
                        <button onClick={(e) => setAvaliar(true)} className="btn btn-outline-danger h-50 align-self-center">Avaliar</button>
                        : null
                }

                {
                    avaliar ?
                        <div className="align-self-center">
                            <img onClick={(e) => Avaliar(1)} src={AvaliacaoVazia} alt="Classificação" className="pedido-avaliar"/>
                            <img onClick={(e) => Avaliar(2)} src={AvaliacaoVazia} alt="Classificação" className="pedido-avaliar"/>
                            <img onClick={(e) => Avaliar(3)} src={AvaliacaoVazia} alt="Classificação" className="pedido-avaliar"/>
                            <img onClick={(e) => Avaliar(4)} src={AvaliacaoVazia} alt="Classificação" className="pedido-avaliar"/>
                            <img onClick={(e) => Avaliar(5)} src={AvaliacaoVazia} alt="Classificação" className="pedido-avaliar"/>
                        </div>
                        : null
                }


            </div>
        </div>
    );
}

export default Pedido;