import React from 'react';
import Star from '../../assets/star.png'
import './styles.css'
function pedido(props) {
    return (
        <div className="pedido col-sm-6 mb-4 p-1">
            <a href="#">
                <div className="row">
                    <div className="col-3 text-center">
                        <img src={props.url_img} alt="Estabelecimento" className="img-pedido"/>
                    </div>
                    <div className="col-9 mt-2 p's-1">
                        <span className="d-block"> Teste </span>
                        <span className="d-block text-danger"> Pedido N° 455 </span>
                        <span className="d-block"> 2 itens - R$ 85,00 - 09/11/2022 </span>
                        <div>
                            <img src={Star} alt="Classificação" />
                            <img src={Star} alt="Classificação" />
                            <img src={Star} alt="Classificação" />
                            <img src={Star} alt="Classificação" />
                            <img src={Star} alt="Classificação" />
                        
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}

export default pedido;