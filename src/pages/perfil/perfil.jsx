import React from 'react'
import Navbar from '../../components/navbar'

export default function perfil() {
    const lista = [1, 2, 3, 4, 5];

    return (
        <div className="fluid mt-page p-2">
            <Navbar />

            <div className="row col-lg-6 offset-lg-3">
                <div className="row p-auto">
                    <h3>Meu Perfil</h3>
                </div>
                <div className="col-lg-12">

                    <div className="row m2">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="InputNome">Nome: </label>
                                <input type="text" className="form-control" id="inputNome" aria-describedby="nome" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputEmail">Email: </label>
                                <input type="email" className="form-control" id="inputEmail" aria-describedby="nome" />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-lg btn-danger">Salvar Dados</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
