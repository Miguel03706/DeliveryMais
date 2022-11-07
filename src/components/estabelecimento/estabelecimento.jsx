import React from 'react';
import Star from '../../assets/star.png'
import './styles.css'

function Estabelecimento(props) {
    return (
        <div className="estabelecimento col-sm-6 col-md-4 col-lg-3 mb-3 p-2">
            <a href="#">
                <div className="row"> 
                    <div className="col-3 mt-2">
                        <img className="img-estabelecimento" src={props.url_img} alt="logotipo" /><br />
                    </div>
                    <div className="col-9 mt-2 ps-1">
                        <span>{props.nome}</span>

                        <div className="avaliacao">
                            <img src={Star} alt="avaliação" />
                            <span>{props.avaliacao} - {props.categoria}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default Estabelecimento;