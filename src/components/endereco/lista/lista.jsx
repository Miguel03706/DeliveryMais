import React from 'react';

// import { Container } from './styles';

function lista() {
  return (
    <div className="col-12 pt-3 pb-3 border-bottom">
        <div className="d-flex justify-content-between align-itens-center">
            <div>
                <span><b>Endereço do usuario</b></span>
                <small className="d-block">bairro do usuario</small>
                <small className="d-inline-block me-3">Cep</small>
                <small className="text-danger d-inline-block">Endereço Principal</small>
            </div>
            <div>
                <button className="btn btn-outline-danger me-3 m-2">Editar</button>
                <button className="btn btn-danger m-2">Excluir</button>

            </div>

        </div>

    </div>
  )
}

export default lista;