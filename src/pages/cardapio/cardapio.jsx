import React from 'react';
import Navbar from '../../components/navbar';
import Star from '../../assets/star.png'
import Produto from '../../components/produto/lista'
import Footer from '../../components/footer'

import './styles.css'

function cardapio() {
    const lista = [1, 2, 3, 4];
    const lista2 = [1, 2, 3, 4];

    return (
        <div className="container-fluid mt-page cardapio">
            <Navbar />
            <div className="row col-lg-8 offset-lg-2">
                <div className="col-12">
                    <img
                        className="img-fluid rounded img-estab-cadapio"
                        src="https://img.freepik.com/fotos-gratis/closeup-de-carne-assada-com-molho-legumes-e-batatas-fritas-em-um-prato-sobre-a-mesa_181624-35847.jpg?w=740&t=st=1668001208~exp=1668001808~hmac=fce2615f4f54ee2266879743e69b0222eb9ab55b26bf371546ff9f788183a125"
                        alt="Estabelecimento" />
                </div>
                <div className="col-12 mt-4">
                    <h2>Nome do Estabelecimento</h2>
                    <span> Rua x, 156, cidade x</span>
                    <div className="classificacao">
                        <img src={Star} alt="Avaliação" />
                        <span className="ms-1">4.0</span>
                        <span className="ms-3">10 avaliações</span>
                    </div>
                    <div className="classificacao mt-3">
                        <span><b>Taxa de entrega: </b> R$5,00</span>
                        <span className="ms-5"><b>Pedido minimo: </b> R$30,00</span>
                    </div>
                </div>


                {
                    lista.map(categoria => {
                        return (
                            <div className="row mt-5">
                                <div className="mb-3">
                                    <h5>Destaques</h5>
                                </div>

                                {
                                    lista2.map(produtos => {
                                        return <Produto key={produtos}/>
                                    })
                                }

                            </div>
                        );
                    })
                }

            </div>
            <Footer />
        </div>
    );
}

export default cardapio;