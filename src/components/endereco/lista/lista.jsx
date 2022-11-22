/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React from 'react';

function lista(props) {
  return (
    <div className="col-12 pt-3 pb-3 border-bottom">
      <div className="d-flex justify-content-between align-itens-center">
        <div>
          <span className="d-block">
            <b>
              {props.endereco}| {props.complemento ? ' - ' + props.complemento : null}
            </b>
          </span>
          <small className="d-block">{props.bairro}</small>
          <small className="d-inline-block me-3">{props.cep}</small>
          <small className="text-danger d-inline-block">
            {
              props.ind_padrao === 'S' ?
                <small className="d-inline-block text-danger">
                  Endereço Principal
                </small>
                : null
            }
          </small>
        </div>
        <div>
          {props.ind_padrao != 'S' && props.onClickEnderecoPadrao ? <button onClick={(e) => props.onClickEnderecoPadrao(props.id_endereco)} className="btn btn-outline-secondary m-2">Tornar padrão</button> : null}
          {props.onClickEditEndereco ? <button onClick={(e) => props.onClickEditEndereco(props.id_endereco)} className="btn btn-outline-danger me-3 m-2">Editar</button> : null}
          {props.onClickDeleteEndereco ? <button onClick={(e) => props.onClickDeleteEndereco(props.id_endereco)} className="btn btn-danger m-2">Excluir</button> : null}
          {props.onClickTrocarEndereco ? <button onClick={(e) => props.onClickTrocarEndereco({cidade: props.cidade, uf: props.ud, codCidade: props.codCidade})} className="btn btn-outline-danger me-3 m-2">Selecionar</button> : null}


        </div>

      </div>

    </div>
  )
}

export default lista;