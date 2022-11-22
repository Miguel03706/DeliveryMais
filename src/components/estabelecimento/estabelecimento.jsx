/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Star from '../../assets/star.png'
import { Link } from 'react-router-dom'
import './styles.css'

function Estabelecimento(props) {
    return (
        <div className="estabelecimento col-sm-6 col-md-4 col-lg-3 mb-3 p-2">
            <Link to={`/cardapio/${props.id_estabelecimento}`}>
                <div className="row">
                    <div className="col-3 mt-2">
                        <img className="img-estabelecimento" src={props.url_img} alt="logotipo" /><br />
                    </div>
                    <div className="col-9 mt-2 ps-1">
                        <span>{props.nome}</span>

                        <div className="avaliacao">
                            <img src={Star} alt="avaliação" />
                            <span>{props.avaliacao.toFixed(1)} - {props.categoria}</span>
                        </div>
                    </div>
                </div>
            </Link>
            {props.btnRemoverFvorito ? <button className="btn btn-outline-danger me-3 mt-2" onClick={(e) => props.onClickRemoverFavorito(props.id_favorito)}>Remover</button> : null}
        </div>
    );
}

export default Estabelecimento;