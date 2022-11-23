/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Star from '../../assets/star.png'
import Produto from '../../components/produto/lista'
import Footer from '../../components/footer'
import api from '../../services/api'
import ProdutoModal from '../../components/produto/modal'
import FavVazio from '../../assets/favorito.png'
import FavCheio from '../../assets/favorito2.png'
import './styles.css'
import { CartContext } from '../../contexts/cart';

function cardapio() {

    const { cart, idEstabelecimentoCart, setEntregaCart, setIdEstabelecimentoCart } = useContext(CartContext);

    const { id } = useParams();
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUF] = useState('');
    const [foto, setFoto] = useState('');
    const [entrega, setEntrega] = useState('');
    const [avaliacao, setAvaliacao] = useState(0);
    const [minimo, setMinimo] = useState(0);
    const [qtd, setQtd] = useState(0);
    const [favorito, setFavorito] = useState(false);
    const [idFavorito, setIdFavorito] = useState(0);
    const [idProduto, setIdProduto] = useState(0);

    const [categorias, setCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const [isProdutoOpen, setIsProdutoOpen] = useState(false);

    function FiltrarEstabelecimento() {
        api.get(`http://localhost:8082/v1/estabelecimentos/${id}`).then(res => {
            setNome(res.data[0].nome)
            setEndereco(res.data[0].endereco)
            setComplemento(res.data[0].complemento)
            setBairro(res.data[0].bairro)
            setCidade(res.data[0].cidade)
            setUF(res.data[0].uf)
            setAvaliacao(res.data[0].avaliacao)
            setFoto(res.data[0].urlFoto)
            setEntrega(res.data[0].vlTaxaEntrega)
            setMinimo(res.data[0].vlMinPedido)
            setQtd(res.data[0].qtdAvaliacao)
            setFavorito(res.data[0].idFavorito > 0)
            setIdFavorito(res.data[0].idFavorito)
        }).catch(error => {
            console.log(error)
        })

        api.get(`http://localhost:8082/v1/cardapios/${id}`).then(res => {
            let categotiasUnica = res.data.map(item => item.categoria);

            categotiasUnica = categotiasUnica.filter((itemArray, i, arrayCompleto) => {
                return arrayCompleto.indexOf(itemArray) === i;
            })

            setCategorias(categotiasUnica);
            setProdutos(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        FiltrarEstabelecimento()
    }, [])


    function openModalProduto(id_prod) {

        if (cart.length > 0 && idEstabelecimentoCart != id && idEstabelecimentoCart > 0){
            alert('Já existem produtos de outros estabelecimentos')
            return
        }

        setIdProduto(id_prod)
        setEntregaCart(entrega)
        setIdEstabelecimentoCart(id)
        setIsProdutoOpen(true)
    }
    function closeModalProduto() {
        setIsProdutoOpen(false)
    }

    function Favoritar() {
        api.post(`http://localhost:8082/v1/estabelecimentos/favoritos`, {
            id_estabelecimento: id
        }).then(res => {
            setFavorito(true)
            setIdFavorito(res.data.idFavorito)
        }).catch(error => {
            console.log(error)
        })
    }

    function RemoverFavorito() {
        api.delete(`http://localhost:8082/v1/estabelecimentos/favoritos/${idFavorito}`)
            .then(res => {
                setFavorito(false)
            }).catch(error => {

            })
    }

    return (
        <div className="container-fluid mt-page cardapio">
            <Navbar />
            <ProdutoModal
                isOpen={isProdutoOpen}
                onRequestClose={closeModalProduto}
                id_produto={idProduto}
            />

            <div className="row col-lg-8 offset-lg-2">
                <div className="col-12">
                    <img
                        className="img-fluid rounded img-estab-cadapio"
                        src={foto}
                        alt="Estabelecimento"
                    />
                </div>
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-between">
                        <h2>{nome}</h2>
                        <div className="favorito">
                            {
                                favorito ?
                                    <img src={FavCheio} alt="Remover Favorito" onClick={RemoverFavorito} />
                                    :
                                    <img src={FavVazio} alt="Favoritar" onClick={Favoritar} />
                            }
                        </div>
                    </div>

                    <span>{endereco} {complemento.length > 0 ? ' - ' + complemento : null} - {bairro} - {cidade} - {uf}</span>
                    <div className="classificacao">
                        <img src={Star} alt="Avaliação" />
                        <span className="ms-1">{avaliacao.toFixed(1)}</span>
                        <span className="ms-3">{qtd} avaliações</span>
                    </div>
                    <div className="classificacao mt-3">
                        <span>
                            <b>Taxa de entrega: </b>
                            {new Intl.NumberFormat('pr-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(entrega)}
                        </span>
                        <span className="ms-5">
                            <b>Pedido minimo: </b>
                            {new Intl.NumberFormat('pr-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(minimo)}
                        </span>
                    </div>
                </div>
                {
                    categorias.map(categoria => {
                        return (
                            <div className="row mt-5" key={categoria}>
                                <div className="mb-3">
                                    <h5>{categoria}</h5>
                                </div>
                                {
                                    produtos.map(produto => {
                                        return produto.categoria === categoria ? <Produto
                                            key={produto.idProduto}
                                            nome_produto={produto.nome}
                                            descricao={produto.descricao}
                                            vl_produto={produto.vlProduto}
                                            vl_promocao={produto.vlPromocao}
                                            url_img={produto.urlFoto}
                                            idProduto={produto.idProduto}
                                            onClickProduto={openModalProduto}
                                        />
                                            : null
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