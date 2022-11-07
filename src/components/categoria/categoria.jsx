/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./styles.css";
// import { Container } from './styles';

function categoria(props) {
  return (
    <div className="categoria col-4 col-sm-3 sm-md=2 col-lg-1">
      <a href="#">
      <div>
        <img className="img-categoria" src={props.url_img} alt="Categoria" />
      </div>
      <span>Categoria</span>
    </a>
    </div>
  );
}

export default categoria;