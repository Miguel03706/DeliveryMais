import React, { useState, useEffect} from 'react';
import Navbar from '../../components/navbar'
import Pedido from '../../components/pedido'
import api from '../../services/api'

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    function ListarPedidos(){
        api.get("/v1/pedidos")
        .then(res => {
            setPedidos(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        ListarPedidos();
    },[])

    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="row col-lg-8 offset-2">

                <div className="col-12 mt-4">
                    <h2>Meus Pedidos:</h2>
                </div>

                <div className="row mt-5">
                    {
                      pedidos.map(pedido => {
                        return (
                            <Pedido 
                            key={pedido.idPedido}
                            url_img={pedido.urlLogo}
                            avaliacao={pedido.avaliacao}
                            qtd_item={pedido.qtdItem}
                            id_pedido={pedido.idPedido}
                            vl_total={pedido.vlTotal}
                            dt_pedido={pedido.dtPedido}
                            id_estabelecimento={pedido.idEstabelecimento}
                            status={pedido.status}
                            />
                        )
                      })
                    }
            </div>

        </div>
        </div >
    );
}

export default Pedidos;