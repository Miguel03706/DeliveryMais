import React from 'react';
import Navbar from '../../components/navbar'
import Pedido from '../../components/pedido'

function pedidos() {
    const lista = [1, 2, 3, 4];
    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="row col-lg-8 offset-2">

                <div className="col-12 mt-4">
                    <h2>Meus Pedidos:</h2>
                </div>

                <div className="row mt-5">
                    {
                      lista.map(pedidos => {
                        return (
                            <Pedido 
                            key={pedidos}
                            url_img="https://img.freepik.com/vetores-gratis/colecao-de-elementos-desenhados-a-mao-fast-food_125540-314.jpg?w=740&t=st=1667825444~exp=1667826044~hmac=d6042bf73b43aa4eb9ceb0e247c683f2998391b0633a7c152f75a99f705e83eb"
                            />
                        )
                      })
                    }
            </div>

        </div>
        </div >
    );
}

export default pedidos;