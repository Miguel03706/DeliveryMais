/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/navbar'
import Estabelecimento from '../../components/estabelecimento'
import api from '../../services/api'

export default function busca() {

    const location = useLocation();
    const [resultado, setResultado] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [loading, setLoading] = useState(false);
    const [mais, setMais] = useState(true);
    const [parametroBusca] = useSearchParams();


    var id_categoria = parametroBusca.get('id_cat')
    var id_banner = parametroBusca.get('id_banner');
    var descricao = parametroBusca.get('desc') ?? 'Busca';
    var busca = parametroBusca.get('q') ?? '';
    var pg = 0;

    function ListarEstabelecimentos(reset) {
        
        setLoading(true)

        pg = reset ? 1 : pagina + 1;

        api.get('http://localhost:8082/v1/estabelecimentos', {
            params: {
                cod_cidade: localStorage.getItem('sessionCodCidade'),
                nome: busca,
                id_categoria,
                id_banner,
                pagina: pg
            }
        }).then(res => {
            if (reset) {
                setResultado(res.data);
                setPagina(1)
            } else {
                //atualizar sem apagar o anterior
                setResultado((antigo) => [...antigo, ...res.data]);
                setPagina(pagina + 1)
            }
            setLoading(false)
            setMais(res.data.length >= 10)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        ListarEstabelecimentos(true)
    }, [location])

    return (
        <div className="fluid mt-page">
            <Navbar />

            <div className="row m-2">
                <h3>{descricao}</h3>
                {busca.length > 0 ? <small className="mb-4 text-secondary">Pesquisando por: {busca}</small> : null}
            </div>

            <div className="row m-2">
                {
                    resultado.map(estabelecimento => {
                        return <Estabelecimento
                            key={estabelecimento.idEstabelecimento}
                            id_estabelecimento={estabelecimento.idEstabelecimento}
                            url_img={estabelecimento.urlLogo}
                            nome={estabelecimento.nome}
                            avaliacao={estabelecimento.avaliacao}
                            categoria={estabelecimento.categoria}
                        />
                    })
                }
            </div>


            {
                loading ?
                    <div className="text-center m-5">
                        <span className="spinner-grow spinner-grow-sm text-danger me-2" role="status"></span>
                        <span className="ms-2">Buscando restaurantes...</span>
                    </div> : null
            }

            {
                !loading && mais ?

                    <div className="row m-4">
                        <button onClick={(e) => { ListarEstabelecimentos(false) }} className="btn btn-outline-danger">Ver mais restaurantes</button>
                    </div>
                    : null
            }

        </div>
    )
}
