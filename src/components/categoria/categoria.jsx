import React, { useState, useEffect } from 'react';
import "./styles.css";
import { Link } from 'react-router-dom'


function categoria(props) {


  return (
    <div className="categoria col-4 col-sm-3 sm-md=2 col-lg-1">
      <Link to={`/busca?id_cat=${props.id_categoria}&desc=${props.descricao}`}>
        <div>
          <img className="img-categoria" src={props.url_img} alt={props.descricao} />
        </div>
        <span>{props.descricao}</span>
      </Link>
    </div>
  );
}

export default categoria;