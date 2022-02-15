import React, {useState, useEffect} from "react";
import Header from "./Header";
function CompraFinal({ type, credit }) {
    const [itemsInCart, setItemsInCart] = useState([]);
  useEffect(() =>{
    if(localStorage.getItem("cart")) {
      setItemsInCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [])
  return (
    <>
      <Header credit={credit} itemsInCart={itemsInCart} />
      <div className="compraFinal">
        <h1>Estado de la compra</h1>
        {type === "failed" ? (
          <div className="compraFinal__message">
            <p>
              Ocurrió un error con la compra, revisá que el importe no supere el
              crédito disponible en tu cuenta
            </p>
            <a href="/carrito">Volver al carrito</a>
          </div>
        ) : (
          type === "success" && (
            <div className="compraFinal__message">
              <p>La compra se realizó con éxito</p>
              <a href="/">Volver al catálogo</a>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default CompraFinal;
