import React, { useState, useEffect } from 'react'
import { createContext } from "react";
import api from '../services/api'
const CartContext = createContext({});

function CartProvider(props) {

    const [cart, setCart] = useState([]);
    const [subTotalCart, setSubTotalCart] = useState(0);
    const [descontoCart, setDescontoCart] = useState(0);
    const [entregaCart, setEntregaCart] = useState(0);
    const [idCupomCart, setIdCupomCart] = useState(0);
    const [totalCart, setTotalCart] = useState(0);
    const [idEstabelecimentoCart, setIdEstabelecimentoCart] = useState(0);
    const [cupomCart, setCupomCart] = useState('')
    const [msgCart, setMsgCart] = useState('')

    function AddItemCart(item) {
        setCart([...cart, item])
    }
    function RemoveItemCard(id) {
        const novoCart = cart.filter((item, index, arr) => {
            return item.idCarrinho != id
        });
        setCart(novoCart)
    }
    function ValidarCupom() {
        setMsgCart('')
        api.get(`http://localhost:8082/v1/cupons/validacao`, {
            params: {
                cod_cupom: cupomCart,
                valor: Math.trunc(subTotalCart * 100),
                id_estabelecimento: idEstabelecimentoCart
            }
        }).then(res => {
            if (res.data) {
                let porc_cupom = res.data.porcCupom
                let vl_cupom = res.data.vlCupom

                setIdCupomCart(res.data.idCupom);
                setDescontoCart(vl_cupom + (subTotalCart * porc_cupom / 100))
            } else {
                setIdCupomCart(0)
                setDescontoCart(0)
                setMsgCart('Cupom inválido')
            }
        }).catch(error => {
            setIdCupomCart(0)
            setDescontoCart(0)
            setMsgCart('Cupom inválido')
        })
    }

    useEffect(() => {
        let soma = cart.reduce((a, b) => a + (b.vlUnit * b.qtd), 0)
        setSubTotalCart(soma)
    }, [cart])

    useEffect(() => {
        setTotalCart(subTotalCart - descontoCart + entregaCart)
    }, [subTotalCart, descontoCart, entregaCart])


    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                subTotalCart,
                setSubTotalCart,
                descontoCart,
                setDescontoCart,
                entregaCart,
                setEntregaCart,
                idCupomCart,
                setIdCupomCart,
                totalCart,
                setTotalCart,
                idEstabelecimentoCart,
                setIdEstabelecimentoCart,
                msgCart,
                setMsgCart,
                cupomCart,
                setCupomCart,
                AddItemCart,
                ValidarCupom,
                RemoveItemCard
            }}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }