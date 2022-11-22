/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-lone-blocks */
import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-modal/lib/components/Modal'
import CloseIcon from '../../../assets/close.png'
import ProdutoItemCheckBox from '../produto-item-checkbox'
import ProdutoItemRadio from '../produto-item-radio'
import api from '../../../services/api'
import './styles.css'
import { CartContext } from '../../../contexts/cart'
import {v4 as uuidv4} from "uuid"

export default function modal(props) {

  const { cart, AddItemCart } = useContext(CartContext);
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [idProduto, setIdProduto] = useState(0);
  const [vlProduto, setVlProduto] = useState(0)
  const [vlPromocao, setVlPromocao] = useState(0)
  const [qtd, setQtd] = useState(1)

  function ListarPedidos() {
    api.get(`http://localhost:8082/v1/produtos/${props.id_produto}`).then(res => {
      setIdProduto(res.idProduto)
      setNome(res.data[0].nome)
      setDescricao(res.data[0].descricao)
      setVlProduto(res.data[0].vlProduto)
      setVlPromocao(res.data[0].vlPromocao)
      setUrlFoto(res.data[0].urlFoto)


    }).catch(error => {
      console.log(error)
    })
  }

  function ClickMais() {
    setQtd(qtd + 1)
  }
  function ClickMenos() {
    qtd > 1 ? setQtd(qtd - 1) : setQtd(1)
  }

  function AddItem() {
    const item = {
      idCarrinho: uuidv4(),
      idProduto: idProduto,
      nome,
      qtd,
      vlUnit: vlPromocao > 0 ? vlPromocao : vlProduto,
      urlFoto: urlFoto,
      detalhes: []
    }
    AddItemCart(item)
    props.onRequestClose();
  }

  useEffect(() => {
    ListarPedidos()
    setQtd(1)
  }, [props.id_produto])

  return (
    <Modal isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={props.onRequestClose} className="react-modal-close">
        <img src={CloseIcon} alt="Fechar" />
      </button>

      <div className="container-fluid h-100 produto-modal">
        <div className="row detalhes-produto">
          <div>
            <img
              src={urlFoto}
              className="img-fluid rounded img-produto-modal"
              alt="Produto"
            />
          </div>
          <div className="col-12 mt-4 ">
            <h4 className="mt-2">{nome}</h4>

            <small className="d-block mb-3">{descricao}</small>
            {vlPromocao > 0 ?
              <>
                <small className="mt-3 promocao">
                  {new Intl.NumberFormat('pr-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(vlPromocao)}
                </small>
                <small className="ms-4 mt-3 preco-antigo">
                  {new Intl.NumberFormat('pr-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(vlProduto)}
                </small>
              </>
              :
              <small className="ms-4 mt-3 promocao">
                {new Intl.NumberFormat('pr-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(vlProduto)}
              </small>
            }
          </div>

          <div className="col-12 mt-4">
            <ProdutoItemRadio titulo="Escolha a borda" obrigatorio />
            <ProdutoItemCheckBox titulo="Turbine sua pizza" />
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-3 d-flex justify-content-end">
            <div>
              <button onClick={ClickMenos} className="btn btn-outline-danger"><i className="fas fa-minus"></i></button>
              <span className="m-3 button-qtd">{qtd.toLocaleString('pt-BR', {
                minimumIntegerDigits: 2
              })}</span>
              <button onClick={ClickMais} className="btn btn-outline-danger"><i className="fas fa-plus"></i></button>
              <button onClick={AddItem} className="btn btn-danger ms-4">Adicionar a sacola (
                {new Intl.NumberFormat('pr-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(vlPromocao > 0 ? vlPromocao * qtd : vlProduto * qtd)}
                )
                </button>
            </div>
          </div>
        </div>
      </div>
    </Modal >
  )
}
