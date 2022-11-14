import React from 'react'
import Navbar from '../../components/navbar'
import Estabelecimento from '../../components/estabelecimento'

export default function favoritos() {
    const lista = [1, 2, 3, 4, 5];

    return (
        <div className="fluid mt-page">
            <Navbar />

            <div className="row col-lg-8 offset-lg-2">


                <div className="row m-2">
                    Pizza
                </div>

                <div className="row m-2">
                    {
                        lista.map(estabelecimento => {
                            return <Estabelecimento
                                key={estabelecimento}
                                url_img="https://img.freepik.com/vetores-gratis/colecao-de-elementos-desenhados-a-mao-fast-food_125540-314.jpg?w=740&t=st=1667825444~exp=1667826044~hmac=d6042bf73b43aa4eb9ceb0e247c683f2998391b0633a7c152f75a99f705e83eb"
                                nome="McDonald's" avaliacao="4" categoria="hamburguer"
                                btnRemoverFvorito
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
