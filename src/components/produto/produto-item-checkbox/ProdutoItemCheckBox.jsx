import React from 'react'
import './styles.css'

export default function ProdutoItemCheckBox(props) {
    return (
        <div className="card mt-4">
            <div className="card-header d-flex justify-content-between">
                {props.titulo}

                {/* {props.obrigatorio ?
                    <span className="badge bg-secondary">OBRIGATÓRIO</span>
                    : null
                } */}
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <div>
                    <input className="form-check-input ms-2" type="checkbox" value="" id="flexCheckDefault1" />
                    <label className="form-check-label ms-2" htmlFor="flexCheckDefault">Bacon</label>
                    </div>
                    <div>
                        <span className="text-danger">+ R$3,00</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}
