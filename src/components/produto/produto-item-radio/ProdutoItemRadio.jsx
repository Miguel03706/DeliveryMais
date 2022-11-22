import React from 'react'
import './styles.css'

export default function ProdutoItemRadio(props) {
  return (
    <div className="card mt-4">
      <div className="card-header d-flex justify-content-between">
        {props.titulo}

        {props.obrigatorio ?
          <span className="badge bg-secondary">OBRIGATÓRIO</span>
          : null
        }
      </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <input className="form-check-input ms-2" type="radio" name="flexRadioDefault" id="flexRadioDefault" />
            <label className="ms-2" htmlFor="flexRadioDefault"> Borda fina</label>
          </li>
        </ul>
    </div>
  )
}
