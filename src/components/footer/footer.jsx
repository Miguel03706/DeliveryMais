import React from 'react'
import './styles.css'

export default function footer() {
  const ano = new Date().getFullYear();

  return (
    <div className="row footer border-top mt-5">
      <div className="col-12 mt-4 ms-3">
        <p className="copyright">
          Copyright {ano} Miguel - Todos os direitos reservados
        </p>
      </div>
    </div>
  )
}
