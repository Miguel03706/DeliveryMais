import React from 'react';
import Lista from '../../components/endereco/lista'
import Navbar from '../../components/navbar'

function enderecos() {
    const lista = [1, 2, 3, 4];
    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="row col-lg-6 offset-3">

                <div className="col-12 mt-4 d-flex justify-content-between align-itens-center">
                    <h2>Meus enderços:</h2>
                    <button className="btn btn-sm btn-outline-danger">Adicionar Endereço</button>
                </div>

                <div className="row mt-5">
                    {
                        lista.map(endereco => {
                           return <Lista key={endereco}/>
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default enderecos;