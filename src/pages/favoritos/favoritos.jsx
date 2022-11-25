/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect }from 'react'
import Navbar from '../../components/navbar'
import Estabelecimento from '../../components/estabelecimento'
import api from '../../services/api'

export default function favoritos() {

    const [favoritos, setFavoritos] = useState([])

    function ListarFavoritos(){
        api.get(`/v1/estabelecimentos/favoritos`).then(res => {
            setFavoritos(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        ListarFavoritos()
    },[])

    function DeleteFavorito(id){
        api.delete(`/v1/estabelecimentos/favoritos/${id}`).then(res => {
            ListarFavoritos()
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="fluid mt-page">
            <Navbar />

            <div className="row col-lg-8 offset-lg-2">


                <div className="row m-2">
                    <h2>Meus Favoritos</h2>
                </div>

                <div className="row m-2">
                    {
                        favoritos.map(estabelecimento => {
                            return <Estabelecimento
                                key={estabelecimento.idEstabelecimento}
                                id_estabelecimento={estabelecimento.idEstabelecimento}
                                url_img={estabelecimento.urlLogo}
                                nome={estabelecimento.nome}
                                avaliacao={estabelecimento.avaliacao}
                                categoria={estabelecimento.categoria}
                                id_favorito = {estabelecimento.idFavorito}
                                btnRemoverFvorito
                                onClickRemoverFavorito={DeleteFavorito}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
