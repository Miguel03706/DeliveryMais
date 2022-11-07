import React from 'react';
import './styles.css'
// import { Container } from './styles';

function banner(props) {
    return (
        <div className= "banner col-sm-6 col-lg-2 mb-3">
            <a href="#">
                <img className="img_banner" src={props.url_img} alt="banner" />
            </a>
        </div>
    )
}

export default banner;