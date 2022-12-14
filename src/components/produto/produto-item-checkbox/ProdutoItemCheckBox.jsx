import React from 'react'

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
                {
                    props.opcoes.map(opcao => {
                        return <li className="list-group-item d-flex justify-content-between" key={opcao.idItem}>
                            <div>
                                <input className="form-check-input ms-2"
                                    type="checkbox" value=""
                                    id={`flexCheckDefault1${opcao.idItem}`}
                                    onClick={(e) => props.onClickItem(e.target.checked, {
                                        idOpcao: opcao.idOpcao,
                                        nome: opcao.nomeItem,
                                        idItem: opcao.idItem,
                                        vlItem: opcao.vlItem,
                                        ordem: opcao.ordem
                                      })}
                                />
                                <label className="form-check-label ms-2" htmlFor={`flexCheckDefault1${opcao.idItem}`}>{opcao.nomeItem}</label>
                            </div>
                            <div>
                                {opcao.vlItem > 0 ?
                                    <span className="text-danger">
                                        {new Intl.NumberFormat('pr-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(opcao.vlItem)}
                                    </span>
                                    : null}
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
