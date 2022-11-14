import React from 'react';
import './styles.css'

function lista() {
    return (
        <div className="col-sm-6 mb-3 p-4 produto-lista">
            <a href="#">

                <div className="row p-3 ps-0 border-bottom">
                    <div className="col-3">
                        <img className="img-fluid rounded"
                            src="https://img.freepik.com/fotos-gratis/closeup-de-carne-assada-com-molho-legumes-e-batatas-fritas-em-um-prato-sobre-a-mesa_181624-35847.jpg?w=740&t=st=1668001208~exp=1668001808~hmac=fce2615f4f54ee2266879743e69b0222eb9ab55b26bf371546ff9f788183a125"
                            alt="Produto"
                        />
                    </div>
                    <div className="col-9">
                        <small className="d-block"><b> Pizza </b></small>
                        <small className="d-block"><b> Lorem ipsum dolor, sit amet consectetur eius corrupti repudiandae consequatur. </b></small>
                        <small className="d-block"><b> Pizza </b></small>
                        <small className="d-inline-block mt-3 text-success ms-4"><b> R$ 45,00 </b></small>
                        <small className="d-inline-block mt-3 ms-4 preco-antigo"><b> R$ 60,00 </b></small>
                    </div>

                </div>
            </a>
        </div>
    )
}

export default lista;