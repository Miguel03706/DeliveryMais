import React from 'react';
import Star from '../../assets/star.png'
import './estabelecimento.css'

function Estabelecimento(props) {
    return (
        <div className="estabelecimento col-sm-6 col-md-4 col-lg-3 mb-3 p-2">
            <a href="#">
                <div className="row">
                    <div className="col-3">
                        <img className="img-estabelecimento" src={props.url_img} alt="logotipo" /><br />
                    </div>
                    <div className="row-9">
                        <span>{props.nome}</span>
                        <div className="avaliacao">
                            <img src={Star} alt="" />
                            <b>{props.avaliacao} - {props.categoria}</b>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Estabelecimento;