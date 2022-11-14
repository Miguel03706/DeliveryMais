/* eslint-disable no-lone-blocks */
import React from 'react'
import Navbar from '../../components/navbar'
import Categoria from '../../components/categoria'
import Banner from '../../components/banner'
import Estabelecimento from '../../components/estabelecimento'
import Footer from '../../components/footer/'

export default function home() {
  const cat = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ban = [1, 2, 3, 4];
  const destaque = [1, 2, 3];
  const est = [1, 2, 3, 4];


  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="row justify-content-center text-center">
        {
          cat.map(cat => {
            return <Categoria
              key={cat}
              url_img="https://img.freepik.com/fotos-gratis/hamburguer-com-hamburguer-de-carne-de-bovino-e-legumes-frescos-na-superficie-escura_2829-5883.jpg?w=740&t=st=1667824696~exp=1667825296~hmac=42582c3963c25d4c8c52cca1fdea75ff97e89781e997c94dcdccd09663cb6c5c" />
          })
        }

      </div>

      <div className="row justify-content-center text-center mt-5 m-2">
        {
          ban.map(ban => {
            return <Banner
              key={ban}
              url_img="https://img.freepik.com/vetores-gratis/fast-food-set_1284-17362.jpg?w=740&t=st=1667824735~exp=1667825335~hmac=03ae7791022d233f16bfe11f4b0d79a86cb6372b4b3d92f16b9ccbb5e4ac0ad0" />
          })
        }
      </div>

      {
        destaque.map(destaque => {
          return <div className="row mt-5 m-2" key={destaque}>
            <h4>Destaque: entrega grátis: </h4>

            {
              est.map(estabelecimento => {
                return <Estabelecimento
                  key={estabelecimento}
                  url_img="https://img.freepik.com/vetores-gratis/colecao-de-elementos-desenhados-a-mao-fast-food_125540-314.jpg?w=740&t=st=1667825444~exp=1667826044~hmac=d6042bf73b43aa4eb9ceb0e247c683f2998391b0633a7c152f75a99f705e83eb"
                  nome="McDonald's"
                  avaliacao="4"
                  categoria="hamburguer"
                />
              })
            }
          </div>

        })
      }
      <Footer />
    </div>
  )
}
