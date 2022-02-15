import React, {useState, useEffect} from 'react'
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import profileData from "../../data/profile.json";
function Carrito() {
    const navigate = useNavigate();
    const [itemsInCart, setItemsInCart] = useState([]);
    const [credit, setCredit] = useState(0);
    const [total, setTotal] = useState(0);
  useEffect(() =>{
    if(localStorage.getItem("cart")) {
      setItemsInCart(JSON.parse(localStorage.getItem("cart")));
      setTotal(JSON.parse(localStorage.getItem("cart")).map((product) => product.price).reduce((el1, el2)=> el1 + el2))
    }
    setCredit(profileData.profile.credit);
  }, [])
  return (
    <>
        <Header credit={credit} itemsInCart={itemsInCart} />
        <div className="carrito">
            <h1>Carrito</h1>
            {itemsInCart.length > 0 ? <ul className="carrito__list">
                {itemsInCart && itemsInCart.map((product)=> {
                    return <li key={product.id} className="carrito__item">
                    <img src="/image-product.jpg" alt="item" />
                    <div className="carrito__itemContent">
                        <p>{product.title}</p>
                        <div>
                            <p>$ {product.price}</p>
                            <button onClick={()=> {
                                setItemsInCart(itemsInCart.filter((item)=> item.id !== product.id));
                                localStorage.setItem("cart", JSON.stringify(itemsInCart.filter((item)=> item.id !== product.id)));
                                setTotal(itemsInCart.filter((item)=> item.id !== product.id).map((product) => product.price).reduce((el1, el2)=> el1 + el2));
                            }} className="carrito__removeBtn">x</button>
                        </div>
                    </div>
                </li>
                })}
                <li className="carrito__total">
                    <p><strong>Total</strong></p>
                    <p><strong>$ {total}</strong></p>
                </li>
                <li className="carrito__buttonGroup">
                    <a href="/" className="carrito__buttonBack">Volver al catálogo</a>
                    <button onClick={()=> {
                        console.log({total, credit})
                        if(total <= credit) {
                            setCredit(credit - total);
                            localStorage.setItem("credit", credit - total);
                            setItemsInCart([])
                            localStorage.removeItem("cart");
                            return navigate("/compra/exito");
                        } else {
                            return navigate("/compra/fallo");
                        }
                    }} className="carrito__buttonSubmit">Finalizar compra</button>
                </li>
            </ul> : <h4>No hay productos añadidos al carrito aún</h4>}
        </div>
    </>
  )
}

export default Carrito