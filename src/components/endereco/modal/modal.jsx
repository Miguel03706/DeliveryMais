import React, { useState, useEffect } from 'react'
import Modal from 'react-modal/lib/components/Modal'
import CloseIcon from '../../../assets/close.png'
import api from '../../../services/api'
import './styles.css'

Modal.setAppElement('#root');

export default function EnderecoModal(props) {

    const [idEndereco, setIdEndereco] = useState(0)
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')
    const [codCidade, setCodCidade] = useState('')
    const [cep, setCEP] = useState('')
    const [cidades, setCidades] = useState([])
    const [ind_padrao, setInd_padrao] = useState('')
    const [mensagem, setMensagem] = useState('')

    function SalvarCidade(e) {
        e.preventDefault();
        const [cid, est] = e.target[e.target.selectedIndex].text.split(' - ')
        setCidade(cid)
        setUF(est)
        setCodCidade(e.target.value)

    }
    function SalvarEndereco() {

        setMensagem('')

        if (idEndereco > 0) {
            api.patch(`''/v1/usuarios/endereco/${idEndereco}`, {
                endereco,
                complemento,
                bairro,
                cidade,
                uf,
                cep,
                ind_padrao,
                cod_cidade: codCidade
            })
                .then(res => {
                    props.onRequestClose();
                }).catch(error => {
                    if (error.response) {
                        setMensagem(error.response.data.erro)
                    } else {
                        setMensagem('Ocorreu um erro na requisição')
                    }
                })
        } else {
            api.post(`/v1/usuarios/endereco/${idEndereco}`, {
                endereco,
                complemento,
                bairro,
                cidade,
                uf,
                cep,
                ind_padrao,
                cod_cidade: codCidade
            })
                .then(res => {
                    props.onRequestClose();
                }).catch(error => {
                    if (error.response) {
                        setMensagem(error.response.data.erro)
                    } else {
                        setMensagem('Ocorreu um erro na requisição')
                    }
                })
        }
    }

    function ListarCidades() {
        api.get('/v1/cidades').then(res => {
            setCidades(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        setIdEndereco(props.dados_endereco.idEndereco)
        setEndereco(props.dados_endereco.endereco)
        setComplemento(props.dados_endereco.complemento)
        setBairro(props.dados_endereco.bairro)
        setCidade(props.dados_endereco.cidade)
        setUF(props.dados_endereco.uf)
        setCEP(props.dados_endereco.cep)
        setInd_padrao('N')
        setCodCidade(props.dados_endereco.codCidade)



        ListarCidades()
    }, [props.isOpen])

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={props.onRequestClose} className="react-modal-close">
                <img src={CloseIcon} alt="Fechar" />
            </button>

            <div className="container-fluid h-100 endereco">
                <div className="col-12 mt-4">
                    <h4 className="mt-2 mb-4">editar Endereco</h4>

                    <form>
                        <div className="row">
                            <div className="mb-3 col-8 d-inline-block">
                                <label htmlFor="InputEndereco" className="form-label mb-1">Endereço</label>
                                <input type="text" onChange={(e) => setEndereco(e.target.value)} value={endereco} className="form-control mb-2" id="InputEndereco" aria-describedby='nome' />
                            </div>
                            <div className="mb-3 col-4 d-inline-block">
                                <label htmlFor="InputComplemento" className="form-label mb-1">Complemento</label>
                                <input type="text" onChange={(e) => setComplemento(e.target.value)} value={complemento} className="form-control mb-2" placeholder="Ex: Ap 62" id="InputComplemento" aria-describedby='nome' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-12 d-inline-block">
                                <label htmlFor="InputBairro" className="form-label mb-1">Bairro</label>
                                <input type="text" onChange={(e) => setBairro(e.target.value)} value={bairro} className="form-control mb-2" id="InputBairro" aria-describedby='nome' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="cidades" className="form-label mb-1">Cidade</label>
                                <div className="form-control mb-3">
                                    <select name="cidades" id="cidades" onChange={SalvarCidade} value={codCidade}>
                                        <option value="0000000">Escolha a cidade</option>
                                        {
                                            cidades.map(c => {
                                                return <option value={c.codCidade} key={c.codCidade}>{c.cidade} - {c.uf} </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <label htmlFor="InputCEP" className="form-label mb-1">CEP</label>
                                <input type="text" onChange={(e) => setCEP(e.target.value)} value={cep} className="form-control" />

                            </div>
                        </div>
                    </form>
                </div>
                <div className="row mb-3">
                    <div className="col-12 mt-3 d-flex justify-content-end align-itens-center">
                        <button onClick={SalvarEndereco} type="button mt-3" className="btn btn-lg btn-danger">Salvar dados</button>
                    </div>
                </div>
                {
                    mensagem.length > 0 ? <div className="alert alert-danger mt-2 text-center">{mensagem}</div> : null
                }
            </div>
        </Modal>
    )
}
