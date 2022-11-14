/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar'
import Categoria from '../../components/categoria'
import Banner from '../../components/banner'
import Estabelecimento from '../../components/estabelecimento'
import api from '../../services/api'
import Footer from '../../components/footer/'

export default function home() {

  const [categorias, setCategorias] = useState([]);
  const [banners, setBanners] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [destaques, setDestaques] = useState([]);



  useEffect(() => {
    api.get('http://localhost:8082/v1/categorias?cod_cidade=' + localStorage.getItem('sessionCodCidade'))
      .then(res => {
        setCategorias(res.data)
      }).catch(error => {
        console.log(error);
      })

    api.get('http://localhost:8082/v1/banners?cod_cidade=' + localStorage.getItem('sessionCodCidade'))
      .then(res => {
        setBanners(res.data)
      }).catch(error => {
        console.log(error);
      })

    api.get('http://localhost:8082/v1/destaques?cod_cidade=' + localStorage.getItem('sessionCodCidade'))
      .then(res => {

        let gruposUnico = res.data.map(grupo => grupo.descricao);
        gruposUnico = gruposUnico.filter((itemArray, i, arrayCompleto) => {
          return arrayCompleto.indexOf(itemArray) === i;
          //junta valores iguais dentro de um array
        })
        setGrupos(gruposUnico)

      }).catch(error => {
        console.log(error);
      })

    api.get('http://localhost:8082/v1/destaques?cod_cidade=' + localStorage.getItem('sessionCodCidade'))
      .then(res => {
        setDestaques(res.data)
      }).catch(error => {
        console.log(error);
      })



  }, [])

  useEffect(() => {
    console.log(grupos)
  }, [grupos])

  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="row justify-content-center text-center">
        {
          categorias.map(categoria => {
            return <Categoria
              key={categoria.id_categoria}
              url_img={categoria.foto}
              descricao={categoria.categoria}
              id_categoria={categoria.idCategoria}
            />
          })
        }

      </div>

      <div className="row justify-content-center text-center mt-5 m-2">
        {
          banners.map(banner => {
            return <Banner
              key={banner.idBanner}
              id_banner={banner.idBanner}
              descricao={banner.descricao}
              url_img={banner.foto}
            />
          })
        }
      </div>

      {
        grupos.map(grupo => {
          return <div key={grupo} className="row mt-5 m-2" >
            <h4>{grupo}</h4>

            {
              destaques.map(destaque => {
                return destaque.descricao === grupo ? <Estabelecimento
                  id_estabelecimento={destaque.idEstabelecimento}
                  key={destaque.idEstabelecimento}
                  url_img={destaque.urlLogo}
                  nome={destaque.nome}
                  avaliacao={destaque.avaliacao}
                  categoria={destaque.categoria}
                /> : null
              })
            }
          </div>

        })
      }
      <Footer />
    </div>
  )
}
