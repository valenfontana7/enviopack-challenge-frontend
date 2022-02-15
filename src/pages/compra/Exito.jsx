import React from 'react'
import CompraFinal from "../../components/CompraFinal";

function Exito() {
  return (
    <>
        <CompraFinal credit={localStorage.getItem("credit")} type="success"/>
    </>
  )
}

export default Exito