import React, {useEffect, useState} from 'react';
import { Header, Catalog } from "../../components/index";
import profileData from "../../data/profile.json";

function Home() {
  const [itemsInCart, setItemsInCart] = useState([]);
  useEffect(() =>{
    if(localStorage.getItem("cart")) {
      setItemsInCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [])
  return <>
    <Header credit={profileData.profile.credit} itemsInCart={itemsInCart}/>
    <div className="home">
      <h1>Catálogo</h1>
      <Catalog itemsInCart={itemsInCart} setItemsInCart={setItemsInCart}/>
    </div>
  </>;
}

export default Home;
