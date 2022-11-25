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
import { v4 as uuidv4 } from "uuid"

export default function modal(props) {

  const { AddItemCart } = useContext(CartContext);
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [urlFoto, setUrlFoto] = useState('')
  const [idProduto, setIdProduto] = useState(0);
  const [vlProduto, setVlProduto] = useState(0)
  const [vlPromocao, setVlPromocao] = useState(0)
  const [qtd, setQtd] = useState(0)

  const [opcoes, setOpcoes] = useState([])
  const [grupos, setGrupos] = useState([])
  const [bloquearBtn, setBloquearBtn] = useState(true)
  const [total, setTotal] = useState(0)

  function ClickMais() {
    setQtd(qtd + 1)
  }
  function ClickMenos() {
    qtd > 1 ? setQtd(qtd - 1) : setQtd(1)
  }

  function AddItem() {
    let detalhes = []
    let vlDetalhes = 0

    grupos.map(item => {
      item.selecao.map(sel => {
        vlDetalhes += sel.vlItem
        detalhes.push({
          nome: sel.nome,
          idItem: sel.idItem,
          vlItem: sel.vlItem,
          ordem: sel.ordem,
        })
      })
    })

    const item = {
      idCarrinho: uuidv4(),
      idProduto: idProduto,
      nome,
      descricao: nome,
      qtd,
      vlUnit: vlDetalhes + (vlPromocao > 0 ? vlPromocao : vlProduto),
      vlTotal: (vlDetalhes + (vlPromocao > 0 ? vlPromocao : vlProduto)) * qtd,
      urlFoto: urlFoto,
      detalhes: detalhes
    }
    AddItemCart(item)
    props.onRequestClose();
  }

  function SelecionaRadioButton(op) {
    let g = grupos;

    //descrobrir o indice do grupo
    let objIndex = g.findIndex(obj => obj.idOpcao == op.idOpcao);

    //atualizar info daquele indice
    g[objIndex].selecao = [op]

    setGrupos(g)
    HabilitaBotao(g)
    CalculaTotal(g)
  }

  function SelecionaCheckBoxButton(isChecked, op) {
    let g = grupos;
    let s = [];

    //achar o index
    let objIndex = g.findIndex(obj => obj.idOpcao == op.idOpcao)

    //capturar os itens selecionados
    s = g[objIndex].selecao;

    //inserir ou remover um item
    if (isChecked) {
      s.push(op)
    } else {
      let objIndexSel = s.findIndex(obj => obj.idItem == op.idItem)
      s.splice(objIndexSel, 1)
    }

    g[objIndex].selecao = s;
    setGrupos(g)
    HabilitaBotao(g);
    CalculaTotal(g)
  }

  function HabilitaBotao(grupo) {
    let bloquear = false;

    grupo.map(item => {
      if (item.indObrigatorio == "S" && item.selecao.length == 0) {
        bloquear = true
      }
    })

    setBloquearBtn(bloquear);
  }

  function CalculaTotal(grupo) {
    let vlSelecao = 0;
    let vlProd = vlPromocao > 0 ? vlPromocao : vlProduto;

    grupo.map(item => {
      item.selecao.map(sel => {
        vlSelecao += sel.vlItem;
      });
    });

    setTotal((vlProd + vlSelecao) * qtd)

  }

  useEffect(() => {
    if (props.idProduto <= 0) {
      return
    }

    api.get(`http://localhost:8082/v1/produtos/${props.id_produto}`)
      .then(res => {
        setIdProduto(res.data[0].idProduto)
        setNome(res.data[0].nome)
        setDescricao(res.data[0].descricao)
        setVlProduto(res.data[0].vlProduto)
        setVlPromocao(res.data[0].vlPromocao)
        setUrlFoto(res.data[0].urlFoto)
        setQtd(1)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error)
      })

    api.get(`http://localhost:8082/v1/cardapios/opcoes/${props.id_produto}`)
      .then(res => {
        setOpcoes(res.data);

        let gruposUnico = res.data.map(g => {
          return {
            idOpcao: g.idOpcao,
            idProduto: g.idProduto,
            descricao: g.descricao,
            indObrigatorio: g.indObrigatorio,
            qtdMaxEscolha: g.qtdMaxEscolha,
            indAtivo: g.indAtivo,
            ordem: g.ordem,
            selecao: []
          }
        })

        gruposUnico = gruposUnico.filter((item, index, arr) => {
          return arr.findIndex((t) => {
            return t.idOpcao === item.idOpcao
          }) === index;
        })
        setGrupos(gruposUnico)
        HabilitaBotao(gruposUnico);
      })
      .catch(error => console.log(error))
  }, [props.isOpen])

  useEffect(() => {
    CalculaTotal(grupos)
  }, [qtd])

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
            {
              grupos.map(grupo => {
                let op = opcoes.filter((item, i, array) => {
                  return item.idOpcao == grupo.idOpcao
                });

                return grupo.qtdMaxEscolha == 1 ?
                  <ProdutoItemRadio
                    key={grupo.idOpcao}
                    titulo={grupo.descricao}
                    obrigatorio={grupo.indObrigatorio == 'S' ? true : false}
                    opcoes={op}
                    onClickItem={SelecionaRadioButton}
                  />
                  :
                  <ProdutoItemCheckBox
                    key={grupo.idOpcao}
                    titulo={grupo.descricao}
                    opcoes={op}
                    onClickItem={SelecionaCheckBoxButton}
                  />
              })
            }

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
              <button onClick={AddItem} className="btn btn-danger ms-4" disabled={bloquearBtn}>Adicionar a sacola (
                {new Intl.NumberFormat('pr-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total)}
                )
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal >
  )
}
