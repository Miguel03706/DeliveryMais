import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom'

function banner(props) {
    return (
        <div className="banner col-sm-6 col-lg-2 mb-3">
            <Link to={`/busca?id_banner=${props.id_banner}&desc=${props.descricao}`}>
                <img className="img_banner" src={props.url_img} alt={props.descricao} />
            </Link>
        </div>
    )
}

export default banner;
